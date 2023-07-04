import Layout from '@/components/Layout';
import Link from 'next/link';
import React from 'react';

export default function Index() {
  return (
    <Layout>
      <div className="flex flex-row justify-between text-lg text-blue-500 dark:text-gray-300">
        <div className="bg-white dark:bg-gray-700  h-10 w-fit flex-row flex items-center justify-center pl-3 pr-3 md:pl-3 rounded-md ">
          Rentals:
          <span className="ml-3 whitespace-nowrap">2</span>
        </div>
        <Link
          href={'/rentals/create'}
          className="bg-white  dark:bg-gray-700 h-10 w-fit flex-row flex items-center justify-center pl-3 pr-3 md:pl-3 rounded-md"
        >
          Add
        </Link>
      </div>
    </Layout>
  );
}
