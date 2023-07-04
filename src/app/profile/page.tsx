"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const ProfilePage = () => {
  const router = useRouter();
  const [data, setData] = useState("");
  const logOut = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Successful");
      router.push("/signup");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    setData(res.data.data.username);
  };
  return (
    <div className=" flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile </h1>
      <hr />
      {data === "" ? "Nothing" : <Link href={`/profile/{data}`}>{data}</Link>}
      <button
        onClick={logOut}
        className=" p-2 bg-neutral-300 text-black rounded-lg"
      >
        Log Out
      </button>

      <button onClick={getUserDetails}>My Details</button>
    </div>
  );
};

export default ProfilePage;
