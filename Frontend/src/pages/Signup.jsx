import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    const errs = {};
    if (!values.username) errs.username = "Username is required";
    if (!values.email) errs.email = "Email is required";
    if (!values.password) errs.password = "Password is required";
    if (!values.address) errs.address = "Address is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };


  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:4001/api/v1/User/signup",
        values
      );
      console.log(response.data.message);
      navigate("/"); 
    } catch (error) {
      console.log(error);
       alert(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-auto bg-zinc-600 px-12 py-8 flex items-center justify-center">
      <div className="bg-zinc-400 px-8 py-4 w-full md:w-3/6 lg:w-2/6 rounded">
        <p className="text-2xl font-bold text-center">Sign Up</p>

        {/* Username */}
        <div className="mt-4">
          <label className="text-xl font-semibold">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={values.username}
            onChange={handleChange}
            className="w-full mt-2 p-2 outline-none bg-zinc-700 text-amber-50 rounded"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username}</p>
          )}
        </div>

        {/* Email */}
        <div className="mt-4">
          <label className="text-xl font-semibold">Email</label>
          <input
            type="email"
            name="email"
            placeholder="xyz@gmail.com"
            value={values.email}
            onChange={handleChange}
            className="w-full mt-2 p-2 outline-none bg-zinc-700 text-amber-50 rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="mt-4">
          <label className="text-xl font-semibold">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={values.password}
            onChange={handleChange}
            className="w-full mt-2 p-2 outline-none bg-zinc-700 text-amber-50 rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Address */}
        <div className="mt-4">
          <label className="text-xl font-semibold">Address</label>
          <textarea
            name="address"
            placeholder="Address"
            value={values.address}
            onChange={handleChange}
            className="w-full mt-2 p-2 outline-none bg-zinc-700 text-amber-50 rounded"
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center mt-5">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`px-8 py-2 font-bold text-white rounded ${
              loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-800 hover:bg-blue-600"
            }`}
          >
            {loading ? "Signing up..." : "Signup"}
          </button>

          <h1 className="mt-3 text-xl text-gray-700">OR</h1>
          <p className="mt-3 text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="underline text-blue-600">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
