import { toggleState } from '@/store/menu-icon-slice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SideBarTags from './SideBarTags';

export default function Sidebar() {
  const dispatch = useDispatch();
  const menuIconState = useSelector((state) => state.menuIcon.state);
  const [isBigScreen, setIsBigScreen] = useState(false);

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


  return (
    <>
      {isBigScreen ? (
        <SideBarTags />
      ) : (
        <>{menuIconState ? <SideBarTags /> : ''}</>
      )}
    </>
  );
}
