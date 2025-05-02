'use client'

import { CoordinatorLoginHeader,  } from "@/components/organisms";
import {
  PCFooter,
} from "@/components/organisms";
import Layout from "./Layout";

export default function LoginLayout({
  children
}: {
  children: React.ReactNode;
}) {

  return (
    <Layout>
      <div className="flex flex-col h-screen">
        <CoordinatorLoginHeader />
          <div className="flex items-center flex-grow bg-gray-white">
            {children}
          </div>
        <PCFooter className="bg-gray-white" />
      </div>
    </Layout>
  );
}