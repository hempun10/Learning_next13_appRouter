"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";

const PasswordResetPage = () => {
  const [email, setEmail] = useState({
    email: "",
  });
  const [loading, setLoading] = useState(false);

  const onSubmitEmail = async () => {
    try {
      setLoading(true);

      // Check if email is not null or empty
      if (!email) {
        throw new Error("Email is required");
      }

      const response = await axios.post(
        "/api/users/verifyuserforpassword",
        email
      );

      if (response.status === 200) {
        toast.success("Please check your mail for verification");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex h-screen items-center justify-center ">
      <div className=" flex flex-col  shadow-2xl p-9 gap-3 rounded-lg">
        <h1 className=" text-xl uppercase font-bold">
          {loading ? "Please Wait..." : "Forget Password"}
        </h1>
        <input
          type="email"
          onChange={(e) => setEmail({ ...email, email: e.target.value })}
          placeholder="Enter your email"
          className=" p-2 rounded-md outline"
        />
        <button
          onClick={onSubmitEmail}
          className="bg-black p-2 rounded-lg text-white mt-4 hover:outline hover:bg-transparent outline-black  transition-all hover:text-black"
        >
          Submit
        </button>
        <Link
          href={"/login"}
          className=" flex items-center justify-center gap-2"
        >
          <BiArrowBack /> Back to Login
        </Link>
      </div>
    </div>
  );
};

export default PasswordResetPage;
