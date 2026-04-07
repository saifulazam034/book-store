import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import SiderBar from "../profiles/SiderBar";
import axios from "axios";
import Loader from "../components/Loader";

function Profile() {
  const [profile, setProfile] = useState(null);

  const headers = {
    // id: localStorage.getItem("id"),
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4001/api/v1/User/get-user",
          { headers }
        );
        console.log(response.data);
        setProfile(response.data);
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="bg-zinc-500 px-2 md:px-12 flex flex-col md:flex-row py-8 gap-4 text-white">
      {!profile && (
        <div className="w-full h-full flex items-center justify-center">
          <Loader />
        </div>
      )}

      {profile && (
        <>
          <div className="w-full md:w-1/6 h-screen">
            <SiderBar data={profile} />
          </div>

          <div className="w-full md:w-5/6 ">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
