import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "./layout/Topbar";

export default function Dashboard() {
  console.log("DASHBOARD RENDER");
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* Sidebar (desktop) */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex flex-col flex-1">
        <Topbar />

        <main className="flex-1 overflow-y-auto p-4">
      
          <Outlet />
        </main>
      </div>
    </div>
  );
}
