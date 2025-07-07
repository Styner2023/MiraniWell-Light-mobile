import { Outlet, Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

import { useUserContext } from "@/context/SmartAuthContext";

export default function AuthLayout() {
  const { isAuthenticated, isLoading } = useUserContext();
  const { isSignedIn, isLoaded } = useUser();

  // Show loading while Clerk is initializing
  if (!isLoaded || isLoading) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          <p className="text-charcoal text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is authenticated with Clerk or context, redirect to home
  if (isSignedIn || isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center bg-white">
        <section className="flex flex-1 justify-center items-center flex-col py-10 px-4 max-w-md mx-auto">
          <Outlet />
        </section>

        <video
          src="https://pub-d6475def8a4045c2992481493ad3c8e4.r2.dev/MirianiWell-loginpage.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
        />
      </div>
    </>
  );
}
