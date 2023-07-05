import React, { useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/'); // Redirect to select URL if not signed in
    }
  }, [session]);
  return (
    <>
      {session ? (
        <Layout>
          {' '}
          <h1 className="dark:text-blue-500">{session?.user.name}</h1>
        </Layout>
      ) : (
        <div class="flex items-center justify-center h-screen border border-red-700">
          <div class="max-w-6xl mx-auto ">
            <form class="bg-white shadow-md rounded px-8 py-6">
              <div class="mb-4">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="name"
                >
                  Name
                </label>
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                />
              </div>
              <div class="mb-4">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="email"
                >
                  Email
                </label>
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                />
              </div>
              <div class="mb-4">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="password"
                >
                  Password
                </label>
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                />
              </div>
              <div class="mb-4">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="confirm-password"
                >
                  Confirm Password
                </label>
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm your password"
                />
              </div>
              <div class="flex flex-col sm:flex-row items-center justify-between">
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-2 sm:mb-0"
                  type="button"
                >
                  Sign In
                </button>
                <a
                  class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                  href="#"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="mt-2 mb-2 text-center">Or</div>
              <div className="flex items-center justify-center ">
                <button
                  className="flex items-center justify-center px-4 py-2 space-x-2 rounded-full  bg-gray-300 hover:bg-gray-300 text-blue-500 dark:text-white dark:bg-gray-800 "
                  onClick={() => signIn('google')}
                >
                  <img
                    className="w-6 h-6"
                    src="https://static-00.iconduck.com/assets.00/google-icon-2048x2048-czn3g8x8.png"
                    alt="#"
                  />
                  <span className="font-medium">Sign in with Google</span>
                </button>
              </div>
            </form>{' '}
          </div>{' '}
        </div>
      )}
    </>
  );
}
