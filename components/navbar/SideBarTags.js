import { toggleState } from '@/store/menu-icon-slice';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function SideBarTags() {
  const menuIconState = useSelector((state) => state.menuIcon.state);
  const [isBigScreen, setIsBigScreen] = useState(false);
  const dispatch = useDispatch();
  const { resolvedTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const handleResize = () => {
      setIsBigScreen(window.innerWidth > 768); // Adjust the breakpoint as per your needs
    };
    // Initial check on mount
    handleResize();
    // Event listener for window resize
    window.addEventListener('resize', handleResize);
    if (isBigScreen) {
      dispatch(toggleState());
    }
    // Clean up the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, [isBigScreen, dispatch]);

  useEffect(() => {
    if (isBigScreen) {
      dispatch(toggleState());
    }
  }, [isBigScreen, dispatch]);

  function handleMenuIconClick(e) {
    e.preventDefault();
    dispatch(toggleState());
  }

  const getStrokeColor = () => {
    return resolvedTheme === 'dark' ? 'white' : 'blue'; // Set the desired colors for dark and light themes
  };

  const toggleSettings = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div class=" bg-gray-200 dark:bg-gray-800 dark:text-gray-300 w-64">
      <div class="p-4 flex justify-between">
        <div>
          {' '}
          <a
            href="#"
            class=" text-blue-500 dark:text-gray-300 text-xl font-bold"
          >
            Logo
          </a>
        </div>
        {isBigScreen ? (
          ''
        ) : (
          <>
            {menuIconState ? (
              ''
            ) : (
              <div onClick={handleMenuIconClick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke={getStrokeColor()}
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            )}
          </>
        )}
      </div>
      <div class="flex flex-col mt-8">
        <Link
          href={'/dashboard'}
          class="py-2 px-4 text-blue-500 bg-slate-300 dark:bg-gray-900 dark:text-gray-300 flex flex-row gap-3"
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
              />
            </svg>
          </div>
          <div> Dashboard</div>
        </Link>
        <a
          href="#"
          class="py-2 px-4 text-blue-500 dark:text-gray-300 hover:bg-slate-300 dark:hover:bg-gray-900"
        >
          Products
        </a>
        <a
          href="#"
          class="py-2 px-4 text-blue-500 dark:text-gray-300 hover:bg-slate-300 dark:hover:bg-gray-900"
        >
          Orders
        </a>
        <a
          href="#"
          class="py-2 px-4 text-blue-500 dark:text-gray-300 hover:bg-slate-300 dark:hover:bg-gray-900"
        >
          Customers
        </a>
        <a
          href="#"
          class="py-2 px-4 text-blue-500 dark:text-gray-300 hover:bg-slate-300 dark:hover:bg-gray-900"
          onClick={toggleSettings}
        >
          Settings
        </a>
        {isOpen ? (
          <div className="flex flex-col dark:bg-gray-900 m-3">
            {session ? (
              <a
                href="#"
                class="py-2 px-6 text-blue-500 dark:text-gray-300 hover:bg-slate-300 dark:hover:bg-gray-900"
                onClick={() => signOut('google')}
              >
                Sign Out
              </a>
            ) : (
              <a
                href="#"
                class="py-2 px-6 text-blue-500 dark:text-gray-300 hover:bg-slate-300 dark:hover:bg-gray-900"
                onClick={() => signIn('google')}
              >
                Sign In
              </a>
            )}
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
