"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";

const UserProfile = ({ params }: any) => {
  const router = useRouter();
  const logOut = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Successful");
      router.push("/signup");
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <div className=" flex flex-col py-2 gap-[17rem]">
      <div className=" flex  justify-between p-3 shadow-lg">
        <Link href={"/"}>
          <h1 className=" flex justify-center items-center gap-2 text-lg p-2">
            <BiArrowBack /> Back to Home
          </h1>
        </Link>
        <h1 className=" text-lg p-2 capitalize">{params.id}'s Profile Page</h1>
        <button
          onClick={logOut}
          className=" p-2  bg-red-600  rounded-lg text-white transition-all hover:bg-transparent hover:text-black hover:border-2 border-black"
        >
          Log Out
        </button>
      </div>
      <h1 className=" text-2xl text-center ">
        Hey <span className=" capitalize ">{params.id}</span> Welcome to your
        profile
      </h1>
    </div>
  );
};

export default UserProfile;
