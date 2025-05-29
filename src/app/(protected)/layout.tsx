import { ReactNode } from "react";

import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar";
import AppSidebar from "./_components/app-sidebar";

const ProtectedLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default ProtectedLayout;
