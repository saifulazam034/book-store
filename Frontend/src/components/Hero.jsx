import React from 'react';

function Hero() {

  return (
    <div className=' px-8 h-[75vh] flex  flex-col md:flex-row items-center justify-center mt-12 md:mt-0 '>
      <div className=' w-full lg:w-3/6 flex flex-col items-center lg:items-start justify-center mb-12 md:mb-0' >
      <h1 className='text-4xl lg:text-6xl font-bold text-center lg:text-left mt-15 md:mt-15'>
        Discover Next Your Goal</h1>
        <p className='text-2xl text-gray-600 mt-7 text-center lg:text-left'>As you read, take your time and enjoy the journey. Every page has something to offer.

Read slowly, think deeply, and allow these words to meet you where you are.</p>
<div className='mt-10 sm:mb-6'>
    <button className='bg-blue-800 hover:bg-blue-500 text-white px-8 py-3 border border-y-amber-700 text-2xl font-bold rounded-full cursor-pointer duration-200'>Discover Books</button>
</div>
      
      </div>
      
      <div className=' w-full lg:w-3/6 h-auto lg:h[100%] flex items-center justify-center 
       '>
      <img src="/hero11 (1).png" alt="Hero"  className='h-85 md:h-95 w-150 rounded mt-10 md:12 '/>
      </div>
    </div>
  );
}

export default Hero;
