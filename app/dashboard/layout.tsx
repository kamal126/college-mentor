import { ReactNode } from "react";
import LeftSidebar from "@/components/LeftSidebar";
import TopMentor from "@/components/dashboard/TopMentor";
import Providers from "@/components/Provider";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Providers>
      <div className="flex h-screen overflow-hidden bg-blue-50 dark:bg-black/10">

        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <LeftSidebar />
        </div>

        {/* Mobile / Tablet Drawer */}
        <div className="lg:hidden fixed top-4 left-4 z-50">
          <Drawer>
            <DrawerTrigger className="w-10 h-8 bg-white text-black border rounded">
              |||
            </DrawerTrigger>
            <DrawerContent>
              <LeftSidebar />
            </DrawerContent>
          </Drawer>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-16 overflow-y-auto">
          {children}
        </main>

        {/* Right Sidebar */}
        <div className="hidden lg:block w-80">
          <TopMentor />
        </div>

      </div>
    </Providers>
  );
}
