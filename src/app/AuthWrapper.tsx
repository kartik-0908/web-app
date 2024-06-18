import { ReactNode } from 'react';
// import { auth } from './auth';
import { redirect } from 'next/navigation';
import { FormLayout } from '@/components/updateForm';

interface AuthWrapperProps {
  children: ReactNode;
}

async function getUser() {
  // const session = await auth()
  // console.log(session)
  // return session;
}

const AuthWrapper: React.FC<AuthWrapperProps> = async ({ children }) => {
  const session = await getUser();

  // if (!session || !session.user) {
  //   // return <>{children}</>;
  //   redirect('/');
  // } else if (session && session.user) {
  //   if (!session.user.emailVerified) {
  //     return (
  //       <div className="flex flex-col items-center justify-center h-screen ">
  //         <VerifyAccountMessage />
  //         {session?.user.email}
  //       </div>
  //     )
  //   }
  //   if (!session.user.shopDomain) {
  //     return <FormLayout roleId={session.user.role || "member"} />;
  //     // return <>{children}</>;
  //   } else {
  //     // return <FormLayout roleId={session.user.roleId || "member"} />;e

  //     return <>{children}</>;
  //   }
      return <>{children}</>;

  // }
};
export default AuthWrapper;

const VerifyAccountMessage: React.FC = () => {
  return (
    <h1>Please verify your account using the activation link in your email.</h1>
  );
};

