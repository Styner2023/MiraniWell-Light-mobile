import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useClerk } from "@clerk/clerk-react";

import { Button } from "../ui/button";
import { useUserContext } from "@/context/SmartAuthContext";
import { useSignOutAccount } from "@/lib/react-query/queries";

const Topbar = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const { signOut: clerkSignOut } = useClerk();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  // Handle logout with Clerk
  const handleLogout = async () => {
    try {
      // Sign out from Clerk
      await clerkSignOut();
      // Also call the regular signOut to clean up any local state
      signOut();
      // Navigate to sign in page
      navigate("/clerk-sign-in");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <section className="topbar">
      <div className="flex-between py-3 px-4 relative bg-white border-b border-gray-200 shadow-sm">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-indigo-50/20"></div>

        {/* Desktop Logo - Hidden on mobile */}
        <Link to="/" className="hidden md:flex gap-3 items-center relative z-10 hover-scale-subtle transition-all duration-300">
          <img
            src="https://pub-d6475def8a4045c2992481493ad3c8e4.r2.dev/1.logo.png"
            alt="Mirani Well logo"
            className="object-contain hover:brightness-110 transition-all duration-300 w-36 h-9 md:w-44 md:h-11 lg:w-48 lg:h-12"
          />
        </Link>

        {/* Mobile Hamburger Menu - Left side */}
        <div className="md:hidden relative">
          <Button
            variant="ghost"
            className="rounded-full w-16 h-10 flex items-center justify-center hover:bg-gray-100 nav-link-optimized group relative z-10"
            onClick={() => setShowMobileMenu(!showMobileMenu)}>
            <div className="relative w-6 h-6 flex items-center justify-center">
              <div className={`absolute inset-0 flex flex-col gap-1 items-center justify-center nav-hamburger-transition ${showMobileMenu ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}`}>
                <div className="w-4 h-0.5 bg-gray-700"></div>
                <div className="w-4 h-0.5 bg-gray-700"></div>
                <div className="w-4 h-0.5 bg-gray-700"></div>
              </div>
              <div className={`absolute inset-0 flex items-center justify-center nav-hamburger-transition ${showMobileMenu ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                <span className="text-gray-700 text-xs font-medium whitespace-nowrap">Close</span>
              </div>
            </div>
          </Button>

          {/* Mobile Dropdown Menu */}
          <div className={`absolute top-12 left-0 bg-white border border-gray-200 rounded-xl shadow-lg p-3 min-w-[180px] z-50 nav-dropdown-menu ${showMobileMenu
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
            }`}>
            <div className="space-y-1">
              <Link
                to="/profile-settings"
                className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-lg nav-link-optimized group"
                onClick={() => setShowMobileMenu(false)}>
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-500 nav-link-optimized">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <span className="text-gray-700 text-sm font-medium">Profile Settings</span>
              </Link>

              <Link
                to={`/update-profile/${user.id}`}
                className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-lg nav-link-optimized group"
                onClick={() => setShowMobileMenu(false)}>
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-500 nav-link-optimized">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </div>
                <span className="text-gray-700 text-sm font-medium">Edit Profile</span>
              </Link>

              <div className="h-px bg-gray-200 my-2"></div>

              <button
                onClick={() => {
                  setShowMobileMenu(false);
                  signOut();
                }}
                className="flex items-center gap-3 p-3 hover:bg-red-50 rounded-lg nav-link-optimized group w-full text-left">
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center group-hover:bg-red-500 nav-link-optimized">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16,17 21,12 16,7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                </div>
                <span className="text-gray-700 text-sm font-medium group-hover:text-red-600 nav-link-optimized">Logout</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-4 items-center relative z-10">
          {/* Desktop Logout Button - Completely hidden on mobile */}
          <div className="hidden md:block mobile-hide-logout">
            <Button
              variant="ghost"
              className="shad-button_ghost rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-all duration-300 group"
              onClick={handleLogout}>
              <img
                src="/assets/icons/logout.svg"
                alt="logout"
                className="w-4 h-4 group-hover:scale-110 transition-all duration-300"
              />
            </Button>
          </div>

          {/* Single Profile Icon - Mobile: Goes to Profile Settings, Desktop: Goes to Profile Page */}
          <Link
            to="/profile-settings"
            className="flex-center gap-3 group relative"
          >
            <div className="relative">
              {user.imageUrl ? (
                <img
                  src={user.imageUrl}
                  alt="profile"
                  className="h-10 w-10 rounded-full object-cover border-2 border-blue-200 transition-all duration-300 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/30"
                  onError={(e) => {
                    e.currentTarget.src = "/assets/icons/profile-placeholder.svg";
                  }}
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-blue-100 border-2 border-blue-200 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-600">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
              )}
              {user.id && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white z-20"></span>
              )}
            </div>

            {/* Desktop hint text */}
            <span className="hidden md:block text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute -bottom-7 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-100 px-2 py-1 rounded-md">
              Profile Settings
            </span>
          </Link>
        </div>
      </div>

      {/* Overlay to close mobile menu when clicking outside */}
      {showMobileMenu && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setShowMobileMenu(false)}
        ></div>
      )}
    </section>
  );
};

export default Topbar;
