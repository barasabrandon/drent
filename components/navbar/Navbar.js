import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import ToggleMode from './ToggleMode';
import { useSelector } from 'react-redux';
import MenuIcon from './MenuIcon';
import ProfileContainer from './ProfileContainer';

export default function Navbar({ MenuIsSet }) {
  const { data: session } = useSession();
  const menuIconState = useSelector((state) => state.menuIcon.state);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768); // Adjust the breakpoint as per your needs
    };
    // Initial check on mount
    handleResize();
    // Event listener for window resize
    window.addEventListener('resize', handleResize);
    // Clean up the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav class="bg-gray-200 dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          {isSmallScreen ? (
            <>{menuIconState ? 'Logo' : <ProfileContainer />}</>
          ) : (
            <>
              <ProfileContainer />
            </>
          )}
          <div className="flex justify-center items-center">
            <div class="hidden md:block">
              <div class="ml-10 mr-10 flex items-baseline space-x-4">
                <a
                  href="#"
                  class="text-blue-500 dark:text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </a>
                <a
                  href="#"
                  class="text-blue-500 dark:text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  About
                </a>
                <a
                  href="#"
                  class="text-blue-500 dark:text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Services
                </a>
                <a
                  href="#"
                  class="text-blue-500 dark:text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Contact
                </a>
              </div>
            </div>
            <ToggleMode />
            {isSmallScreen ? <MenuIcon /> : ''}
          </div>
        </div>
      </div>
    </nav>
  );
}
