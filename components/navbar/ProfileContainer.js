import React, { useEffect, useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useSelector } from 'react-redux';

export default function ProfileContainer() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const { data: session } = useSession();
  const menuIconState = useSelector((state) => state.menuIcon.state);

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
    <div className="flex-shrink-0">
      <a
        href="#"
        className="text-blue-500 dark:text-gray-300 text-xl font-bold"
      >
        {isSmallScreen ? (
          menuIconState ? (
            'Logo'
          ) : (
            ''
          )
        ) : (
          <div className="flex items-center justify-center">
            {' '}
            <span className="mr-3 font-medium">{session?.user?.name}</span>
            <img
              src={session?.user?.image}
              alt="#"
              className="w-6 h-6 rounded-full"
            />
          </div>
        )}
      </a>
    </div>
  );
}
