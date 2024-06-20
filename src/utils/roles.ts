import { Roles } from "../types/global"
import { auth } from "@clerk/nextjs/server"

export const checkRole = (role: Roles) => {
  const { sessionClaims } = auth()

  return sessionClaims?.metadata.role === role;
}

export const checkDomain = () => {
  const { sessionClaims } = auth()
  return sessionClaims?.metadata.shopDomain ;
}