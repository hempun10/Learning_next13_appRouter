"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const ProfilePage = () => {
  const router = useRouter();
  const [data, setData] = useState(null);

  const logOut = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Successful");
      router.push("/signup");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const getUserDetails = async () => {
      const res = await axios.get("/api/users/me");
      const username = res.data.data.username;
      console.log(username);

      setData(username);
    };

    getUserDetails();
  }, []);

  return (
    <div className=" text-center flex flex-col gap-[15rem]">
      <div className=" flex  justify-evenly p-3 shadow-lg">
        <h1 className=" text-lg p-2">Profile Page </h1>
        <button
          onClick={logOut}
          className=" p-2  bg-red-600  rounded-lg text-white transition-all hover:bg-transparent hover:text-black border border-black"
        >
          Log Out
        </button>
      </div>
      {data && (
        <Link
          href={`/profile/${data}`}
          className=" text-center p-2 border-2 border-black w-[20%] m-auto rounded-full hover:bg-black hover:text-white"
        >
          See My Profile
        </Link>
      )}
    </div>
  );
};

export default ProfilePage;
