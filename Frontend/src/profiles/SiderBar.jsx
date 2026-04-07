import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { authActions } from "../store/auth";
import { useDispatch, useSelector } from "react-redux";

const SiderBar = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { role } = useSelector((state) => state.auth);

  return (
    <div className="bg-zinc-700 p-4 rounded text-white flex flex-col items-center justify-between h-[100%]">
      <div className="flex items-center flex-col justify-center">
        <img
          src="/avatar.png"
          className="w-12 h-12 rounded-full mx-auto"
          alt="avatar"
        />

        <h2 className="text-center font-bold text-xl mt-3">
          {data?.username || "Username"}
        </h2>

        <p className="text-center text-sm text-gray-400 mt-2">
          {data?.email || "email"}
        </p>

        <div className="w-full mt-4 h-[1px] bg-zinc-200 hidden lg:block"></div>
      </div>

      {role === "user" && (
        <div className="w-full flex-col items-center justify-center flex gap-3 mt-4">
          <Link
            to="/profile"
            className="hover:bg-blue-700 duration-200 rounded p-2 font-bold text-center"
          >
            Favourites
          </Link>

          <Link
            to="/profile/orderhistory"
            className="hover:bg-blue-700 duration-200 rounded p-2 font-bold text-center"
          >
            Order History
          </Link>

          <Link
            to="/profile/settings"
            className="hover:bg-blue-700 duration-200 rounded p-2 font-bold text-center"
          >
            Settings
          </Link>
        </div>
      )}
      {
        role === "admin" &&(
          <div className="w-full flex-col items-center justify-center flex gap-3 mt-4">
          <Link
            to="/profile"
            className="hover:bg-blue-700 duration-200 rounded p-2 font-bold text-center"
          >
            All Order
          </Link>

          <Link
            to="/profile/add-book" 
            className="hover:bg-blue-700 duration-200 rounded p-2 font-bold text-center"
          >
            Add Books
          </Link>
        </div>

        )
      }

      {/* LOGOUT */}
      <button
        className="bg-zinc-600 hover:bg-blue-700 duration-200 rounded p-2 font-bold w-3/6 lg:w-full mt-4 flex justify-center items-center gap-4"
        onClick={() => {
          dispatch(authActions.logout());
          dispatch(authActions.changerole(null));
          localStorage.removeItem("id");
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          navigate("/");
        }}
      >
        LogOut
        <FaArrowRightFromBracket />
      </button>
    </div>
  );
};

export default SiderBar;
 