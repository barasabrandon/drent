import Layout from '@/components/Layout';
import Spinner from '@/components/Spinner';
import React, { useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import axios from 'axios';

export default function CreateForm({
  _id,
  name: oldName,
  contacts,
  location,
  rooms,
  description: oldDescription,
  images: oldImages,
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [images, setImages] = useState(oldImages || []);
  const [name, setName] = useState(oldName || '');
  const [landlordContacts, setLandlordContacts] = useState(
    contacts ? contacts[0].landlord : ''
  );
  const [caretakerContact, setCaretakerContact] = useState(
    contacts ? contacts[0].caretaker : ''
  );
  const [addRoom, setAddRoom] = useState(false);
  const [roomDetails, setRoomDetails] = useState([]);
  const [roomType, setRoomType] = useState('');
  const [roomTypeNumber, setRoomTypeNumber] = useState('');
  const [roomCharges, setRoomCharges] = useState('');
  const [locationCounty, setLocationCounty] = useState(
    location ? location[0].county : ''
  );
  const [locationSubcounty, setLocationSubcounty] = useState(
    location ? location[0].subcounty : ''
  );
  const [locationEstate, setLocationEstate] = useState(
    location ? location[0].estate : ''
  );
  const [description, setDescription] = useState(oldDescription || '');

  // Upload Images and get links
  async function uploadImages(event) {
    const fileInput = event.target;
    const formData = new FormData();
    setIsUploading(!isUploading);

    for (const file of fileInput.files) {
      formData.append('file', file);
    }
    formData.append('upload_preset', 'rental-system-drent');
    const data = await fetch(
      'https://api.cloudinary.com/v1_1/duruktyrq/image/upload',
      { method: 'POST', body: formData }
    ).then((res) => res.json());

    setImages((prevImages) => {
      return [...prevImages, data.secure_url];
    });
    setIsUploading(false);
  }

  function updateImagesOrder(images) {
    setImages(images);
  }

  async function handleSubmitData(e) {
    e.preventDefault();
    if (roomDetails === '') {
      alert('Fill all fields.');
    } else {
      const data = {
        images,
        name,
        landlordContacts,
        caretakerContact,
        roomDetails,
        locationCounty,
        locationSubcounty,
        locationEstate,
        description,
      };
      const res = await axios.post('/api/landlord/landlord', data);
      console.log(res);
    }
  }

  function saveRoomDetails(e) {
    e.preventDefault();
    const existingRoomType = roomDetails.filter(
      (item) => item.type === roomType
    );

    if (existingRoomType.length > 0) {
      alert('Room type already added');
    } else {
      setRoomDetails(() => {
        return [
          ...roomDetails,
          { type: roomType, charges: roomCharges, number: roomTypeNumber },
        ];
      });
    }

    setRoomCharges('');
    setRoomType('');
    setRoomTypeNumber('');
  }

  function closeRoomDetails(e) {
    e.preventDefault();
    setRoomCharges('');
    setRoomType('');
    setRoomTypeNumber('');
    setAddRoom(!addRoom);
  }

  return (
    <Layout>
      <div className="max-w-xl mx-auto rounded-sm">
        <form
          className="bg-white dark:bg-gray-700 shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmitData}
        >
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" for="firstName">
              Name:{_id}
            </label>
            <input
              className="shadow appearance-none border dark:border-gray-500 dark:bg-gray-500 dark:text-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              placeholder="Name of the rentals"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" for="firstName">
              Contacts
            </label>
            <input
              className="shadow appearance-none border mb-2 dark:border-gray-500  dark:bg-gray-500 dark:text-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={landlordContacts}
              onChange={(ev) => setLandlordContacts(ev.target.value)}
              placeholder="Landlord Contacts"
              required
            />

            <input
              className="shadow appearance-none border dark:border-gray-500  dark:bg-gray-500 dark:text-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={caretakerContact}
              onChange={(ev) => setCaretakerContact(ev.target.value)}
              placeholder="Caretaker Contacts"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" for="firstName">
              Rooms{' '}
              {addRoom ? (
                <button
                  onClick={closeRoomDetails}
                  className="bg-gray-300 dark:bg-gray-500 dark:text-gray-300   pl-2 pr-2 pb-1 pt-1 ml-3 mb-1 text-blue-500 rounded-md"
                >
                  Close
                </button>
              ) : (
                <button
                  onClick={() => setAddRoom(!addRoom)}
                  className="bg-gray-300 dark:bg-gray-500 dark:text-gray-300   pl-2 pr-2 pb-1 pt-1 ml-3 mb-1 text-blue-500 rounded-md"
                >
                  Add
                </button>
              )}
            </label>{' '}
            {addRoom && (
              <div className="mb-4">
                <input
                  className="shadow appearance-none border mb-2 dark:border-gray-500  dark:bg-gray-500 dark:text-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  value={roomType}
                  onChange={(ev) => setRoomType(ev.target.value)}
                  placeholder="Room Type"
                />
                <input
                  className="shadow appearance-none border mb-2 dark:border-gray-500  dark:bg-gray-500 dark:text-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  value={roomTypeNumber}
                  onChange={(ev) => setRoomTypeNumber(ev.target.value)}
                  placeholder="Number"
                />
                <input
                  className="shadow appearance-none mb-2 border dark:border-gray-500  dark:bg-gray-500 dark:text-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  value={roomCharges}
                  onChange={(ev) => setRoomCharges(ev.target.value)}
                  placeholder="Charges"
                />
                {roomType !== '' &&
                  roomTypeNumber !== '' &&
                  roomCharges !== '' && (
                    <button
                      onClick={saveRoomDetails}
                      className="bg-gray-300 dark:bg-gray-500 dark:text-gray-300   pl-2 pr-2 pb-1 pt-1 ml-3 mb-1 text-blue-500 rounded-md float-right"
                    >
                      Save
                    </button>
                  )}
              </div>
            )}
            <div class="w-full bg-white dark:bg-gray-500 shadow rounded-lg overflow-hidden mb-2">
              <table class="min-w-full leading-normal">
                <tbody>
                  <tr>
                    <td class="pl-2  bg-gray-100 dark:bg-gray-500 dark:text-gray-300  border-b border-gray-200 text-gray-600 ">
                      Type
                    </td>
                    <td class="pl-2 bg-gray-100 dark:bg-gray-500 dark:text-gray-300  border-b border-gray-200 text-gray-600 ">
                      Number
                    </td>
                    <td class="pl-2 bg-gray-100 dark:bg-gray-500 dark:text-gray-300  border-b border-gray-200 text-gray-600 ">
                      Charges
                    </td>
                  </tr>
                  {roomDetails?.map((item) => (
                    <tr key={item.type}>
                      <td class="pl-2 border-b border-gray-200 dark:bg-gray-500 dark:text-gray-300">
                        {item.type}
                      </td>
                      <td class="pl-2 border-b border-gray-200 dark:bg-gray-500 dark:text-gray-300">
                        {item.number}
                      </td>
                      <td class="pl-2 border-b border-gray-200 dark:bg-gray-500 dark:text-gray-300">
                        {item.charges}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" for="firstName">
              Location
            </label>
            <input
              className="shadow appearance-none border mb-2 dark:border-gray-500  dark:bg-gray-500 dark:text-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={locationCounty}
              onChange={(ev) => setLocationCounty(ev.target.value)}
              placeholder="County "
              required
            />
            <input
              className="shadow appearance-none border mb-2 dark:border-gray-500  dark:bg-gray-500 dark:text-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={locationSubcounty}
              onChange={(ev) => setLocationSubcounty(ev.target.value)}
              placeholder="Subcounty "
              required
            />
            <input
              className="shadow appearance-none border mb-2 dark:border-gray-500  dark:bg-gray-500 dark:text-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={locationEstate}
              onChange={(ev) => setLocationEstate(ev.target.value)}
              placeholder="Estate "
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" for="firstName">
              Description
            </label>
            <textarea
              className="shadow appearance-none border dark:border-gray-500  dark:bg-gray-500 dark:text-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
              placeholder="Additional information about the rentals"
            ></textarea>
          </div>

          {/* Photos */}
          <label>Photos</label>
          <div class="mb-4 flex flex-wrap gap-2">
            <ReactSortable
              list={images}
              className="flex sm:flex-row  flex-wrap  gap-1 "
              setList={updateImagesOrder}
            >
              {!!images?.length &&
                images.map((link, index) => (
                  <div
                    key={index}
                    className=" bg-white dark:bg-gray-500  h-24 w-24 sm:h-30 sm:w-30 shadow-sm rounded-sm border dark:border-gray-500"
                  >
                    <img src={link} alt="" className="h-24 w-24 rounded-sm" />
                  </div>
                ))}
            </ReactSortable>{' '}
            {isUploading && (
              <div className="h-24 p-1 flex items-center">
                <Spinner />
              </div>
            )}
            <label className="w-24 h-24   cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white dark:bg-gray-500 dark:border-gray-500 shadow border border-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
              <div>Add image</div>
              <input type="file" onChange={uploadImages} className="hidden" />
            </label>
          </div>

          <div className="flex  items-center justify-end gap-3">
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
