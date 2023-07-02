"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { axios } from "axios";

const SignUpPage = () => {
  const router = useRouter();
  const [user, setuser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setbuttonDisabled] = useState(false);
  const onSignUp = async () => {};
  return (
    <div className=" flex flex-col items-center justify-center min-h-screen py-2">
      Sign Up
      <hr />
      <label htmlFor="username">username</label>
      <input
        className=" p-2  rounded-lg"
        type="text"
        value={user.username}
        onChange={(e) => setuser({ ...user, username: e.target.value })}
        placeholder="Username"
      />
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
        Already Account
        <Link href={"/login"} className=" underline">
          Login!
        </Link>
      </span>
    </div>
  );
};

export default SignUpPage;
