import client from '../index';
import { hashPassword, verifyPassword as verifyUserPassword } from '../../lib/auth';
import axios from 'axios';
import { Pinecone } from '@pinecone-database/pinecone';
import OpenAI from "openai";
import { randomUUID } from 'crypto';
const pc = new Pinecone({
  apiKey: 'ad1612ee-9b3f-4269-9e18-362ff724713d'
});
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const findUserByEmail = async (email: string) => {
  return await client.user.findUnique({
    where: { email },
  });
};

export async function initializeDefaultCustomization(email: string) {
  try {
    // Check if a customization already exists for the given email
    const existingCustomization = await client.chatbotCustomization.findUnique({
      where: {
        userEmail: email,
      },
    });

    if (!existingCustomization) {
      // If no customization exists, initialize default values
      const defaultCustomization = await client.chatbotCustomization.create({
        data: {
          userEmail: email,
          botName: 'Yugaa',
          greetingMessage: 'Hello, how can I assist you?',
          selectedColor: "#1C2434",
          fontFamily: "Arial, sans-serif",
          fontColor: "White",
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
          logo:"https://storage.googleapis.com/yugaa-logo-storage/user.png"
        },
      });

      console.log('Default customization initialized for email:', email);
    } else {
      console.log('Customization already exists for email:', email);
    }
  } catch (error) {
    console.error('Error initializing default customization:', error);
  }
}

export const createUser = async ({ email, password }: { email: string; password: string; }) => {
  const hashedPassword = await hashPassword(password);
  // console.log(hashedPassword)
  const resp = await client.user.create({
    data: {
      email,
      password: hashedPassword,
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
  console.log("store_token: ");
  console.log(new_installed_shop);
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
        take: 2,
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
  else {
    return {
      error: "Shop is not installed yet",
    };
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
  else {
    return {
      error: "Shop is not installed yet",
    };
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
  else {
    return {
      error: "Shop is not installed yet",
    };
  }
};

export const getInstallationData = async (email: string) => {
  const shop = await getShop(email);
  console.log("shop" + shop)
  if (shop) {
    return {
      shop
    }
  }
  else {
    return {
      error: "Shop is not installed yet",
    };
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
      return {
        error: "Shop is not installed yet",
      };
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

export async function updateUserPassword(email: string, newPassword: string) {
  const hashedPassword = await hashPassword(newPassword);

  await client.user.update({
    where: { email },
    data: { password: hashedPassword },
  });
}

function extractProductData(products: any) {
  const productsData = products.map((product: any) => {
    const {
      id,
      title,
      body_html,
      product_type,
      tags,
      variants,
      options,
      image,
    } = product;

    const productString = `Title: ${title}
        Body HTML: ${body_html || ''}
        Product Type: ${product_type}
        Tags: ${tags}
        Variants: ${variants
        .map(
          (variant: any) =>
            `ID: ${variant.id}, Title: ${variant.title}, Price: ${variant.price}, SKU: ${variant.sku}, Inventory Quantity: ${variant.inventory_quantity}`
        )
        .join('; ')}
        Options: ${options
        .map((option: any) => `ID: ${option.id}, Name: ${option.name}, Values: ${option.values.join(', ')}`)
        .join('; ')}
        Image: ${image
        ? `ID: ${image.id}, Source: ${image.src}, Alt Text: ${image.alt}, Width: ${image.width}, Height: ${image.height}`
        : 'No Image'
      }`;

    return [id, productString];
  });

  return productsData;
}

export const getStoreData = async (email: string) => {
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
      const shop = installedShop.shop
      const accessToken = installedShop.accessToken

      const response = await axios.get(
        `https://${shop}/admin/api/2024-04/products.json`,
        {
          headers: {
            'X-Shopify-Access-Token': accessToken,
          },
        }
      );
      // console.log(response.data);
      const { products } = response.data
      const extractedData = extractProductData(products);
      const indexName = shop.replace(/\./g, '-');
      console.log(indexName)
      await pc.createIndex({
        name: indexName,
        dimension: 1536,
        spec: {
          serverless: {
            cloud: 'aws',
            region: 'us-east-1'
          }
        },
        metric: 'cosine',
        suppressConflicts: true
      });
      // console.log((extractedData[0][1]));
      // console.log((extractedData.length));
      for (const [id, details] of extractedData) {
        const embeddingResponse = await openai.embeddings.create({
          model: "text-embedding-ada-002",
          input: details,
        });

        const embedding = embeddingResponse.data[0].embedding;

        // Insert embedding into Pinecone
        const index = pc.index(indexName);
        await index.upsert(
          [
            {
              id: String(id),
              values: embedding,
              metadata: { data: details }
            },
          ]);
      }
    } else {
      return null;
    }
    return {
      "hello": "message"
    }
  } catch (error) {
    console.error('Error retrieving shop and access token:', error);
    throw error;
  }
}


export const updateLogo = async (email: string, logoUrl: string) => {
  if (!email) {
    throw new Error("Email is required");
  }

  const updatedCustomization = await client.chatbotCustomization.updateMany({
    where: {
      userEmail: email,
    },
    data: {
      logo: logoUrl,
    },
  });

  return updatedCustomization;
};