import { CoordinatorLoginHeader } from "@/components/organisms";
import {
  PCFooter,
} from "@/components/organisms";

export default function LoginLayout({
  children
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex flex-col h-screen">
      <CoordinatorLoginHeader />
        <div className="flex items-center flex-grow bg-gray-white">
          {children}
        </div>
      <PCFooter className="bg-gray-white" />
    </div>
  );
}