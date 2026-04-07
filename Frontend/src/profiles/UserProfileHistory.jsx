import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
const UserProfileHistory = () => {
  const [history, setHistory] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4001/api/v1/User/get-all-order",
          { headers }
        );
        setHistory(res.data.data);
      } catch (error) {
        console.log(error);
        setHistory([]);
      }
    };

    fetchHistory();
  }, []);

  return (
    <>
  
      {history === null && <Loader />}

   
      {history?.length === 0 && (
        <div className='h-[80vh] p-4 text-white'>
          <div className='h-[100%] flex flex-col items-center justify-center'>
            <h1 className='text-3xl font-semibold text-shadow-gray-800 mb-6'>
              No Order History
            </h1>
            <img src="/ima.png" alt="Empty" className='h-20 w-20' />
          </div>
        </div>
      )}

    
      {history?.length > 0 && (
        <div className=' h-[100%] p-0 md:p-4 text-white'>
          <h1 className='text-3xl mb-6 font-semibold'>Order History</h1>
          <div className='flex mt-4 gap-4 bg-zinc-600 w-full rounded px-4 py-2 '>
            <div className='w-[3%]'>
              <h1 className='text-center'>Sr.</h1>
            </div>
            <div className='w-[22%]'>
              <h1>Books</h1>
            </div>
            <div className='w-[45%]'>
              <h2>Description</h2>

            </div>
            <div className='w-[12%]'>
              <h3>Price</h3>
            </div>
            <div className='w-[12%]'>
              <h3>Status</h3>
            </div>
            <div className='w-none md:w-[5%] hidden md:block'>
              <h1>Mode</h1>
            </div>

          </div>

          {history.map((order, i) => (
            <div
              key={i}
              className='px-4 py-2 flex gap-6 hover:bg-zinc-600 hover:cursor-pointer w-full rounded bg-zinc-800'>
                <div className='w-[3%]'>
                  <h2 className='text-xl font-semibold mb-2'>
                  {i + 1}
              </h2>
                </div>
                <div className='w-[22%]'>
                  <Link to={`/book/${order.book?._id}`} className="hover:text-blue-400">
                  {order.book?.title}
                  </Link>
                </div>
                <div className='w-[45%]'>
                  <h1>{order.book?.desc.slice(0,40)}...</h1>
                </div>
                <div className='w-[9%]'>
                <h1 className='text-xl font-bold text-gray-500'>
                   {order.book?.price}
                </h1>
                </div>
                <div className='w-[16%]'>
                  <h1 className='font-semibold text-green-400 text-xl '>
                    {
                      order.status==="Order place" ?(
                        <div className='text-yellow-400'>{order.status}</div>
                      ): order.status === "Canceled" ?(
                        <div className='text-red-500'>{order.status}
                        </div>
                      ):(
                        order.status
                      )
}
                  </h1>


                </div>
                <div className='w-none md:w-[5%] hidden md:block'>
                  <h1 className='text-sm  text-gray-400'>COD</h1>

                </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default UserProfileHistory;
