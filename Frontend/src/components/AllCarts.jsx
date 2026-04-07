import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
function AllCarts({data, favourite}) {
  const headers={
    id:localStorage.getItem("id"),
    authorization: `Beare ${localStorage.getItem("token")}`,
    bookid:data._id,
  };
  const removebooks = async()=>{
    const response = await axios.put("http://localhost:4001/api/v1/User/remove-favourite",{},
      {headers})
      alert(response.data.message)
  }

    return (
      <div className='bg-zinc-600 rounded p-4 hover:scale-105'>
     <Link to={`/book/${data._id}`}>
      <div>
        <div className='bg-zinc-700 flex flex-col items-center justify-center '>
          <img src={data.url} alt="/" className='h-[25vh]' />
        </div>
         <p className='text-2xl font-bold mt-2'>{data.title}</p>
         <p className='text-xl mt-2 font-semibold'>By {data.author}</p>
         <p className='text-xl font-bold mt-2 text-white'>PKR={data.price}</p>

        
      </div>
      </Link>
       {favourite && (
        <button onClick={removebooks} className='bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 mt-3 rounded duration-300'>Remove from favourite</button>)}
      </div>
      )}

export default AllCarts;
