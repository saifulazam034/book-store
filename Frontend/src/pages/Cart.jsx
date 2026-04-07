import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import { FaDeleteLeft } from 'react-icons/fa6';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(null); 
  const [total, setTotal] = useState(0);

  const headers = {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };


  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4001/api/v1/User/get-cart",
          { headers }
        );
        setCart(res.data.data);
      } catch (error) {
        console.log(error);
        setCart([]);
      }
    };

    fetchCart();
  }, []);

  const deleteItem = async (bookid) => {
    try {
      const res = await axios.put(
        `http://localhost:4001/api/v1/User/remove-cart/${bookid}`,
        {},
        { headers }
      );

      setCart(prev => prev.filter(item => item._id !== bookid));
      alert(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (cart && cart.length > 0) {
      let sum = 0;
      cart.forEach(item => {
        sum += item.price;
      });
      setTotal(sum);
    } else {
      setTotal(0);
    }
  }, [cart]);

  const placeOrder = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4001/api/v1/User/place-order",
        { order: cart },
        { headers }
      );
      alert(response.data.message);
      navigate('/profile/orderhistory');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='bg-zinc-600 px-12 py-8 min-h-screen'>

      {cart === null && <Loader />}

  
      {cart?.length === 0 && (
        <div className='h-screen flex flex-col items-center justify-center'>
          <h1 className='text-4xl lg:text-5xl font-bold text-red-400'>Empty Cart</h1>
          <img src="/empty.png" alt="Empty" className='lg:h-[50vh] mt-10' />
        </div>
      )}

      {cart?.length > 0 && (
        <>
          <h1 className='text-4xl font-bold mb-4'>Your Carts</h1>

          {cart.map((item, i) => (
            <div
              key={i}
              className='w-full my-4 rounded flex flex-col md:flex-row bg-zinc-900 px-6 py-3 justify-between items-center'
            >
              <img
                src={item.url}
                alt={item.title}
                className='md:h-30 w-20 md:w-25 rounded h-20'
              />

              <div className='w-full md:w-auto'>
                <h1 className='text-2xl font-semibold mt-2 text-yellow-500'>
                  {item.title}
                </h1>
                <p className='text-xl mt-4 text-amber-50'>
                  {item.desc.slice(0, 100)}...
                </p>
              </div>

              <div className='flex mt-4 w-full md:w-auto justify-between items-center md:gap-4'>
                <h1 className='text-xl font-bold text-gray-500'>
                  PKR {item.price}
                </h1>

                <button
                  className='text-xl font-bold bg-blue-400 hover:bg-blue-600 text-white rounded py-2 px-2'
                  onClick={() => deleteItem(item._id)}
                >
                  <FaDeleteLeft />
                </button>
              </div>
            </div>
          ))}

       
          <div className='mt-6 w-full flex justify-end'>
            <div className='bg-gray-700 rounded px-6 py-6'>
              <h1 className='text-2xl font-semibold text-amber-900'>
                Total your carts
              </h1>

              <div className='mt-3 flex justify-between items-center'>
                <h1>{cart.length} books</h1>
                <h2>PKR {total}</h2>
              </div>

              <button
                className='w-full mt-4 bg-amber-600 text-2xl font-semibold py-2 px-4 rounded text-white hover:bg-amber-400'
                onClick={placeOrder}
              >
                Place your order
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
