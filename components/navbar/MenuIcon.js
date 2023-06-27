import { toggleState } from '@/store/menu-icon-slice';
import { useTheme } from 'next-themes';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function MenuIcon() {
  const { resolvedTheme } = useTheme();
  const dispatch = useDispatch();
  const menuIconState = useSelector((state) => state.menuIcon.state);
  const [isBigScreen, setIsBigScreen] = useState(false);

  const getStrokeColor = () => {
    return resolvedTheme === 'dark' ? 'white' : 'blue'; // Set the desired colors for dark and light themes
  };

  function handleMenuIconClick(e) {
    e.preventDefault();
    dispatch(toggleState());
  }

  return (
    <div className="ml-2 dark:text-white" onClick={handleMenuIconClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke={getStrokeColor()}
        className="w-6 h-6  "
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    </div>
  );
}
