import client from '../index';
import { hashPassword, verifyPassword as verifyUserPassword } from '../../lib/auth';

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

export const store_token = async (token: string, email: string, shop: string)=>{
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
    const currentWeekData = await  getWeeklyConversationStartTimes(shop)
    const last7Days = await  getConversationCountsForLast7Days(shop)
    const lastThreeConversations = await getlastThreeConversations(shop)
    return {
      currentWeekData,
      last7Days,
      lastThreeConversations,
    }
  }
}


