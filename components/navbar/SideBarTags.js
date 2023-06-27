import { toggleState } from '@/store/menu-icon-slice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function SideBarTags() {
  const menuIconState = useSelector((state) => state.menuIcon.state);
  const [isBigScreen, setIsBigScreen] = useState(false);
  const dispatch = useDispatch();
  const { resolvedTheme } = useTheme();

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

  return (
    <div class=" bg-gray-200 dark:bg-gray-800 dark:text-white w-64">
      <div class="p-4 flex justify-between">
        <div>
          {' '}
          <a href="#" class=" text-blue-500 dark:text-white text-xl font-bold">
            Logo
          </a>
        </div>
        {isBigScreen ? (
          ''
        ) : (
          <>
            {menuIconState ? (
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
            ) : (
              ''
            )}
          </>
        )}
      </div>
      <div class="flex flex-col mt-8">
        <a
          href="#"
          class="py-2 px-4 text-blue-500 bg-slate-300 dark:bg-gray-900 dark:text-white"
        >
          Dashboard
        </a>
        <a
          href="#"
          class="py-2 px-4 text-blue-500 dark:text-white hover:bg-slate-300 dark:hover:bg-gray-900"
        >
          Products
        </a>
        <a
          href="#"
          class="py-2 px-4 text-blue-500 dark:text-white hover:bg-slate-300 dark:hover:bg-gray-900"
        >
          Orders
        </a>
        <a
          href="#"
          class="py-2 px-4 text-blue-500 dark:text-white hover:bg-slate-300 dark:hover:bg-gray-900"
        >
          Customers
        </a>
        <a
          href="#"
          class="py-2 px-4 text-blue-500 dark:text-white hover:bg-slate-300 dark:hover:bg-gray-900"
        >
          Settings
        </a>
      </div>
    </div>
  );
}
