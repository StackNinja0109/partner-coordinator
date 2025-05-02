'use client'

import './globals.css';
import { ReactNode } from 'react';
import { RecoilRoot } from 'recoil';

export default function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  // useEffect(() => {
  //   import('preline');
  // }, []);
  return (
    <html lang="ja">
      <body>
        <RecoilRoot>
          {children}
        </RecoilRoot>
      </body>
    </html>
  );
}
