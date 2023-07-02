"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { axios } from "axios";

const LoginPage = () => {
  const [user, setuser] = useState({
    email: "",
    password: "",
  });
  const onSignUp = async () => {};
  return (
    <div className=" flex flex-col items-center justify-center min-h-screen py-2">
      Login
      <hr />
      <label htmlFor="email">Email</label>
      <input
        className=" p-2  rounded-lg"
        type="email"
        value={user.email}
        onChange={(e) => setuser({ ...user, email: e.target.value })}
        placeholder="abc@gmail.com"
      />
      <label htmlFor="password">password</label>
      <input
        className=" p-2  rounded-lg"
        type="password"
        value={user.password}
        onChange={(e) => setuser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        type="submit"
        className=" bg-gray-300 p-2 rounded-lg text-white mt-4"
      >
        SignUp
      </button>
      <span>
        Create New Account
        <Link href={"/signup"} className=" underline">
          SignUp!
        </Link>
      </span>
    </div>
  );
};

export default LoginPage;
