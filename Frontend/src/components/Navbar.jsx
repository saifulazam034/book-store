import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdMenu } from "react-icons/io";
import { useSelector } from 'react-redux';

function Navbar() {
  const { isLoggedIn, role } = useSelector((state) => state.auth);
  const [menubar, setMenubar] = useState(false);

  const links = [
    { title: "Home", link: "/" },
    { title: "All Books", link: "/all-books" },
    { title: "Cart", link: "/cart" },
    { title: "Profile", link: "/profile" },
    { title: "Admin Profile", link: "/profile" },
  ];

  let visibleLinks = [...links];

  if (!isLoggedIn) {
    visibleLinks.splice(2, 3);
  }

  if (isLoggedIn && role === "user") {
    visibleLinks = visibleLinks.filter(
      item => item.title !== "Admin Profile"
    );
  }

  if (isLoggedIn && role === "admin") {
    visibleLinks = visibleLinks.filter(
      item => item.title !== "Profile"
    );
  }

  return (
    <>
      <div className='relative z-50 bg-slate-800 text-white px-8 py-4 flex items-center justify-between'>
        <Link to='/' className='flex items-center gap-2'>
          <img src="/logo.png" alt="logo" className='h-12 rounded-full' />
          <h1 className='font-bold italic'>
            <span className='text-xl text-yellow-600'>S.T</span>Books
          </h1>
        </Link>

        <div className='flex items-center gap-6'>

          <div className='hidden md:flex gap-4'>
            {visibleLinks.map((item, i) => (
              <Link
                key={i}
                to={item.link}
                className='hover:text-pink-600 text-xl font-semibold transition'
              >
                {item.title}
              </Link>
            ))}
          </div>

          {!isLoggedIn && (
            <div className='hidden md:flex gap-4'>
              <Link to="/login" className='font-semibold px-4 py-1 border rounded'>
                Login
              </Link>
              <Link to="/signup" className='font-semibold px-4 py-1 bg-blue-600 rounded'>
                Signup
              </Link>
            </div>
          )}

  
          <button
            className='text-3xl md:hidden'
            onClick={() => setMenubar(!menubar)}
          >
            <IoMdMenu />
          </button>
        </div>
      </div>

  
      {menubar && (
        <div className='bg-gray-700 text-2xl h-screen fixed top-0 left-0 w-full z-40 flex flex-col items-center justify-center gap-8 font-bold'>
          {visibleLinks.map((item, i) => (
            <Link
              key={i}
              to={item.link}
              onClick={() => setMenubar(false)}
            >
              {item.title}
            </Link>
          ))}

          {!isLoggedIn && (
            <>
              <Link to="/login" onClick={() => setMenubar(false)}>Login</Link>
              <Link to="/signup" onClick={() => setMenubar(false)}>Signup</Link>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default Navbar;
