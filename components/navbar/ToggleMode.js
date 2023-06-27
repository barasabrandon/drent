import { useTheme } from 'next-themes';
import React from 'react';

export default function ToggleMode() {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const { resolvedTheme } = useTheme();

  const getStrokeColor = () => {
    return resolvedTheme === 'dark' ? 'white' : 'blue'; // Set the desired colors for dark and light themes
  };
  function handleTogleClick() {
    theme === 'dark' ? setTheme('light') : setTheme('dark');
  }
  return (
    <div onClick={handleTogleClick} class="cursor-pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={getStrokeColor()}
        className="w-5 h-5"
      >
        <path
          fillRule="evenodd"
          d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}
