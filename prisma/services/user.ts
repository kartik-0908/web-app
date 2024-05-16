import client from '../index';
import { hashPassword, verifyPassword as verifyUserPassword } from '../../lib/auth';
import redis from '../../lib/redis';

export async function getEmail(shopDomain: string) {
  try {
    const user = await client.user.findUnique({
      where: {
        shopifyDomain: shopDomain,
      },
      select: {
        email: true,
      },
    });

    return user ? user.email : null;
  } catch (error) {
    console.error('Error fetching email for shopDomain:', error);
    return null;
  }
}


export const findUserByEmail = async (email: string) => {
  try {
    return await client.user.findUnique({
      where: { email },
    });
  } catch (error) {
    console.log(error)
  }
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
          logo: "https://storage.googleapis.com/logo-files/user.png"
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

export const createUser = async (email: string, password: string, shopDomain: string) => {
  const hashedPassword = await hashPassword(password);
  const resp = await client.user.create({
    data: {
      email,
      password: hashedPassword,
      shopifyDomain: shopDomain
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
  const shopify = await getShop(email)
  const shop = await client.shopify_installed_shop.findUnique({
    where: {
      shop: shopify,
    },
  });

  return shop !== null;
}
export const store_token = async (token: string, shop: string) => {
  try {
    // Check if the shop already exists
    const existingShop = await client.shopify_installed_shop.findUnique({
      where: {
        shop: shop,
      },
    });

    if (existingShop) {
      // If the shop exists, update the token
      const updatedShop = await client.shopify_installed_shop.update({
        where: {
          shop: shop,
        },
        data: {
          accessToken: token,
        },
      });
      console.log("Updated token for existing shop: ", updatedShop);
    } else {
      // If the shop does not exist, create a new row
      const newInstalledShop = await client.shopify_installed_shop.create({
        data: {
          shop: shop,
          accessToken: token,
        },
      });
      console.log("Stored token for new shop: ", newInstalledShop);
    }
  } catch (error) {
    console.error('Error storing or updating token:', error);
  }
};

export async function getShop(email: string) {
  console.log(email)
  const existingUser = await client.user.findUnique({
    where: {
      email: email
    }
  });
  console.log(existingUser)
  if (existingUser) {
    return (existingUser.shopifyDomain);
  }
}
export async function getLogoFileName(email: string) {
  console.log(email)
  const existingUser = await client.chatbotCustomization.findUnique({
    where: {
      userEmail: email
    },
    select: {
      logoFilename: true
    }
  });
  console.log(existingUser)
  if (existingUser) {
    return existingUser.logoFilename;
  }
  else {
    return "hell"
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

async function getConversationStats(shopDomain: string, startDate: Date, endDate: Date) {
  endDate.setDate(endDate.getDate() + 1);
  const totalConversations = await client.conversation.count({
    where: {
      shopDomain: shopDomain,
      startedAt: {
        gte: startDate,
        lte: endDate,
      },
    },
  });

  const totalMessages = await client.message.count({
    where: {
      Conversation: {
        shopDomain: shopDomain,
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
        shopDomain: shopDomain,
        startedAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    },
  });


  const conversations = await client.conversation.findMany({
    where: {
      shopDomain: shopDomain,
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
  if (shop) {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
      throw new Error("Invalid date format. Please ensure your dates are in a recognizable format.");
    }
    const data = await getConversationStats(shop, startDateObj, endDateObj)
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
  botName: string
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
      botName
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
  greetingMessage: string
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
      greetingMessage
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
export const getTokenwithShop = async (email: string) => {
  const shop = await getShop(email)
  try {
    const shopify = await client.shopify_installed_shop.findUnique({
      where: {
        shop: shop,
      },
      select: {
        shop: true,
        accessToken: true,
      },
    });

    if (shopify) {
      return {
        shop: shopify.shop,
        accessToken: shopify.accessToken,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error retrieving shop and token:', error);
    throw error;
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
  const shop = await getShop(email)
  try {
    const installedShop = await client.shopify_installed_shop.findUnique({
      where: {
        shop: shop,
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
export const cancelData = async (email: string) => {
  const shop = await getShop(email)
  try {
    const installedShop = await client.shopify_installed_shop.findUnique({
      where: {
        shop: shop,
      },
      select: {
        shop: true,
        accessToken: true,
      },
    });
    const planDetails = await client.planDetails.findUnique({
      where: {
        shopifyDomain: shop,
      },
      select: {
        shopifyid: true,
      },
    });
    if (installedShop && planDetails) {
      return {
        shop: installedShop.shop,
        accessToken: installedShop.accessToken,
        id: planDetails.shopifyid
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



export const getStoreData = async (shop: string, accessToken: string) => {
  try {
    const res = await redis.lpush('fetch-shopify', JSON.stringify({ shop: shop, accessToken: accessToken }));
    console.log("pushed in reddis")
    console.log(res)
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
  try {

    const updatedCustomization = await client.chatbotCustomization.updateMany({
      where: {
        userEmail: email,
      },
      data: {
        logo: logoUrl,
      },
    });

    return updatedCustomization;
  } catch (error) {
    console.log(error)
    return null
  }

};

export const getProfileData = async (email: string) => {
  const shop = await getShop(email);
  console.log("shop" + shop)
  if (shop) {
    return shop;
  }
  else {
    return {
      error: "Shop is not installed yet",
    };
  }
}

export async function check_token(shop: string) {
  try {
    const shopDomain = await client.shopify_installed_shop.findUnique({
      where: {
        shop: shop,
      },
      select: {
        accessToken: true,
      },
    });

    if (shopDomain && shopDomain.accessToken) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error checking access token:', error);
    throw error;
  }
}

export async function saveWebhookDetails(webhookResponse: any, shopDomain: any) {
  try {
    const webhook = webhookResponse.webhook;
    console.log(webhook)

    const createdWebhook = await client.registeredWebhooks.create({
      data: {
        id: String(webhook.id),
        address: webhook.address,
        topic: webhook.topic,
        created_at: webhook.created_at,
        updated_at: webhook.updated_at,
        shopDomain: shopDomain,
      },
    });
    console.log('Webhook details saved:', createdWebhook);
  } catch (error) {
    console.error('Error saving webhook details:', error);
    // throw error;
  }
}


export async function getCurrentPlan(email: string) {
  if (email) {
    const shop = await getShop(email)
    try {
      const user = await client.planDetails.findUnique({
        where: {
          shopifyDomain: shop,
        },
        select: {
          convleft: true,
          planId: true,
        },
      });

      if (user) {
        return { plan: user.planId, convleft: user.convleft };
      } else {
        return null;
      }

    } catch (error) {
      console.log(error)
      return null

    }


  }
}

export async function initializePlan(shop: string) {
  try {
    const planDetails = await client.planDetails.create({
      data: {
        shopifyDomain: shop,
        planId: 0,
        planStartDate: new Date(),
        convleft: 50
      },
    });
  } catch (error) {
    console.log(error)
  }

}

export async function getKnowledgeData(email: string) {
  if (email) {
    try {
      const shopDomain = await getShop(email);
      const shopResources = await client.knowledgeBase.findUnique({
        where: {
          shopDomain: shopDomain,
        },
      });

      if (!shopResources) {
        console.log(`No resources found for shop domain: ${shopDomain}`);
        return null;
      }

      return {
        shopDomain: shopResources.shopDomain,
        faqUrl: shopResources.faqUrl,
        termsAndConditionsUrl: shopResources.termsAndConditionsUrl,
        helpUrl: shopResources.helpUrl,
        documentFileNames: shopResources.documents,
        videoLinkUrls: shopResources.videoLinkUrls,
      };
    } catch (error) {
      console.error('Error fetching shop resources:', error);
      throw error;
    }
  }
}

export async function updatePlanDetails(shopifyDomain: string): Promise<void> {
  try {
    await client.planDetails.update({
      where: {
        shopifyDomain: shopifyDomain,
      },
      data: {
        planId: 0,
        convleft: 50,
      },
    });
    console.log('Plan details updated successfully');
  } catch (error) {
    console.error('Error updating plan details:', error);
    throw error;
  }
}

export async function addFaqUrl(email: string, faqUrl: string) {
  const shopDomain = await getShop(email);
  if (shopDomain) {
    try {
      // Check if the record exists
      const knowledgeBase = await client.knowledgeBase.findUnique({
        where: { shopDomain },
      });

      if (knowledgeBase) {
        // Update the existing record
        await client.knowledgeBase.update({
          where: { shopDomain },
          data: { faqUrl },
        });
      } else {
        // Create a new record if it doesn't exist
        await client.knowledgeBase.create({
          data: {
            shopDomain,
            faqUrl,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export async function deleteFaqUrl(email: string): Promise<void> {
  const shopDomain = await getShop(email);
  try {
    // Check if the record exists
    const knowledgeBase = await client.knowledgeBase.findUnique({
      where: { shopDomain },
    });

    if (knowledgeBase) {
      // Update the existing record by setting faqUrl to null
      await client.knowledgeBase.update({
        where: { shopDomain },
        data: { faqUrl: null },
      });
      const res = await redis.lpush('fetch-links', JSON.stringify({ id: 0, shop: shopDomain, url: "termsurl", type: "delete" }));

    }
  } catch (error) {
    console.log(error);
  }
}

export async function addTermsAndConditionsUrl(email: string, termsAndConditionsUrl: string): Promise<void> {
  const shopDomain = await getShop(email) || "";
  try {
    // Check if the record exists
    const knowledgeBase = await client.knowledgeBase.findUnique({
      where: { shopDomain },
    });

    if (knowledgeBase) {
      // Update the existing record
      await client.knowledgeBase.update({
        where: { shopDomain },
        data: { termsAndConditionsUrl },
      });
    } else {
      // Create a new record if it doesn't exist
      await client.knowledgeBase.create({
        data: {
          shopDomain,
          termsAndConditionsUrl,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function deleteTermsAndConditionsUrl(email: string): Promise<void> {
  const shopDomain = await getShop(email);
  try {
    // Check if the record exists
    const knowledgeBase = await client.knowledgeBase.findUnique({
      where: { shopDomain },
    });

    if (knowledgeBase) {
      // Update the existing record by setting termsAndConditionsUrl to null
      await client.knowledgeBase.update({
        where: { shopDomain },
        data: { termsAndConditionsUrl: null },
      });
      const res = await redis.lpush('fetch-links', JSON.stringify({ id: 1, shop: shopDomain, url: "termsurl", type: "delete" }));

    }
  } catch (error) {
    console.log(error);
  }
}

export async function addHelpUrl(email: string, helpUrl: string): Promise<void> {
  const shopDomain = await getShop(email) || "";
  try {
    // Check if the record exists
    const knowledgeBase = await client.knowledgeBase.findUnique({
      where: { shopDomain },
    });

    if (knowledgeBase) {
      // Update the existing record
      await client.knowledgeBase.update({
        where: { shopDomain },
        data: { helpUrl },
      });
    } else {
      // Create a new record if it doesn't exist
      await client.knowledgeBase.create({
        data: {
          shopDomain,
          helpUrl,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function deleteHelpUrl(email: string): Promise<void> {
  const shopDomain = await getShop(email);
  try {
    // Check if the record exists
    const knowledgeBase = await client.knowledgeBase.findUnique({
      where: { shopDomain },
    });

    if (knowledgeBase) {
      // Update the existing record by setting helpUrl to null
      await client.knowledgeBase.update({
        where: { shopDomain },
        data: { helpUrl: null },
      });
      const res = await redis.lpush('fetch-links', JSON.stringify({ id: 2, shop: shopDomain, url: "termsurl", type: "delete" }));

    }
  } catch (error) {
    console.log(error);
  }
}

export async function updateKbDoc(email: string, fileName: string, file_url: string) {
  const shop = await getShop(email)
  try {

    await client.knowledgeBase.update({
      where: { shopDomain: shop },
      data: {
        documents: {
          push: {
            fileName: fileName,
            fileUrl: file_url,
          },
        },
      },
    });
    return true;

  } catch (error) {
    console.error('Database update failed:', error);
    return false
  }
}
interface Document {
  fileUrl: string;
  fileName: string;
}

function getDocuments(document: any, fileName: string) {
  let newDoc = [];
  for (let i = 0; i < document.length; i++) {
    const body = document[i];
    console.log(body.fileName)
    console.log(fileName)
    if (body.fileName === fileName) {
      continue;
    }
    else {
      newDoc.push(body)
    }
  }
  return newDoc
}


export async function deleteKbDoc(email: string, fileName: string) {
  const shop = await getShop(email);

  try {
    const knowledgeBase = await client.knowledgeBase.findUnique({
      where: { shopDomain: shop },
      select: { documents: true }
    });
    if (knowledgeBase && Array.isArray(knowledgeBase.documents)) {
      // Assert that documents are of type Document[]
      const documents = knowledgeBase.documents as unknown as Document[];

      // Filter out the document with the given fileName
      const filteredDocuments = getDocuments(documents, fileName)

      // Update the documents in the knowledge base
      await client.knowledgeBase.update({
        where: { shopDomain: shop },
        data: { documents: filteredDocuments }
      });

      console.log(`Document '${fileName}' has been removed successfully.`);
    } else {
      console.log(`No documents found or shopDomain '${shop}' does not exist.`);
    }
    return true;
  } catch (error) {
    console.error('Database deletion failed:', error);
    return false;
  }
}
export async function addVideoLink(email: string, videoUrl: string): Promise<void> {
  const shop = await getShop(email)
  try {
    // Optionally, check if the videoUrl already exists to avoid duplicates
    const knowledgeBase = await client.knowledgeBase.findUnique({
      where: { shopDomain: shop }
    });

    if (knowledgeBase && !knowledgeBase.videoLinkUrls.includes(videoUrl)) {
      await client.knowledgeBase.update({
        where: { shopDomain: shop },
        data: {
          videoLinkUrls: {
            push: videoUrl
          }
        }
      });
      console.log('Video link added successfully.');
    } else {
      console.log('Video link already exists or shopDomain not found.');
    }
  } catch (error) {
    console.error('Failed to add video link:', error);
    throw new Error('Failed to add video link');
  }
}

export async function removeVideoLink(email: string, videoUrl: string): Promise<void> {
  const shopDomain = await getShop(email)

  try {
    const knowledgeBase = await client.knowledgeBase.findUnique({
      where: { shopDomain }
    });

    if (knowledgeBase && knowledgeBase.videoLinkUrls.includes(videoUrl)) {
      const updatedUrls = knowledgeBase.videoLinkUrls.filter(url => url !== videoUrl);
      await client.knowledgeBase.update({
        where: { shopDomain },
        data: {
          videoLinkUrls: updatedUrls
        }
      });
      console.log('Video link removed successfully.');
    } else {
      console.log('Video link not found or shopDomain not found.');
    }
  } catch (error) {
    console.error('Failed to remove video link:', error);
    throw new Error('Failed to remove video link');
  }
}
export async function getKbDetails(email: string) {
  const shopDomain = await getShop(email)

  try {
    if (shopDomain) {
      const knowledgeBase = await client.knowledgeBase.findUnique({
        where: {
          shopDomain: shopDomain,
        },
      });
      return knowledgeBase;
    }

  } catch (error) {
    console.error('Error fetching KnowledgeBase details:', error);
    throw new Error('Failed to fetch KnowledgeBase details');
  }
}
