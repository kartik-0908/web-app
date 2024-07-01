// "use server"
// import prisma from '../../prisma/index';
// import { hashPassword, verifyPassword as verifyUserPassword } from '../../lib/auth';
// import { v4 as uuidv4 } from 'uuid';
// import { sendEmail, sendEmailInvitation } from './communication/email';
// import { auth, signIn, unstable_update } from '@/app/auth';

// // export const findUserByEmail = async (email: string) => {
// //   try {
// //     return await prisma.user.findUnique({
// //       where: { email },
// //     });
// //   } catch (error) {
// //     console.log(error)
// //   }
// // };


// export const createUser = async (email: string, password: string) => {
//   try {
//     const hashedPassword = await hashPassword(password);
//     const verificationToken = uuidv4(); // Generate a unique verification token
//     const verificationLink = `${process.env.BASE_URL}/verify?token=${verificationToken}`; // Create verification link
//     console.log(verificationLink)
//     const resp = await prisma.user.create({
//       data: {
//         email,
//         password: hashedPassword,
//         roleId: "admin",
//         verificationToken,
//         verified: false,
//       },
//     });
//     await sendEmail(email, verificationLink);
//     console.log(resp);
//     return resp;

//   } catch (error) {
//     console.log(error)

//   }

// };

// export const createUser2 = async (email: string, password: string, shop: string, firstName: string, lastName: string, role: string) => {
//   try {
//     const hashedPassword = await hashPassword(password);
//     const verificationToken = uuidv4(); // Generate a unique verification token
//     const verificationLink = `${process.env.BASE_URL}/verify?token=${verificationToken}`; // Create verification link
//     console.log(verificationLink)
//     const resp = await prisma.user.create({
//       data: {
//         email,
//         password: hashedPassword,
//         roleId: role,
//         verificationToken,
//         verified: false,
//         firstName,
//         lastName,
//         shopDomain: shop
//       },
//     });
//     await sendEmail(email, verificationLink);
//     console.log(resp);
//     return true;
//   } catch (error) {
//     console.log(error)
//     throw new Error("User creation Failed")
//   }

// };

// export const verifyPassword = async (password: string, hashedPassword: string) => {
//   return await verifyUserPassword(password, hashedPassword);
// };

// export const updateLastLoginAt = async (email: string) => {
//   const now = new Date();
//   await prisma.user.update({
//     where: { email },
//     data: { lastLoginAt: now },
//   });
// };

// export const isShopInstalled = async (email: string) => {
//   const shopify = await getShop(email)
//   const shop = await prisma.shopifyInstalledShop.findUnique({
//     where: {
//       shop: shopify,
//     },
//   });

//   return shop !== null;
// }

// export async function getShop(email: string) {
//   console.log(email)
//   const existingUser = await prisma.user.findUnique({
//     where: {
//       email: email
//     }
//   });
//   console.log(existingUser)
//   if (existingUser) {
//     return (existingUser.shopDomain || "");
//   }
// }
// export async function getLogoFileName(shop: string) {
//   // console.log(shop)
//   const existingUser = await prisma.chatbotCustomization.findUnique({
//     where: {
//       shopDomain: shop
//     },
//     select: {
//       logoFilename: true
//     }
//   });
//   console.log(existingUser)
//   if (existingUser) {
//     return existingUser.logoFilename;
//   }
//   else {
//     return "hell"
//   }
// }
// async function getlastThreeConversations(shopDomain: string) {
//   const result = prisma.conversation.findMany({
//     where: { shopDomain },
//     take: 3,
//     orderBy: { startedAt: 'desc' },
//     include: {
//       messages: {
//         orderBy: { timestamp: 'asc' },
//         take: 2,
//       },

//     },
//   });
//   return (result);
// }
// async function getWeeklyConversationStartTimes(shopDomain: string): Promise<Array<Array<[number, number]>>> {
//   const startDate = new Date();
//   startDate.setDate(startDate.getDate() - startDate.getDay() + (startDate.getDay() === 0 ? -6 : 1)); // Adjust to start from the last Monday
//   startDate.setHours(0, 0, 0, 0); // Set to the start of the day

//   const conversations = await prisma.conversation.findMany({
//     where: {
//       shopDomain: shopDomain,
//       startedAt: {
//         gte: startDate,
//       },
//     },
//     orderBy: {
//       startedAt: 'asc',
//     },
//   });

//   // Initialize an array to hold conversation start times for each day of the current week
//   const weekData: Array<Array<[number, number]>> = [[], [], [], [], [], [], []];

//   conversations.forEach(conversation => {
//     const dayIndex = conversation.startedAt.getDay() - 1; // Adjust index (0 = Monday, 6 = Sunday)
//     const hour = conversation.startedAt.getHours();
//     const minute = conversation.startedAt.getMinutes();
//     if (dayIndex >= 0) { // Ignore conversations from before the current week
//       weekData[dayIndex].push([hour, minute]);
//     }
//   });
//   return weekData;
// }

// async function getConversationCountsForLast7Days(shopDomain: string): Promise<number[]> {
//   const counts = new Array(7).fill(0); // Initialize an array of 7 days with 0
//   const endDate = new Date(); // Today
//   const startDate = new Date();
//   startDate.setDate(endDate.getDate() - 6); // Set to 7 days ago
//   startDate.setHours(0, 0, 0, 0); // Start of the day, 7 days ago

//   const conversations = await prisma.conversation.findMany({
//     where: {
//       shopDomain: shopDomain,
//       startedAt: {
//         gte: startDate,
//         lte: endDate,
//       },
//     },
//   });

//   conversations.forEach(conversation => {
//     const diff = Math.floor((conversation.startedAt.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
//     if (diff >= 0 && diff < 7) {
//       counts[diff]++; // Increment the count for the corresponding day
//     }
//   });

//   return counts;
// }

// export const getHomeData = async (shop: string) => {
//   // const shop = await getShop(email);
//   console.log("shop" + shop)
//   if (shop) {
//     const currentWeekData = await getWeeklyConversationStartTimes(shop)
//     const last7Days = await getConversationCountsForLast7Days(shop)
//     const lastThreeConversations = await getlastThreeConversations(shop)
//     return {
//       currentWeekData,
//       last7Days,
//       lastThreeConversations,
//     }
//   }
//   else {
//     return {
//       error: "Shop is not installed yet",
//     };
//   }
// }

// async function getConversationStats(shopDomain: string, startDate: Date, endDate: Date) {
//   console.log(startDate)
//   console.log(endDate)

//   const totalConversations = await prisma.conversation.count({
//     where: {
//       shopDomain: shopDomain,
//       startedAt: {
//         gte: startDate,
//         lte: endDate,
//       },
//     },
//   });

//   const totalMessages = await prisma.message.count({
//     where: {
//       conversation: {
//         shopDomain: shopDomain,
//         startedAt: {
//           gte: startDate,
//           lte: endDate,
//         },
//       },
//     },
//   });

//   const unansweredMessages = await prisma.message.count({
//     where: {
//       unanswered: true,
//       conversation: {
//         shopDomain: shopDomain,
//         startedAt: {
//           gte: startDate,
//           lte: endDate,
//         },
//       },
//     },
//   });

//   const conversations = await prisma.conversation.findMany({
//     where: {
//       shopDomain: shopDomain,
//       startedAt: {
//         gte: startDate,
//         lte: endDate,
//       },
//     },
//     include: {
//       messages: {
//         orderBy: {
//           timestamp: 'desc',
//         },
//         take: 1, // Only fetch the last message of each conversation
//       },
//     },
//   });

//   let totalDurationSeconds = 0;
//   const daysDifference = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
//   let intervals: number[];

//   if (daysDifference <= 12) {
//     intervals = new Array(12).fill(0);

//     conversations.forEach(conversation => {
//       if (conversation.messages.length > 0) {
//         const lastMessageTimestamp = conversation.messages[0].timestamp;
//         const duration = lastMessageTimestamp.getTime() - conversation.startedAt.getTime();
//         totalDurationSeconds += duration / 1000; // Convert milliseconds to seconds
//       }

//       const dayIndex = Math.floor((conversation.startedAt.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
//       intervals[dayIndex] += 1;
//     });

//   } else {
//     const intervalSize = Math.floor(daysDifference / 12);
//     intervals = new Array(12).fill(0);

//     conversations.forEach(conversation => {
//       if (conversation.messages.length > 0) {
//         const lastMessageTimestamp = conversation.messages[0].timestamp;
//         const duration = lastMessageTimestamp.getTime() - conversation.startedAt.getTime();
//         totalDurationSeconds += duration / 1000; // Convert milliseconds to seconds
//       }

//       const dayIndex = Math.floor((conversation.startedAt.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
//       const intervalIndex = Math.floor(dayIndex / intervalSize);

//       if (intervalIndex < 12) {
//         intervals[intervalIndex] += 1;
//       } else {
//         intervals[11] += 1;
//       }
//     });
//   }

//   const averageDurationSeconds = totalDurationSeconds / conversations.length;
//   console.log({ intervals })


//   // Return aggregated data
//   return {
//     totalConversations,
//     totalMessages,
//     unansweredMessages,
//     averageDurationSeconds,
//     conversationsOverTime: { intervals },
//   };
// }

// export const getAnalyticsData = async (email: string, startDate: string, endDate: string) => {
//   const shop = await getShop(email);
//   console.log("inside getanalytics" + email)
//   console.log("shop" + shop)
//   if (shop) {
//     const startDateObj = new Date(startDate);
//     const endDateObj = new Date(endDate);
//     if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
//       throw new Error("Invalid date format. Please ensure your dates are in a recognizable format.");
//     }
//     const data = await getConversationStats(shop, startDateObj, endDateObj)
//     return {
//       analyticsData: data
//     }
//   }
//   else {
//     return {
//       error: "Shop is not installed yet",
//     };
//   }


// }

// export const getCustomizationData = async (shop: string) => {
//   if (shop) {
//     const customizations = await prisma.chatbotCustomization.findMany({
//       where: {
//         shopDomain: shop,
//       },

//     });
//     return customizations
//   }
// }
// export const updateAppearance = async (
//   shop: string,
//   selectedColor: string,
//   fontFamily: string,
//   fontColor: string,
//   widgetPosition: string,
//   botName: string
// ) => {
//   if (!shop) {
//     throw new Error("Shop is required");
//   }

//   const updatedCustomization = await prisma.chatbotCustomization.updateMany({
//     where: {
//       shopDomain: shop,
//     },
//     data: {
//       selectedColor,
//       fontFamily,
//       fontColor,
//       widgetPosition,
//       botName
//     },
//   });
//   return updatedCustomization;
// };

// export const updateCustomGreetings = async (
//   shop: string,
//   botName: string,
//   greetingMessage: string,
// ) => {
//   if (!shop) {
//     throw new Error("Email is required");
//   }

//   const updatedCustomization = await prisma.chatbotCustomization.updateMany({
//     where: {
//       shopDomain: shop,
//     },
//     data: {
//       botName,
//       greetingMessage,
//     },
//   });

//   return updatedCustomization;
// };

// export const updateLanguageCustomization = async (
//   shop: string,
//   toneAndStyle: string,
//   userGuidance: string,
//   positiveReinforcement: string,
//   errorHandling: string,
//   politeness: string,
//   clarityAndSimplicity: string,
//   personalization: string,
// ) => {
//   if (!shop) {
//     throw new Error("Email is required");
//   }

//   const updatedCustomization = await prisma.chatbotCustomization.updateMany({
//     where: {
//       shopDomain: shop,
//     },
//     data: {
//       toneAndStyle,
//       userGuidance,
//       positiveReinforcement,
//       errorHandling,
//       politeness,
//       clarityAndSimplicity,
//       personalization,
//     },
//   });

//   return updatedCustomization;
// };


// export const updateBehavioralCustomization = async (
//   shop: string,
//   responseLength: string,
//   clarificationPrompt: string,
//   apologyAndRetryAttempt: string,
//   errorMessageStyle: string,
//   greetingMessage: string
// ) => {
//   if (!shop) {
//     throw new Error("Email is required");
//   }

//   const updatedCustomization = await prisma.chatbotCustomization.updateMany({
//     where: {
//       shopDomain: shop,
//     },
//     data: {
//       responseLength,
//       clarificationPrompt,
//       apologyAndRetryAttempt,
//       errorMessageStyle,
//       greetingMessage
//     },
//   });

//   return updatedCustomization;
// };


// export const getChatsData = async (email: string, page: number, limit: number) => {
//   const shop = await getShop(email);
//   console.log("shop" + shop);

//   if (shop) {
//     const skip = (page - 1) * limit;

//     const conversations = await prisma.ticket.findMany({
//       where: {
//         shopDomain: shop,
//       },
//       skip,
//       take: limit,
//       orderBy: {
//         createdAt: 'desc',
//       },
//       include: {
//         ticketConversations: {
//           include: {
//             conversation: {
//               include: {
//                 messages: {
//                   orderBy: {
//                     timestamp: 'asc'
//                   }
//                 }
//               }
//             }
//           }
//         },
//       },
//     });

//     return conversations;
//   }
//   else {
//     return {
//       error: "Shop is not installed yet",
//     };
//   }
// };

// export const getInstallationData = async (email: string) => {
//   const shop = await getShop(email);
//   console.log("shop" + shop)
//   if (shop) {
//     return {
//       shop
//     }
//   }
//   else {
//     return {
//       error: "Shop is not installed yet",
//     };
//   }
// }
// export const getTokenwithShop = async (email: string) => {
//   const shop = await getShop(email)
//   try {
//     const shopify = await prisma.shopifyInstalledShop.findUnique({
//       where: {
//         shop: shop,
//       },
//       select: {
//         shop: true,
//         accessToken: true,
//       },
//     });

//     if (shopify) {
//       return {
//         shop: shopify.shop,
//         accessToken: shopify.accessToken,
//       };
//     } else {
//       return null;
//     }
//   } catch (error) {
//     console.error('Error retrieving shop and token:', error);
//     throw error;
//   }
// }

// export const saveFeatureRequest = async (email: string, description: string, details: string, category: string) => {
//   try {
//     const shop = await getShop(email);
//     console.log("Shop: " + shop);

//     if (shop) {
//       const featureRequest = await prisma.featureRequest.create({
//         data: {
//           shop,
//           description,
//           details,
//           category,
//         },
//       });

//       console.log("Feature request saved successfully:", featureRequest);
//       return featureRequest;
//     } else {
//       return {
//         error: "Shop is not installed yet",
//       };
//     }
//   } catch (error) {
//     console.error("Error saving feature request:", error);
//     throw error;
//   }
// };

// export const upgradeData = async (email: string) => {
//   const shop = await getShop(email)
//   try {
//     const installedShop = await prisma.shopifyInstalledShop.findUnique({
//       where: {
//         shop: shop,
//       },
//       select: {
//         shop: true,
//         accessToken: true,
//       },
//     });

//     if (installedShop) {
//       return {
//         shop: installedShop.shop,
//         accessToken: installedShop.accessToken,
//       };
//     } else {
//       return null;
//     }
//   } catch (error) {
//     console.error('Error retrieving shop and access token:', error);
//     throw error;
//   }
// }
// export const cancelData = async (email: string) => {
//   const shop = await getShop(email)
//   try {
//     const installedShop = await prisma.shopifyInstalledShop.findUnique({
//       where: {
//         shop: shop,
//       },
//       select: {
//         shop: true,
//         accessToken: true,
//       },
//     });
//     const planDetails = await prisma.planDetails.findUnique({
//       where: {
//         shopifyDomain: shop,
//       },
//       select: {
//         shopifyid: true,
//       },
//     });
//     if (installedShop && planDetails) {
//       return {
//         shop: installedShop.shop,
//         accessToken: installedShop.accessToken,
//         id: planDetails.shopifyid
//       };
//     } else {
//       return null;
//     }
//   } catch (error) {
//     console.error('Error retrieving shop and access token:', error);
//     throw error;
//   }
// }

// export async function updateUserPassword(email: string, newPassword: string) {
//   const hashedPassword = await hashPassword(newPassword);

//   await prisma.user.update({
//     where: { email },
//     data: { password: hashedPassword },
//   });
// }





// export const updateLogo = async (shop: string, logoUrl: string) => {
//   if (!shop) {
//     throw new Error("Email is required");
//   }
//   try {

//     const updatedCustomization = await prisma.chatbotCustomization.updateMany({
//       where: {
//         shopDomain: shop,
//       },
//       data: {
//         logo: logoUrl,
//       },
//     });

//     return updatedCustomization;
//   } catch (error) {
//     console.log(error)
//     return null
//   }

// };

// export const getProfileData = async (email: string) => {
//   const shop = await getShop(email);
//   console.log("shop" + shop)
//   if (shop) {
//     return shop;
//   }
//   else {
//     return {
//       error: "Shop is not installed yet",
//     };
//   }
// }

// export async function check_token(shop: string) {
//   try {
//     const shopDomain = await prisma.shopifyInstalledShop.findUnique({
//       where: {
//         shop: shop,
//       },
//       select: {
//         accessToken: true,
//       },
//     });

//     if (shopDomain && shopDomain.accessToken) {
//       return true;
//     } else {
//       return false;
//     }
//   } catch (error) {
//     console.error('Error checking access token:', error);
//     throw error;
//   }
// }

// export async function saveWebhookDetails(webhookResponse: any, shopDomain: any) {
//   try {
//     const webhook = webhookResponse.webhook;
//     console.log(webhook)

//     const createdWebhook = await prisma.registeredWebhooks.create({
//       data: {
//         id: String(webhook.id),
//         address: webhook.address,
//         topic: webhook.topic,
//         created_at: webhook.created_at,
//         updated_at: webhook.updated_at,
//         shopDomain: shopDomain,
//       },
//     });
//     console.log('Webhook details saved:', createdWebhook);
//   } catch (error) {
//     console.error('Error saving webhook details:', error);
//     // throw error;
//   }
// }


// export async function getCurrentPlan(email: string) {
//   if (email) {
//     const shop = await getShop(email)
//     try {
//       const user = await prisma.planDetails.findUnique({
//         where: {
//           shopifyDomain: shop,
//         },
//         select: {
//           convleft: true,
//           planId: true,
//         },
//       });

//       if (user) {
//         return { plan: user.planId, convleft: user.convleft };
//       } else {
//         return null;
//       }

//     } catch (error) {
//       console.log(error)
//       return null

//     }


//   }
// }

// export async function initializePlan(shop: string) {
//   try {
//     const planDetails = await prisma.planDetails.create({
//       data: {
//         shopifyDomain: shop,
//         planId: 0,
//         planStartDate: new Date(),
//         convleft: 50
//       },
//     });
//   } catch (error) {
//     console.log(error)
//   }

// }

// export async function getKnowledgeData(email: string) {
//   if (email) {
//     try {
//       const shopDomain = await getShop(email);
//       const shopResources = await prisma.knowledgeBase.findUnique({
//         where: {
//           shopDomain: shopDomain,
//         },
//       });

//       if (!shopResources) {
//         console.log(`No resources found for shop domain: ${shopDomain}`);
//         return null;
//       }

//       return {
//         shopDomain: shopResources.shopDomain,
//         faqUrl: shopResources.faqUrl,
//         termsAndConditionsUrl: shopResources.termsAndConditionsUrl,
//         helpUrl: shopResources.helpUrl,
//         documentFileNames: shopResources.documents,
//         videoLinkUrls: shopResources.videoLinkUrls,
//       };
//     } catch (error) {
//       console.error('Error fetching shop resources:', error);
//       throw error;
//     }
//   }
// }

// export async function updatePlanDetails(shopifyDomain: string): Promise<void> {
//   try {
//     await prisma.planDetails.update({
//       where: {
//         shopifyDomain: shopifyDomain,
//       },
//       data: {
//         planId: 0,
//         convleft: 50,
//       },
//     });
//     console.log('Plan details updated successfully');
//   } catch (error) {
//     console.error('Error updating plan details:', error);
//     throw error;
//   }
// }

// export async function addFaqUrl(email: string, faqUrl: string) {
//   const shopDomain = await getShop(email);
//   if (shopDomain) {
//     try {
//       // Check if the record exists
//       const knowledgeBase = await prisma.knowledgeBase.findUnique({
//         where: { shopDomain },
//       });

//       if (knowledgeBase) {
//         // Update the existing record
//         await prisma.knowledgeBase.update({
//           where: { shopDomain },
//           data: { faqUrl },
//         });
//       } else {
//         // Create a new record if it doesn't exist
//         await prisma.knowledgeBase.create({
//           data: {
//             shopDomain,
//             faqUrl,
//           },
//         });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }

// export async function deleteFaqUrl(email: string): Promise<void> {
//   const shopDomain = await getShop(email);
//   try {
//     // Check if the record exists
//     const knowledgeBase = await prisma.knowledgeBase.findUnique({
//       where: { shopDomain },
//     });

//     if (knowledgeBase) {
//       // Update the existing record by setting faqUrl to null
//       await prisma.knowledgeBase.update({
//         where: { shopDomain },
//         data: { faqUrl: null },
//       });
//       // const res = await redis.lpush('fetch-links', JSON.stringify({ id: 0, shop: shopDomain, url: "termsurl", type: "delete" }));

//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

// export async function addTermsAndConditionsUrl(email: string, termsAndConditionsUrl: string): Promise<void> {
//   const shopDomain = await getShop(email) || "";
//   try {
//     // Check if the record exists
//     const knowledgeBase = await prisma.knowledgeBase.findUnique({
//       where: { shopDomain },
//     });

//     if (knowledgeBase) {
//       // Update the existing record
//       await prisma.knowledgeBase.update({
//         where: { shopDomain },
//         data: { termsAndConditionsUrl },
//       });
//     } else {
//       // Create a new record if it doesn't exist
//       await prisma.knowledgeBase.create({
//         data: {
//           shopDomain,
//           termsAndConditionsUrl,
//         },
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

// export async function deleteTermsAndConditionsUrl(email: string): Promise<void> {
//   const shopDomain = await getShop(email);
//   try {
//     // Check if the record exists
//     const knowledgeBase = await prisma.knowledgeBase.findUnique({
//       where: { shopDomain },
//     });

//     if (knowledgeBase) {
//       // Update the existing record by setting termsAndConditionsUrl to null
//       await prisma.knowledgeBase.update({
//         where: { shopDomain },
//         data: { termsAndConditionsUrl: null },
//       });
//       // const res = await redis.lpush('fetch-links', JSON.stringify({ id: 1, shop: shopDomain, url: "termsurl", type: "delete" }));

//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

// export async function addHelpUrl(email: string, helpUrl: string): Promise<void> {
//   const shopDomain = await getShop(email) || "";
//   try {
//     // Check if the record exists
//     const knowledgeBase = await prisma.knowledgeBase.findUnique({
//       where: { shopDomain },
//     });

//     if (knowledgeBase) {
//       // Update the existing record
//       await prisma.knowledgeBase.update({
//         where: { shopDomain },
//         data: { helpUrl },
//       });
//     } else {
//       // Create a new record if it doesn't exist
//       await prisma.knowledgeBase.create({
//         data: {
//           shopDomain,
//           helpUrl,
//         },
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

// export async function deleteHelpUrl(email: string): Promise<void> {
//   const shopDomain = await getShop(email);
//   try {
//     // Check if the record exists
//     const knowledgeBase = await prisma.knowledgeBase.findUnique({
//       where: { shopDomain },
//     });

//     if (knowledgeBase) {
//       // Update the existing record by setting helpUrl to null
//       await prisma.knowledgeBase.update({
//         where: { shopDomain },
//         data: { helpUrl: null },
//       });
//       // const res = await redis.lpush('fetch-links', JSON.stringify({ id: 2, shop: shopDomain, url: "termsurl", type: "delete" }));

//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

// export async function updateKbDoc(email: string, fileName: string, file_url: string) {
//   const shop = await getShop(email) || "";
//   try {
//     const knowledgeBase = await prisma.knowledgeBase.findUnique({
//       where: { shopDomain: shop },
//     });
//     if (knowledgeBase) {
//     } else {
//       await prisma.knowledgeBase.create({
//         data: {
//           shopDomain: shop
//         }
//       });
//     }
//     await prisma.knowledgeBase.update({
//       where: { shopDomain: shop },
//       data: {
//         documents: {
//           push: {
//             fileName: fileName,
//             fileUrl: file_url,
//           },
//         },
//       },
//     });
//     return true;
//   } catch (error) {
//     console.error('Database update failed:', error);
//     return false
//   }
// }
// interface Document {
//   fileUrl: string;
//   fileName: string;
// }

// function getDocuments(document: any, fileName: string) {
//   let newDoc = [];
//   for (let i = 0; i < document.length; i++) {
//     const body = document[i];
//     console.log(body.fileName)
//     console.log(fileName)
//     if (body.fileName === fileName) {
//       continue;
//     }
//     else {
//       newDoc.push(body)
//     }
//   }
//   return newDoc
// }


// export async function deleteKbDoc(email: string, fileName: string) {
//   const shop = await getShop(email);

//   try {
//     const knowledgeBase = await prisma.knowledgeBase.findUnique({
//       where: { shopDomain: shop },
//       select: { documents: true }
//     });
//     if (knowledgeBase && Array.isArray(knowledgeBase.documents)) {
//       // Assert that documents are of type Document[]
//       const documents = knowledgeBase.documents as unknown as Document[];

//       // Filter out the document with the given fileName
//       const filteredDocuments = getDocuments(documents, fileName)

//       // Update the documents in the knowledge base
//       await prisma.knowledgeBase.update({
//         where: { shopDomain: shop },
//         data: { documents: filteredDocuments }
//       });

//       console.log(`Document '${fileName}' has been removed successfully.`);
//     } else {
//       console.log(`No documents found or shopDomain '${shop}' does not exist.`);
//     }
//     return true;
//   } catch (error) {
//     console.error('Database deletion failed:', error);
//     return false;
//   }
// }
// export async function addVideoLink(email: string, videoUrl: string): Promise<void> {
//   const shop = await getShop(email)
//   try {
//     // Optionally, check if the videoUrl already exists to avoid duplicates
//     const knowledgeBase = await prisma.knowledgeBase.findUnique({
//       where: { shopDomain: shop }
//     });

//     if (knowledgeBase && !knowledgeBase.videoLinkUrls.includes(videoUrl)) {
//       await prisma.knowledgeBase.update({
//         where: { shopDomain: shop },
//         data: {
//           videoLinkUrls: {
//             push: videoUrl
//           }
//         }
//       });
//       console.log('Video link added successfully.');
//     } else {
//       console.log('Video link already exists or shopDomain not found.');
//     }
//   } catch (error) {
//     console.error('Failed to add video link:', error);
//     throw new Error('Failed to add video link');
//   }
// }

// export async function removeVideoLink(email: string, videoUrl: string): Promise<void> {
//   const shopDomain = await getShop(email)

//   try {
//     const knowledgeBase = await prisma.knowledgeBase.findUnique({
//       where: { shopDomain }
//     });

//     if (knowledgeBase && knowledgeBase.videoLinkUrls.includes(videoUrl)) {
//       const updatedUrls = knowledgeBase.videoLinkUrls.filter(url => url !== videoUrl);
//       await prisma.knowledgeBase.update({
//         where: { shopDomain },
//         data: {
//           videoLinkUrls: updatedUrls
//         }
//       });
//       console.log('Video link removed successfully.');
//     } else {
//       console.log('Video link not found or shopDomain not found.');
//     }
//   } catch (error) {
//     console.error('Failed to remove video link:', error);
//     throw new Error('Failed to remove video link');
//   }
// }
// export async function getKbDetails(email: string) {
//   const shopDomain = await getShop(email)

//   try {
//     if (shopDomain) {
//       const knowledgeBase = await prisma.knowledgeBase.findUnique({
//         where: {
//           shopDomain: shopDomain,
//         },
//       });
//       return knowledgeBase;
//     }

//   } catch (error) {
//     console.error('Error fetching KnowledgeBase details:', error);
//     throw new Error('Failed to fetch KnowledgeBase details');
//   }
// }

// async function getShopfromSession() {
//   const session = await auth();
//   if (!session || !session.user || !session.user.shopDomain) {
//     return null;
//   }
//   return session.user.shopDomain
// }

// export async function updateForm(domain: string) {
//   const session = await auth();
//   if (!session || !session.user || !session.user.email) {
//     return { error: 'User is not authenticated.' };
//   }

//   try {
//     const user = session.user
//     await unstable_update({
//       ...session,
//       user: {
//         ...user,
//         shopDomain: domain,
//       }
//     })
//     return { success: true };
//   } catch (error) {
//     console.error('Error updating user:', error);
//     return { error: 'Failed to update user.' };
//   }
// }
// export async function updateVerified() {
//   console.log("inisde update");


//   const session = await auth();
//   console.log(session)

//   if (!session || !session.user || !session.user.email) {
//     return { error: 'User is not authenticated.' };
//   }

//   try {
//     const user = session.user
//     // await unstable_update({
//     //   ...session,
//     //   user: {
//     //     ...session.user,
//     //     verified: true,
//     //   }
//     // })
//     await signIn()
//     console.log("inisde update");
//     console.log(session)
//     return { success: true };
//   } catch (error) {
//     console.error('Error updating user:', error);
//     return { error: 'Failed to update user.' };
//   }
// }

// export async function getMembers() {
//   const shop = await getShopfromSession();
//   if (!shop) {
//     return { error: 'User is not authenticated.' };
//   }
//   try {
//     const users = await prisma.user.findMany({
//       where: {
//         shopDomain: shop,
//       },
//     });
//     const codes = await prisma.shopifyInstalledShop.findUnique({
//       where: {
//         shop: shop
//       },
//     })
//     const adminCode = codes?.adminInviteCode || "admincode";
//     const memberCode = codes?.memberInviteCode || "memebercode";
//     const adminLink = `${process.env.BASE_URL}/verify/invite?admin=${adminCode}` || "";
//     const memberLink = `${process.env.BASE_URL}/verify/invite?member=${memberCode}` || "";
//     return { users, adminLink, memberLink };
//   } catch (error) {
//     console.error('Error retrieving members:', error);
//     return { error: 'An error occurred while retrieving members.' };
//   }
// }
// export async function sendInvitation(email: string, role: string) {
//   const shop = await getShopfromSession();
//   if (!shop) {
//     return { error: 'User is not authenticated.' };
//   }
//   const invitationToken = uuidv4();
//   const invitationLink = `${process.env.BASE_URL}/invite/email?token=${invitationToken}`;

//   try {
//     await prisma.invitedUser.create({
//       data: {
//         email,
//         role,
//         shopDomain: shop,
//         invitationToken,
//         invitationExpires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 1 week from now
//       },
//     });
//     await sendEmailInvitation(email, invitationLink);
//     return { message: 'Invitation sent successfully.' };
//   } catch (e) {
//     console.error('Error sending invitation:', e);
//     return { error: 'An error occurred while sending the invitation.' };
//   }
// }

// export async function verifyInvitationToken(token: string) {
//   try {
//     const invitedUser = await prisma.invitedUser.findUnique({
//       where: {
//         invitationToken: token
//       }
//     });
//     if (!invitedUser) {
//       return null;
//     }
//     const now = new Date();
//     if (invitedUser.invitationExpires < now) {
//       return null;
//     }
//     return {
//       email: invitedUser.email,
//       role: invitedUser.role,
//       shopDomain: invitedUser.shopDomain
//     };
//   } catch (error) {
//     console.error("Error verifying invitation token:", error);
//     return null;
//   }
// };

// export async function verifyAdminToken(token: string): Promise<string | null> {
//   try {
//     const shopRecord = await prisma.shopifyInstalledShop.findFirst({
//       where: {
//         adminInviteCode: token,
//       },
//     });

//     if (shopRecord) {
//       return shopRecord.shop;
//       // return "may15ka.myshopify.com"
//     } else {
//       return null;
//     }
//   } catch (error) {
//     console.error('Error verifying token:', error);
//     return null;
//   }
// }
// export async function verifyMemberToken(token: string): Promise<string | null> {
//   try {
//     const shopRecord = await prisma.shopifyInstalledShop.findFirst({
//       where: {
//         memberInviteCode: token,
//       },
//     });
//     console.log(token)
//     if (shopRecord) {
//       // console.log("token")
//       return shopRecord.shop;
//       // return "may15ka.myshopify.com"
//     } else {
//       return null;
//     }
//   } catch (error) {
//     console.error('Error verifying token:', error);
//     return null;
//   }
// }

