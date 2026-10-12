import { Sidebar } from "@/components/siderbar/Sidebar";
import { Topbar } from "@/components/Topbar";
import { Outlet } from "react-router-dom";

export const Hero = () => {
  return (
    <main className="flex h-screen gap-3.5 p-3.5">
      <Sidebar />

      <div className="relative flex min-h-0 min-w-0 flex-1 flex-col">
        <Topbar />
        <section className="min-h-0 flex-1 overflow-hidden">
          <Outlet />
        </section>
      </div>
    </main>
  );
};
