import React, { useState } from 'react';
import Navbar from './navbar/Navbar';
import Sidebar from './navbar/Sidebar';

export default function Layout({ children }) {
  const [MenuIsSet, setMenuIsSet] = useState(true);
  return (
    <div class="flex h-screen">
      {/* <!-- Sidebar --> */}
      <Sidebar MenuIsSet={MenuIsSet} />

      {/* <!-- Content --> */}
      <div class="flex-grow bg-gray-100">
        <Navbar MenuIsSet={MenuIsSet} />
        {/* <!-- Rest of the content --> */}
        <div className="m-4"> {children}</div>
      </div>
    </div>
  );
}
