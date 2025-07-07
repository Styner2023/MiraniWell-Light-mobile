import { Link, NavLink, useLocation } from "react-router-dom";
import { useClerk } from "@clerk/clerk-react";

import { INavLink } from "@/types";
import { sidebarLinks } from "@/constants";
import { Loader } from "@/components/shared";
import { useUserContext, INITIAL_USER } from "@/context/SmartAuthContext";
import { ChevronRight } from "lucide-react";

const LeftSidebar = () => {
  const { pathname } = useLocation();
  const { user, setUser, setIsAuthenticated, isLoading } = useUserContext();
  const { signOut: clerkSignOut } = useClerk();

  const handleSignOut = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    console.log('🚪 Starting logout process...');
    console.log('📋 Current user:', user);
    console.log('🔐 Clerk instance available:', !!clerkSignOut);

    try {
      // Clear local authentication state first
      console.log('🧹 Clearing local authentication state...');
      setIsAuthenticated(false);
      setUser(INITIAL_USER);

      // Clear localStorage
      console.log('🧹 Clearing localStorage...');
      const localStorageKeys = Object.keys(localStorage);
      console.log('📦 LocalStorage keys before clear:', localStorageKeys);
      localStorage.clear();

      console.log('🚪 Signing out from Clerk...');

      // Sign out from Clerk first
      await clerkSignOut();

      console.log('✅ Clerk logout successful, redirecting...');

      // Small delay to ensure cleanup is complete
      setTimeout(() => {
        console.log('🔄 Redirecting to /clerk-sign-in...');
        // Force redirect to Clerk login page
        window.location.href = '/clerk-sign-in';
      }, 100);

    } catch (error) {
      console.error('❌ Logout error:', error);
      console.error('📋 Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        name: error instanceof Error ? error.name : 'Unknown',
        stack: error instanceof Error ? error.stack : 'No stack trace'
      });

      // Force redirect even on error
      console.log('🚨 Error occurred, forcing redirect anyway...');
      localStorage.clear();
      window.location.href = '/clerk-sign-in';
    }
  };

  const renderNavLink = (link: INavLink, isInGroup = false) => {
    const isActive = pathname === link.route;

    return (
      <li
        key={link.label}
        className={`group list-none relative nav-transition ${isInGroup ? '' : ''}`}>

        <NavLink
          to={link.route}
          className={({ isActive: navIsActive }) =>
            `flex gap-4 items-center px-4 py-3 rounded-xl cursor-pointer relative group/link nav-link-optimized ${navIsActive || isActive
              ? 'bg-blue-50 text-blue-600 border border-blue-200 active'
              : 'hover:bg-gray-50 hover:text-gray-900 text-gray-700'
            }`
          }>

          {/* Active indicator - always present but hidden when not active */}
          <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r-full nav-indicator ${isActive ? 'opacity-100 scale-100 active' : 'opacity-0 scale-50 inactive'}`}></div>

          <div className="flex items-center gap-4 w-full">
            {link.imgURL.includes('.png') ? (
              <div className={`p-2 rounded-lg nav-icon-wrapper ${isActive ? 'bg-blue-100' : 'bg-gray-100'}`}>
                <img
                  src={link.imgURL}
                  alt={link.label}
                  width={20}
                  height={20}
                  className="object-contain min-w-5 nav-icon"
                />
              </div>
            ) : (
              <div className={`p-2 rounded-lg nav-icon-wrapper ${isActive ? 'bg-blue-100' : 'bg-gray-100'}`}>
                <img
                  src={link.imgURL}
                  alt={link.label}
                  width={18}
                  height={18}
                  className={`min-w-[18px] nav-icon ${isActive ? "brightness-0 invert-0" : "brightness-0 invert-0"}`}
                />
              </div>
            )}
            <span className={`base-medium flex-1 nav-text ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-700'}`}>
              {link.label}
            </span>

            {/* Active indicator dot - always present but hidden when not active */}
            <div className={`w-2 h-2 bg-blue-500 rounded-full nav-dot ${isActive ? 'opacity-100 scale-100 active' : 'opacity-0 scale-50 inactive'}`}></div>

            {/* Hover arrow - always present but hidden when not active */}
            <div className={`nav-arrow ${isActive ? 'opacity-100' : 'opacity-0 group-hover/link:opacity-100'}`}>
              <ChevronRight size={16} className="text-blue-500" />
            </div>
          </div>
        </NavLink>
      </li>
    );
  };

  return (
    <nav className="leftsidebar hidden md:flex bg-white border-r border-gray-200 backdrop-blur-sm relative overflow-hidden z-50 h-screen">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#9D6EF9_1px,transparent_1px)] [background-size:20px_20px]"></div>
      </div>

      {/* Container with proper height management */}
      <div className="flex flex-col h-full w-full relative z-10">
        {/* Fixed Header Section */}
        <div className="flex-shrink-0 px-4 py-3 space-y-3">
          {/* Logo - Larger and More Visible */}
          <Link to="/" className="flex justify-center items-center group mb-4">
            <div className="relative">
              <img
                src="https://pub-d6475def8a4045c2992481493ad3c8e4.r2.dev/1.logo.png"
                alt="Mirani Well logo"
                width={120}
                height={26}
                className="transition-opacity duration-200"
              />
            </div>
          </Link>

          {/* User Profile Section - Better Layout */}
          {isLoading ? (
            <div className="h-16 flex items-center justify-center">
              <Loader />
            </div>
          ) : (
            <Link to={`/profile/${user.id}`} className="group">
              <div className="leftsidebar-user-profile">
                <div className="relative flex-shrink-0">
                  <img
                    src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
                    alt="profile"
                    className="leftsidebar-user-avatar object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="leftsidebar-user-info">
                  <p className="leftsidebar-user-name">{user.name}</p>
                  <p className="leftsidebar-user-username">@{user.username}</p>
                </div>
              </div>
            </Link>
          )}
        </div>

        {/* Compact Divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-blue-200 to-transparent flex-shrink-0"></div>

        {/* Scrollable Navigation Section */}
        <div className="flex-1 overflow-y-auto px-4 pb-4 leftsidebar-custom-scrollbar navigation-container">
          {/* Simplified Navigation Links */}
          <div className="space-y-1">
            {sidebarLinks.map((link) => renderNavLink(link, false))}
          </div>
        </div>

        {/* Fixed Footer Section */}
        <div className="flex-shrink-0 px-4 pb-4 space-y-3">
          {/* Logout Button */}
          <div className="border-t border-gray-200 pt-3">
            <button
              onClick={(e) => handleSignOut(e)}
              className="w-full flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-red-50 to-red-100 border border-red-200 active:scale-95 transition-transform">
              <div className="p-2 rounded-lg bg-red-100">
                <img src="/assets/icons/logout.svg" alt="logout" width={16} height={16} />
              </div>
              <span className="base-medium font-medium text-gray-900">
                Logout
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LeftSidebar;
