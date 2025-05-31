import type { ReactNode } from "react";

import AppSidebar from "@/app/(protected)/_components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const ProtectedLayout = ({ children }: { children: ReactNode }) => {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main className="w-full">
				<SidebarTrigger />
				{children}
			</main>
		</SidebarProvider>
	);
};

export default ProtectedLayout;
