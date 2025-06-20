import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import type { ReactNode } from "react";

function PageLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="py-10 px-20">{children}</main>
    </SidebarProvider>
  );
}

export default PageLayout;
