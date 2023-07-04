import React, { useEffect, useState } from 'react';
import Navbar from './navbar/Navbar';
import Sidebar from './navbar/Sidebar';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export default function Layout({ children }) {
  const [MenuIsSet, setMenuIsSet] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();

  // useEffect(() => {
  //   if (!session) {
  //     router.push('/login'); // Redirect to select URL if not signed in
  //   }
  // }, []);

  return (
    <div className="flex h-screen">
      {/* <!-- Sidebar --> */}
      <Sidebar MenuIsSet={MenuIsSet} />

      {/* <!-- Content --> */}
      <div className="flex-grow bg-white">
        <Navbar MenuIsSet={MenuIsSet} />
        {/* <!-- Rest of the content --> */}
        <div className="m-0 dark:m-0 dark:bg-gray-700 h-fit ">
          <div className="p-10 flex items-center justify-center sm:h-fit sm:w-full bg-white dark:bg-gray-700 text-lg">
            <div className="bg-gray-200 dark:bg-gray-800 h-full  w-full p-4 sm:p-4 md:p-4 rounded-lg flex flex-col gap-5">
              {' '}
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
