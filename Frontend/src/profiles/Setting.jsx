import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader';

const Setting = () => {
  const [value, setValue] = useState({ address: "" });
  const [profilechange, setProfilechange] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`, 
  };

 
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4001/api/v1/User/get-user",
          { headers }
        );

        setProfilechange(res.data);
        setValue({ address: res.data.address });
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);


  const handleChange = (e) => {
    setValue({ ...value, address: e.target.value });
  };


  const updateProfile = async () => {
    try {
      const res = await axios.put(
        "http://localhost:4001/api/v1/User/update-address",
        { address: value.address },
        { headers }
      );
      alert(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Loader */}
      {!profilechange && (
        <div className='w-full h-[100%] flex items-center justify-center'>
          <Loader />
        </div>
      )}

      {/* Content */}
      {profilechange && (
        <div className='h-[100%] p-0 md:p-4 text-white'>
          <h1 className='text-3xl font-semibold md:text-6xl'>
            Setting
          </h1>

          <div className='flex gap-12 mt-6 flex-col'>
            <div className='flex gap-8'>
            <div className=''>
              <label className=' text-2xl font-semibold'>Username</label>
              <p className='p-2 rounded mt-2 bg-gray-600 text-gray-900 font-semibold'>
                {profilechange.username}
              </p>
            </div>

            <div>
              <label className='text-2xl font-semibold'>Email</label>
              <p className=' py-2 rounded mt-2 bg-gray-600 text-gray-900 font-semibold'>
                {profilechange.email}
              </p>
            </div>
            </div>

            <div className=' gap-4 flex flex-col '>
              <label className='text-2xl font-semibold'>Address</label>
              <textarea
                name="address"
                rows="3"
                value={value.address}
                onChange={handleChange}
                placeholder="address"
                className='p-2 rounded mt-2 font-semibold bg-gray-600 text-gray-900'
              />
            </div>
             <div className=' flex justify-end'>
            <button
              onClick={updateProfile}
              className='bg-amber-400 hover:bg-amber-600 py-2 px-4 rounded font-semibold text-gray-800'
            >
              Update
            </button>
          </div>
          </div>
       
        </div>
      )}
    </>
  );
};

export default Setting;
