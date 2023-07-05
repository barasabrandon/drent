import { useRouter } from 'next/router';
import React from 'react';

export default function Index() {
  const router = useRouter();
  function dashboard() {
    router.push('/dashboard');
  }

  return (
    <div
      onClick={dashboard}
      className="h-screen flex items-center justify-center"
    >
      <div className="bg-blue-500 text-white p-3 rounded-sm uppercase">
        {' '}
        Navigate to Dashboard
      </div>
    </div>
  );
}
