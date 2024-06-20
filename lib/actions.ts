"use server";

import { permanentRedirect, redirect } from "next/navigation";
import { checkRole } from "../src/utils/roles";
import { clerkClient } from "@clerk/nextjs/server";
import axios from "axios";

export async function setRole(formData: FormData) {
  if (!checkRole("admin")) {
    return { message: "Not Authorized" };
  }

  try {
    const res = await clerkClient.users.updateUser(
      formData.get("id") as string,
      {
        publicMetadata: { role: formData.get("role") },
      }
    );
    return { message: res.publicMetadata };
  } catch (err) {
    return { message: err };
  }
}
export async function setAdminRole(id: string) {
  try {
    const res = await clerkClient.users.updateUser(id,
      {
        publicMetadata: { role: "admin" },
      }
    );
    console.log(res)
    return { message: res.publicMetadata };
  } catch (err) {
    return { message: err };
  }
}
function ensureMyShopifyDomain(url: string): string {
  const suffix = '.myshopify.com';
  if (url.endsWith(suffix)) {
      return url;
  } else {
      return url + suffix;
  }
}
export async function setDomain(formData: FormData) {
  // if (!checkRole("admin")) {
  //   return { message: "Not Authorized" };
  // }

  const id = formData.get("id") as string
  let shopDomain = formData.get("shopDomain") as string
  shopDomain = ensureMyShopifyDomain(shopDomain)

  try {
    const res = await clerkClient.users.updateUser(
      id,
      {
        publicMetadata: {
          shopDomain: shopDomain,
          role: "admin"
        },
      }
    );
    const resp = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/v1/user/set-domain`, {
      id,
      shopDomain
    })
    console.log(res)
    return { message: res.publicMetadata };
  } catch (err) {
    return { message: err };
  }
}