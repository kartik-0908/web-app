"use server";
import axios from "axios";
import { revalidatePath } from "next/cache";


export async function handleSubmit(state: any, formdata: FormData) {
  const shop = formdata.get("shopDomain")
  const email = formdata.get("email")
  const role = formdata.get("role")
  console.log(shop)
  console.log(email)
  console.log(role)
  console.log("before resposne")

  const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/v1/user/invite`, {
      shop,
      email,
      role
  })
  revalidatePath("/verify")
  console.log("after validating")

  // console.log(res)

  if(res.data.message === "ok"){
      return {status:"success"}
  }
  if(res.data.message === "error"){
      return {status:"error"}
  }
  return {status:"hey"}
}