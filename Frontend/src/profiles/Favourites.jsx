import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AllCarts from '../components/AllCarts';
import { useNavigate } from 'react-router-dom';

const Favourites = () => {
  const navigate= useNavigate
  const [books, setBooks]=useState();
  const headers={
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(()=>{
    const fetch = async()=>{
    const response= await axios.get("http://localhost:4001/api/v1/User/get-favourite",
      {headers}
    );
    navigate("/profile")
    console.log(response.data);
   setBooks(response.data.data);
    }
fetch();
  },[])
  return (
    <>
    {books?.length === 0 && (
    <div className='md:text-5xl text-2xl  font-semibold h-[100%] bg-zinc-300 flex flex-col justify-center items-center w-full text-yellow-300 '>
     No Favourite Books 
     <img src="/star.webp" alt="star" className=' h-8 md:h-[15vh] my-8' />

     </div>
     )}

    <div className='grid md:grid-cols-3 gap-4'>

  {books?.map((item, i) => (
    <div key={i}>
      <AllCarts data={item} favourite={true} />
    </div>
  ))}
</div>
    </>

  );
}

export default Favourites;
