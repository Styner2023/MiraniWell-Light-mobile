import { Outlet, Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

import Topbar from "@/components/shared/Topbar";
import Bottombar from "@/components/shared/Bottombar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import { useUserContext } from "@/context/SmartAuthContext";

const RootLayout = () => {
  const { isAuthenticated, isLoading } = useUserContext();
  const { isSignedIn, isLoaded } = useUser();

  // Show loading while authentication is being checked
  if (!isLoaded || isLoading) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          <p className="text-gray-800 text-sm">Loading app...</p>
        </div>
      </div>
    );
  }

  // If user is not authenticated, redirect to sign in
  if (!isSignedIn && !isAuthenticated) {
    return <Navigate to="/clerk-sign-in" replace />;
  }
  return (
    <div className="w-full relative bg-white root-layout">
      <Topbar />
      <LeftSidebar />

      <section className="flex flex-1 min-h-screen overflow-auto justify-center main-content-with-sidebar main-content-optimized custom-scrollbar bg-white">
        <div className="w-full max-w-screen-xl px-4 md:px-8 py-4 md:py-8 page-container text-gray-800">
          <Outlet />
        </div>
      </section>

      <Bottombar />
    </div>
  );
};

export default RootLayout;
