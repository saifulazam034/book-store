import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCheck, FaUserLarge } from "react-icons/fa6";
import Loader from "../components/Loader";

const AllOrder = () => {
  const [allOrder, setAllOrder] = useState([]);
  const [loading, setLoading] = useState(true);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4001/api/v1/User/get-all-order",
          { headers }
        );
        setAllOrder(res.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    setAllOrder((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const updateStatus = async (orderId, status) => {
    try {
      await axios.put(
        `http://localhost:4001/api/v1/User/update-order-status/${orderId}`,
        { status },
        { headers }
      );
      alert("Status Updated Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center bg-zinc-900">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-4 md:p-8">
      <h1 className="text-3xl font-semibold mb-6">All Orders</h1>

      {allOrder.length === 0 ? (
        <div className="text-center text-gray-400 text-lg">
          No Orders Found
        </div>
      ) : (
        <>
        
          <div className="flex items-center bg-zinc-800 rounded px-4 py-3 font-semibold text-xl md:text-base">
            <div className="w-[5%] text-center">Sr.</div>
            <div className="w-[18%]">Book</div>
            <div className="w-[25%]">Description</div>
            <div className="w-[10%]">Price</div>
            <div className="w-[12%]">Current</div>
            <div className="w-[20%] text-center">Update Status</div>
            <div className="w-[15%] text-center">
              <FaUserLarge />
            </div>
          </div>

          {allOrder.map((order, index) => (
            <div
              key={order._id}
              className="flex items-center bg-zinc-700 mt-3 rounded px-4 py-3 hover:bg-zinc-600 transition duration-300 text-sm md:text-base"
            >
              <div className="w-[5%] text-center">{index + 1}</div>

              <div className="w-[18%] font-medium">
                {order.book?.title}
              </div>

              <div className="w-[25%] text-gray-300 truncate">
                {order.book?.desc}
              </div>

              <div className="w-[10%] text-green-400 font-semibold">
                PKR {order.book?.price}
              </div>

              {/* Current Status */}
              <div
                className={`w-[12%] font-semibold ${
                  order.status === "Delivered"
                    ? "text-green-400"
                    : order.status === "Pending"
                    ? "text-yellow-400"
                    : order.status === "Canceled"
                    ? "text-red-400"
                    : "text-blue-400"
                }`}
              >
                {order.status}
              </div>
              <div className="w-[20%] flex items-center justify-center gap-2">
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  className="bg-zinc-800 border border-gray-500 text-white px-2 py-1 rounded"
                >
                  {[
                    "Order Placed",
                    "Pending",
                    "Delivered",
                    "Canceled",
                  ].map((item, i) => (
                    <option key={i} value={item}>
                      {item}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => updateStatus(order._id, order.status)}
                  className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded text-white"
                >
                  <FaCheck />
                </button>
              </div>

              <div className="w-[10%] text-center">
                {order.user?.name}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default AllOrder;
