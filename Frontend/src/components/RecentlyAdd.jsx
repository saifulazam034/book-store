

import { useEffect, useState } from "react";
import Loader from '../components/Loader';
import AllCarts from "./AllCarts";
import axios from "axios";
function RecentlyAdd() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4001/api/v1/User/get-recent-book"
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
    <div className="mt-24 md:mt-12 px-8">
      <h2 className="text-4xl font-semibold text-yellow-600">Recently Added Books</h2>
       {!data &&(
        <div className='flex items-center justify-center my-8 text-2xl text-black'>
          <Loader className=""/>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 my-8 gap-4">
      { data && data.map((item, index) => (
        <div key={index}>
      <AllCarts data={item}/>
        </div>
      ))}
    </div>
    </div>
  );
}

export default RecentlyAdd;
