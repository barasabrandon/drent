import Layout from '@/components/Layout';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Index() {
  const [rentals, setRentals] = useState(null);
  const [islocationOpen, setIslocationOpen] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    async function getRentals() {
      const { data } = await axios.get('/api/landlord/landlord');
      setRentals(data);
    }
    getRentals();
  }, []);

  const toggleLocationDropDown = (id) => {
    setIslocationOpen(id === islocationOpen ? null : id);
  };

  const filteredData = rentals?.filter(
    (item) => console.log(item)
    // typeof item === 'string' &&
    // item._id !== '_id' &&
    // item.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  return (
    <Layout>
      <>
        <div className="flex flex-row justify-between text-lg text-blue-500 dark:text-gray-300">
          <div className="bg-white dark:bg-gray-700  h-10 w-fit flex-row flex items-center justify-center pl-3 pr-3 md:pl-3 rounded-md ">
            Rentals:
            <span className="ml-3 whitespace-nowrap">{rentals?.length}</span>
          </div>
          <Link
            href={'/rentals/create'}
            className="bg-white  dark:bg-gray-700 h-10 w-fit flex-row flex items-center justify-center pl-3 pr-3 md:pl-3 rounded-md"
          >
            Add
          </Link>
        </div>
        <div className="flex items-center justify-center text-blue-500 dark:text-gray-300">
          {rentals === null ? (
            <div className="bg-white dark:bg-gray-700  h-10 w-fit flex-row flex items-center justify-center pl-3 pr-3 md:pl-3 rounded-md ">
              No records yet. Register to begin performing actions
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-700  h-fit w-full  rounded-md pt-10">
              <div className="flex flex-row w-full mb-5 items-center justify-center">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="border border-gray-300 py-2 pr-10 pl-3 rounded-full"
                    value={setSearchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="absolute right-3 top-2/4 transform -translate-y-2/4 w-6 h-6 text-gray-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              <table class="min-w-full">
                <tr>
                  <th class="whitespace-no-wrap border">Name</th>
                  <th class="whitespace-no-wrap border">Manage</th>
                  <th class="whitespace-no-wrap border">Location</th>
                </tr>
                {filteredData.map((item) => (
                  <tr key={item._id} c>
                    <td class="whitespace-no-wrap border">{item.name}</td>
                    <td class="whitespace-no-wrap border ">
                      <div className="flex flex-row gap-1 ">
                        <div> {item.location[0].county}</div>
                        <div
                          onClick={() => toggleLocationDropDown(item._id)}
                          className="cursor-pointer ml-2"
                        >
                          {islocationOpen === item._id ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="w-6 h-6"
                            >
                              <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
                              <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
                              <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-6 h-6"
                            >
                              <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                              <path
                                fillRule="evenodd"
                                d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                      </div>{' '}
                      {islocationOpen === item._id && (
                        <div>
                          <div> Sub County: {item.location[0].subcounty}</div>
                          <div>Estate: {item.location[0].estate}</div>
                        </div>
                      )}
                    </td>
                    <td class="whitespace-no-wrap border flex items-center justify-center">
                      <div className="flex flex-row gap-3">
                        <div className="flex flex-row items-center justify-center">
                          <div className="mr-1"> Edit</div>
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="w-4 h-4"
                            >
                              <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                            </svg>
                          </div>
                        </div>
                        <div className="flex flex-row justify-center items-center">
                          <div className="mr-1"> Delete</div>
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="w-4 h-4"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          )}
        </div>
      </>
    </Layout>
  );
}
