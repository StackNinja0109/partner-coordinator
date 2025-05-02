'use client'

import { RecoilRoot } from 'recoil';
import { useAuthUserStateProvider } from '@/features/auth/providers/useAuthProvider';
import Loading from './loading';
import { useEffect } from 'react';

const Auth = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useAuthUserStateProvider();
  return <div>{isLoading ? <Loading /> : children}</div>;
};

const Middleware = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default function Layout({
  children
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    import('preline'); 
  }, []);
  return (
    <RecoilRoot>
      <Auth>
        <Middleware>
          {/* <SystemSettingsObserver> */}
            {children}
          {/* </SystemSettingsObserver> */}
        </Middleware>
      </Auth>
    </RecoilRoot>
  );
}
