"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";

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
      <div className=" flex  justify-between p-3 shadow-lg">
        <Link href={"/"}>
          <h1 className=" flex justify-center items-center gap-2 text-lg p-2">
            <BiArrowBack /> Back to Home
          </h1>
        </Link>
        <h1 className=" text-lg p-2">Profile Page </h1>
        <button
          onClick={logOut}
          className=" p-2  bg-red-600  rounded-lg text-white transition-all hover:bg-transparent hover:text-black hover:border-2 border-black"
        >
          Log Out
        </button>
      </div>
      {data && (
        <Link
          href={`/profile/${data}`}
          className=" text-center p-2 border-2 border-black w-[20%] m-auto rounded-full hover:bg-black hover:text-white transition-all"
        >
          See My Profile
        </Link>
      )}
    </div>
  );
};

export default ProfilePage;
