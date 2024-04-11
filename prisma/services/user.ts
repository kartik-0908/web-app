import client from '../index';
import { hashPassword, verifyPassword as verifyUserPassword } from '../../lib/auth';
import { start } from 'repl';
import { emit } from 'process';

export const findUserByEmail = async (email: string) => {
  return await client.user.findUnique({
    where: { email },
  });
};

export const createUser = async ({ email, password }: { email: string; password: string; }) => {
  const hashedPassword = await hashPassword(password);
  // console.log(hashedPassword)
  const resp = await client.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
  const defaultCustomization = await client.chatbotCustomization.create({
    data: {
      botName: 'Yugaa',
      greetingMessage: 'Hello, how can I assist you?',
      selectedColor: "#1C2434",
      fontFamily: "Arial, sans-serif",
      fontColor: "Black",
      widgetPosition: "right",
      toneAndStyle: "Conversational and friendly, with a touch of humor when appropriate. Maintain a professional tone for business-related queries.",
      userGuidance: "Provide clear guidance and instructions. Clearly instruct users on how to navigate the chatbot, ask for information, or perform specific actions.",
      positiveReinforcement: "Include positive phrases to acknowledge user inputs. Express gratitude and provide positive feedback where applicable to enhance user experience.",
      errorHandling: "Clearly communicate errors with user-friendly messages. Provide suggestions for correction and avoid technical jargon. Apologize when necessary",
      politeness: "Always use polite phrases and courteous language. Avoid language that may be perceived as rude or insensitive. Thank users for their inputs.",
      clarityAndSimplicity: "Prioritize straightforward language. Avoid complex jargon and use concise sentences. Break down information into easily digestible chunks.",
      personalization: "Address users by name whenever possible. Reference past interactions to create a personalized experience. Use personalized greetings based on user history.",
      responseLength: "Medium",
      clarificationPrompt: "I need more information top assist you. Could you provide additional details",
      apologyAndRetryAttempt: "I apologize for any confusion. Could you please provide your query again?",
      errorMessageStyle: "Standard",
      user: {
        connect: { email: email },
      },
    },
  });
  console.log(resp);
  return resp;
};

export const verifyPassword = async (password: string, hashedPassword: string) => {
  return await verifyUserPassword(password, hashedPassword);
};

export const updateLastLoginAt = async (email: string) => {
  const now = new Date();
  await client.user.update({
    where: { email },
    data: { lastLoginAt: now },
  });
};

export const isShopInstalled = async (email: string) => {
  const shop = await client.shopify_installed_shop.findUnique({
    where: {
      email: email,
    },
  });

  return shop !== null;
}

export const store_token = async (token: string, email: string, shop: string) => {
  const new_installed_shop = await client.shopify_installed_shop.create({
    data: {
      shop: shop,
      accessToken: token,
      email: email
    }
  });
}

async function getShop(email: string) {
  console.log(email)
  const existingUser = await client.shopify_installed_shop.findUnique({
    where: {
      email: email
    }
  });
  console.log(existingUser)
  if (existingUser) {
    return (existingUser.shop);
  }
}
async function getlastThreeConversations(shopDomain: string) {
  const result = client.conversation.findMany({
    where: { shopDomain },
    take: 3,
    orderBy: { startedAt: 'desc' },
    include: {
      Message: {
        orderBy: { timestamp: 'asc' },
        take: 2, // Get first bot and user messages
      },
    },
  });
  return (result);
}
async function getWeeklyConversationStartTimes(shopDomain: string): Promise<Array<Array<[number, number]>>> {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - startDate.getDay() + (startDate.getDay() === 0 ? -6 : 1)); // Adjust to start from the last Monday
  startDate.setHours(0, 0, 0, 0); // Set to the start of the day

  const conversations = await client.conversation.findMany({
    where: {
      shopDomain: shopDomain,
      startedAt: {
        gte: startDate,
      },
    },
    orderBy: {
      startedAt: 'asc',
    },
  });

  // Initialize an array to hold conversation start times for each day of the current week
  const weekData: Array<Array<[number, number]>> = [[], [], [], [], [], [], []];

  conversations.forEach(conversation => {
    const dayIndex = conversation.startedAt.getDay() - 1; // Adjust index (0 = Monday, 6 = Sunday)
    const hour = conversation.startedAt.getHours();
    const minute = conversation.startedAt.getMinutes();
    if (dayIndex >= 0) { // Ignore conversations from before the current week
      weekData[dayIndex].push([hour, minute]);
    }
  });
  return weekData;
}

async function getConversationCountsForLast7Days(shopDomain: string): Promise<number[]> {
  const counts = new Array(7).fill(0); // Initialize an array of 7 days with 0
  const endDate = new Date(); // Today
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 6); // Set to 7 days ago
  startDate.setHours(0, 0, 0, 0); // Start of the day, 7 days ago

  const conversations = await client.conversation.findMany({
    where: {
      shopDomain: shopDomain,
      startedAt: {
        gte: startDate,
        lte: endDate,
      },
    },
  });

  conversations.forEach(conversation => {
    const diff = Math.floor((conversation.startedAt.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    if (diff >= 0 && diff < 7) {
      counts[diff]++; // Increment the count for the corresponding day
    }
  });

  return counts;
}

export const getHomeData = async (email: string) => {
  const shop = await getShop(email);
  console.log("shop" + shop)
  if (shop) {
    const currentWeekData = await getWeeklyConversationStartTimes(shop)
    const last7Days = await getConversationCountsForLast7Days(shop)
    const lastThreeConversations = await getlastThreeConversations(shop)
    return {
      currentWeekData,
      last7Days,
      lastThreeConversations,
    }
  }
}

async function getConversationStats(startDate: Date, endDate: Date) {
  endDate.setDate(endDate.getDate() + 1);
  const totalConversations = await client.conversation.count({
    where: {
      startedAt: {
        gte: startDate,
        lte: endDate,
      },
    },
  });

  const totalMessages = await client.message.count({
    where: {
      Conversation: {
        startedAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    },
  });

  const unansweredMessages = await client.message.count({
    where: {
      unanswered: true,
      Conversation: {
        startedAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    },
  });


  const conversations = await client.conversation.findMany({
    where: {
      startedAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    include: {
      Message: {
        orderBy: {
          timestamp: 'desc',
        },
        take: 1, // Only fetch the last message of each conversation
      },
    },
  });

  let totalDurationSeconds = 0;

  conversations.forEach(conversation => {
    if (conversation.Message.length > 0) {
      const lastMessageTimestamp = conversation.Message[0].timestamp;
      const duration = lastMessageTimestamp.getTime() - conversation.startedAt.getTime();
      totalDurationSeconds += duration / 1000; // Convert milliseconds to seconds
    }
  });

  // Calculate the average duration in seconds
  const averageDurationSeconds = totalDurationSeconds / conversations.length;

  // Return aggregated data
  return {
    totalConversations,
    totalMessages,
    unansweredMessages,
    averageDurationSeconds
  };
}

export const getAnalyticsData = async (email: string, startDate: string, endDate: string) => {
  const shop = await getShop(email);
  console.log("inside getanalytics" + email)
  console.log("shop" + shop)
  console.log("shop" + startDate)
  console.log("shop" + endDate)
  if (shop) {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
      throw new Error("Invalid date format. Please ensure your dates are in a recognizable format.");
    }
    const data = await getConversationStats(startDateObj, endDateObj)
    return {
      analyticsData: data
    }
  }


}


export const getCustomizationData = async (email: string) => {
  if (email) {
    const customizations = await client.chatbotCustomization.findMany({
      where: {
        userEmail: email,
      },
      include: {
        user: true,
      },
    });
    return customizations
  }
}
export const updateAppearance = async (
  email: string,
  selectedColor: string,
  fontFamily: string,
  fontColor: string,
  widgetPosition: string,
) => {
  if (!email) {
    throw new Error("Email is required");
  }

  const updatedCustomization = await client.chatbotCustomization.updateMany({
    where: {
      userEmail: email,
    },
    data: {
      selectedColor,
      fontFamily,
      fontColor,
      widgetPosition,
    },
  });
  return updatedCustomization;
};

export const updateCustomGreetings = async (
  email: string,
  botName: string,
  greetingMessage: string,
) => {
  if (!email) {
    throw new Error("Email is required");
  }

  const updatedCustomization = await client.chatbotCustomization.updateMany({
    where: {
      userEmail: email,
    },
    data: {
      botName,
      greetingMessage,
    },
  });

  return updatedCustomization;
};

export const updateLanguageCustomization = async (
  email: string,
  toneAndStyle: string,
  userGuidance: string,
  positiveReinforcement: string,
  errorHandling: string,
  politeness: string,
  clarityAndSimplicity: string,
  personalization: string,
) => {
  if (!email) {
    throw new Error("Email is required");
  }

  const updatedCustomization = await client.chatbotCustomization.updateMany({
    where: {
      userEmail: email,
    },
    data: {
      toneAndStyle,
      userGuidance,
      positiveReinforcement,
      errorHandling,
      politeness,
      clarityAndSimplicity,
      personalization,
    },
  });

  return updatedCustomization;
};


export const updateBehavioralCustomization = async (
  email: string,
  responseLength: string,
  clarificationPrompt: string,
  apologyAndRetryAttempt: string,
  errorMessageStyle: string,
) => {
  if (!email) {
    throw new Error("Email is required");
  }

  const updatedCustomization = await client.chatbotCustomization.updateMany({
    where: {
      userEmail: email,
    },
    data: {
      responseLength,
      clarificationPrompt,
      apologyAndRetryAttempt,
      errorMessageStyle,
    },
  });

  return updatedCustomization;
};


export const getChatsData = async (email: string, page: number, limit: number) => {
  const shop = await getShop(email);
  console.log("shop" + shop);

  if (shop) {
    const skip = (page - 1) * limit;

    const conversations = await client.conversation.findMany({
      where: {
        shopDomain: shop,
      },
      skip,
      take: limit,
      orderBy: {
        startedAt: 'desc',
      },
      include: {
        Message: {
          orderBy: {
            timestamp: 'asc',
          },
        },
      },
    });

    return conversations;
  }

  return null;
};

export const getInstallationData = async (email: string) => {
  const shop = await getShop(email);
  console.log("shop" + shop)
  if (shop) {
    return {
      shop
    }
  }
}

export const saveFeatureRequest = async (email: string, description: string, details: string, category: string) => {
  try {
    const shop = await getShop(email);
    console.log("Shop: " + shop);

    if (shop) {
      const featureRequest = await client.feature_request.create({
        data: {
          shop,
          description,
          details,
          category,
        },
      });

      console.log("Feature request saved successfully:", featureRequest);
      return featureRequest;
    } else {
      console.log("Shop not found for email:", email);
      return null;
    }
  } catch (error) {
    console.error("Error saving feature request:", error);
    throw error;
  }
};

export const upgradeData = async (email: string) => {
  try {
    const installedShop = await client.shopify_installed_shop.findUnique({
      where: {
        email: email,
      },
      select: {
        shop: true,
        accessToken: true,
      },
    });

    if (installedShop) {
      return {
        shop: installedShop.shop,
        accessToken: installedShop.accessToken,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error retrieving shop and access token:', error);
    throw error;
  }
}