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
async function getTotalConversations(shopDomain: string) {
  const result = await client.conversation.count({
    where: { shopDomain },
  });
  return (result);
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
interface HourlyConversationCount {
  hour: number;
  count: number;
}
async function getHourlyConversationCounts(shopDomain: string): Promise<number[]> {
  try {
    const hourlyConversationCounts: HourlyConversationCount[] = await client.$queryRaw`
      SELECT EXTRACT(HOUR FROM "startedAt") AS hour, COUNT(*) AS count
      FROM "Conversation"
      WHERE "shopDomain" = ${shopDomain}
      GROUP BY EXTRACT(HOUR FROM "startedAt")
      ORDER BY hour;
    `;

    const result = new Array(24).fill(0);

    hourlyConversationCounts.forEach((entry) => {
      result[entry.hour] = Number(entry.count);
    });

    return result;
  } catch (error) {
    console.error('Error fetching hourly conversation counts:', error);
    return new Array(24).fill(0);
  }
}

function findMaxSumIndex(hourlyConversationCounts: number[]): number {
  let maxSum = 0;
  let maxIndex = 0;
  const n = hourlyConversationCounts.length; // Although 'n' is defined, it's not used in your function. You might want to use it or remove it.

  for (let i = 0; i < 24; i++) {
    let currSum = 0;
    let j = i;
    let k = 12; // Assuming you want to calculate the sum of a fixed window size of 12 hours
    while (k) {
      currSum += hourlyConversationCounts[j % n]; // Use 'n' for safety, ensuring 'j' does not exceed array bounds.
      j++;
      k--;
    }
    if (currSum > maxSum) {
      maxIndex = i;
      maxSum = currSum;
    }
  }

  return maxIndex;
}

function findArray(maxIndex: number, hourlyConversationCounts: number[]): number[] {
  const result: number[] = new Array(12).fill(0);

  for (let i = 0; i < 12; i++) {
    result[i] = hourlyConversationCounts[maxIndex % 24]; // Ensure the index wraps around using modulo operation
    maxIndex++;
  }

  return result;
}
async function getConversationDistribution(shopDomain: string) {
  const distribution = await client.conversation_dist.findUnique({
    where: {
      shopDomain: shopDomain
    }
  });

  return distribution ? [
    distribution.Monday,
    distribution.Tuesday,
    distribution.Wednesday,
    distribution.Thursday,
    distribution.Friday,
    distribution.Saturday,
    distribution.Sunday,
  ] : [0, 0, 0, 0, 0, 0, 0];
}


export const getHomeData = async (email: string) => {
  const shop = await getShop(email);
  console.log("shop" + shop)
  if (shop) {
    const totalConversations = await getTotalConversations(shop)
    const lastThreeConversations = await getlastThreeConversations(shop)
    const hourlyConversationCounts = await getHourlyConversationCounts(shop);
    const maxSumIndex = findMaxSumIndex(hourlyConversationCounts);
    const conv_array = findArray(maxSumIndex, hourlyConversationCounts);
    const conversationDistribution = await getConversationDistribution(shop);
    return {
      conversationDistribution,
      totalConversations,
      lastThreeConversations,
      maxSumIndex,
      conv_array
    }
  }
}


