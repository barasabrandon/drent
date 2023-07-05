import { useRouter } from 'next/router';
import React from 'react';

export default function StaticsContainer({ title, count }) {
  const router = useRouter();
  function manageClick(e) {
    e.preventDefault();
    router.push(`/dashboard/${title.toLowerCase()}`);
  }
  return (
    <div class="bg-white text-blue-500 dark:text-gray-300 dark:bg-gray-700 p-4  rounded-md flex flex-col justify-center items-center text-center gap-4">
      <div className="uppercase italic">{title}</div>
      <div className="flex items-center justify-center">
        <div className=" w-10 h-10 rounded-full dark:bg-gray-600 bg-slate-100 flex items-center justify-center">
          {count}
        </div>
      </div>
      <div
        className="dark:bg-gray-600 cursor-pointer bg-slate-100 pl-4 pr-4 flex items-center justify-center rounded-sm lowercase hover:scale-110 transition-transform duration-300"
        onClick={manageClick}
      >
        Manage
      </div>
    </div>
  );
}
