import { CoordinatorHeader, PCFooter } from "@/components/organisms";
import Layout from "./Layout";

export default function ProjectLayout({
  children
}: {
  children: React.ReactNode;
}) {

  return (
    <Layout>
      <div className="relative flex flex-col h-screen">
        <CoordinatorHeader />
        <div className="flex flex-grow mt-[64px]">
          {children}
        </div>
        <PCFooter className="bg-gray-white" />
      </div>
    </Layout>
  );
}