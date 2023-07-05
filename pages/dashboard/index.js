import React from 'react';
import Layout from '@/components/Layout';
import { useSession } from 'next-auth/react';
import StaticsContainer from '@/components/HomePage/StaticsContainer';

const staticsData = [
  {
    title: 'Rentals',
    count: 2,
  },
  {
    title: 'Rooms',
    count: 20,
  },
  {
    title: 'Caretakers',
    count: 2,
  },
  {
    title: 'Payments',
    count: '40k',
  },
];

export default function Index() {
  const { data: session } = useSession();

  return (
    <Layout>
      <div className="flex flex-row justify-between text-lg text-blue-500 dark:text-gray-300">
        <div className="bg-white dark:bg-gray-700  h-10 w-fit flex-row flex items-center justify-center pl-3 pr-3 md:pl-3 rounded-md ">
          Welcome,
          <span className="ml-3 whitespace-nowrap">{session?.user?.name}</span>
        </div>
        <div className="bg-white  dark:bg-gray-700 h-10 w-fit flex-row flex items-center justify-center pl-3 pr-3 md:pl-3 rounded-md">
          Landlord
        </div>
      </div>
      {/* Statics */}
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 ">
        {staticsData.map((item, index) => (
          <StaticsContainer key={index} {...item} />
        ))}
      </div>
    </Layout>
  );
}
