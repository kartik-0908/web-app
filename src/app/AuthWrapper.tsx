"use client"
import Loader from '@/components/common/Loader';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

interface AuthWrapperProps {
  children: ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const { status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return (
      <Loader />
    );
  }

  if (status === 'unauthenticated') {
    router.push('/');
    return null;
  }

  return <>{children}</>;
};

export default AuthWrapper;