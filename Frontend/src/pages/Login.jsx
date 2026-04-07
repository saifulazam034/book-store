import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";

function Login() {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeHandle = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const submitHandler = async () => {
    try {
      if (values.username === "" || values.password === "") {
        alert("All fields are required");
        return;
      }

      const response = await axios.post(
        "http://localhost:4001/api/v1/User/login",
        values
      );

      console.log("Login response:", response.data);

    
      dispatch(authActions.login());
      dispatch(authActions.changerole(response.data.role))
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      navigate("/profile");

    } catch (error) {
      console.log(error.response?.data || error.message);
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="h-auto bg-zinc-600 px-12 py-8 flex items-center justify-center">
      <div className="bg-zinc-400 px-8 py-4 w-full md:w-3/6 lg:w-2/6 rounded">
        <h1 className="text-2xl font-bold text-center">Login</h1>

        <div className="mt-4">
          <label className="text-xl font-semibold">Username</label>
          <input
            className="w-full mt-2 p-2 outline-none bg-zinc-700 text-amber-50 rounded"
            type="text"
            name="username"
            placeholder="Enter username"
            value={values.username}
            onChange={changeHandle}
          />
        </div>

        <div className="mt-4">
          <label className="text-xl font-semibold">Password</label>
          <input
            className="w-full mt-2 p-2 outline-none bg-zinc-700 text-amber-50 rounded"
            type="password"
            name="password"
            placeholder="Enter password"
            value={values.password}
            onChange={changeHandle}
          />
        </div>

        <div className="text-center mt-6">
          <button
            className="px-8 py-2 font-bold bg-blue-800 text-white rounded hover:bg-blue-600"
            onClick={submitHandler}
          >
            Login
          </button>

          <h1 className="mt-3 text-xl text-gray-700">OR</h1>
          <p className="mt-3 text-gray-500">
            Don’t have an account?{" "}
            <Link to="/signup" className="underline text-blue-600">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
