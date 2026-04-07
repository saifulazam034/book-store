import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from '../components/Loader';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaCartShopping, FaDeleteLeft, FaHeart } from 'react-icons/fa6';
import { MdDelete, MdEdit } from "react-icons/md";
import { useSelector } from 'react-redux';
const ViewDetail = () => {
 const navigate= useNavigate();
    const { id }= useParams();
  
     const [data, setData] = useState([]);
      const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
      const role = useSelector((state)=>state.auth.role)
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(
              `http://localhost:4001/api/v1/User/get-book-by-id/${id}`
            );
            setData(response.data.data);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData();
    
      }, []);
     const headers = {
    id: localStorage.getItem("id"),
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };
  const onFavourites= async ()=>{
    const response = await axios.put("http://localhost:4001/api/v1/User/favourite",{},
      {headers}
    );
    alert(response.data.message);
  }
  const oncart = async()=>{
    const response = await axios.put("http://localhost:4001/api/v1/User/put-cart",{},
      {headers}
    );
     alert(response.data.message);
  }
  const deleteon = async()=>{
    const res = await axios.delete("http://localhost:4001/api/v1/User/delete-book",
      {headers}
    );
    alert(res.data.message);
    navigate("/all-books")
  }
  return (
    <>   {!data &&(
        <div className='flex items-center justify-center my-8 text-2xl text-black'>
          <Loader className=""/>
        </div>
      )} 

    <div className='bg-zinc-400 px-8 md:px-12 py-8 flex flex-col md:flex-row  gap-8'>
        
        <div className='w-full  lg:w-3/6 '>
        <div className='p-12 flex flex-col lg:flex-row bg-zinc-500 justify-around  rounded gap-3'>
        <img src={data.url} alt="/" className=' h-[50vh] md:h-[85vh] rounded' />
       {isLoggedIn===true && role==="user" &&(
<div className='flex-row mt-2 md:mt-0 md:flex-col  items-center  md:justify-start'>
          <button className='bg-white rounded md:rounded-full text-xl flex px-11 md:px-2  p-2 text-red-600 hover:bg-amber-200 '
          onClick={onFavourites}><FaHeart/><span className='ms-1 block lg:hidden'>Add To Favourites</span></button>
          <button className='bg-white rounded md:rounded-full flex text-xl px-11 md:px-2  py-2 text-green-400 mt-3 md:mt-5 hover:bg-amber-200'
          onClick={oncart} > <FaCartShopping/> <span className='ms-3 block lg:hidden'>Add To Cart</span></button>
        </div>
       )} 

        {isLoggedIn===true && role==="admin" &&(
<div className='flex-row mt-2 md:mt-0 md:flex-col  items-center  md:justify-start'>
          <Link to={`/updateBook/${id}`} className='bg-white rounded md:rounded-full text-xl flex px-11 md:px-2  p-2 text-red-600 hover:bg-amber-200 '><MdEdit className='text-2xl'/><span className='ms-1 block lg:hidden'>Edite Book</span></Link>
          <button className='bg-white rounded md:rounded-full flex text-xl px-11 md:px-2  py-2 text-green-400 mt-3 md:mt-5 hover:bg-amber-200' 
          onClick={deleteon}> <MdDelete className='text-2xl'/> <span className='ms-3 block lg:hidden'>Delete Book</span></button>
        </div>
       )} 
        </div>
        </div>
        
        <div className=' w-full lg:w-3/6 p-4'>
        <h1 className='text-3xl font-bold mt-6'> Title:  {data.title}</h1>
        <p className='text-2xl font-semibold mt-5'>  Author Name:  {data.author}</p>
        <p className='text-xl text-gray-500 mt-5 ' ><span className='text-2xl font-semibold mb-3 text-gray-900'>description: </span>{data.desc}</p>
        <p  className='text-2xl font-semibold my-5'> Language: {data.language}</p>
        <p className='text-2xl font-semibold text-blue-600'>PKR: {data.price}</p>
        </div>
      
    </div>
  

    </>
  );
}

export default ViewDetail;
