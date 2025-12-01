import { Outlet } from "react-router-dom";
import { Header } from "@/components/organisms/Header";
import { Sidebar } from "@/components/organisms/Sidebar";
import { Footer } from "@/components/organisms/Footer";
import { useUiStore } from "@/stores";
import { Sheet, SheetContent } from "@/components/ui/sheet";

export const MainLayout = () => {
  const { sidebarOpen, toggleSidebar } = useUiStore();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex flex-1">
        <div className="hidden md:block">
          {sidebarOpen && <Sidebar />}
        </div>
        <main className="flex-1 p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
        
        {/* Mobile Sidebar */}
        <Sheet open={sidebarOpen} onOpenChange={toggleSidebar}>
          <SheetContent side="left" className="w-72 p-0">
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>
      <Footer />
    </div>
  );
};
