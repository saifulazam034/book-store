
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from '../components/Loader';
import AllCarts from "../components/AllCarts"
const AllBooks = () => {
    const [data, setData] = useState([]);
    
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(
              "http://localhost:4001/api/v1/User/get-all-book"
            );
            console.log(response.data);
            setData(response.data.data);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData();
    
      }, []);
  return (
    <div className='h-auto px-12'>
        <h1 className="font-bold text-4xl mt-6 mb-6">All Books</h1>
               {!data &&(
                <div className='flex items-center justify-center my-8 text-2xl text-black'>
                  <Loader className=""/>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 my-8 gap-6">
              { data && data.map((item, index) => (
                <div key={index}>
              <AllCarts data={item}/>
                </div>
              ))}
            </div>

      
    </div>
  );
}

export default AllBooks;
