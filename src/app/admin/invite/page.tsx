import AdminLayout from "@/components/Layouts/AdminLayout";
import MembersComponent from "@/components/inviteUser";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";

export default async function PageComponent() {
  const { sessionClaims } = auth()
  const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/v1/user/get-members`, {
    shopDomain: sessionClaims?.metadata.shopDomain
  });
  const { memberLink } = res.data.memberLink;
  const { adminLink } = res.data.adminLink;
  const { users } = res.data.users;

  return (
    <AdminLayout>
      <MembersComponent 
      memberLink = {memberLink}
      adminLink = {adminLink}
      users = {users}
      
      />
    </AdminLayout>
  );
}
