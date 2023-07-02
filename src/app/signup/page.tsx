"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

const SignUpPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setuser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setbuttonDisabled] = useState(false);
  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      if (response.status === 200) {
        toast.success("SignUp Sucessfully");
      }
      console.log("SignUp success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.email.length > 0 &&
      user.username.length > 0
    ) {
      setbuttonDisabled(false);
    } else {
      setbuttonDisabled(true);
    }
  }, [user]);
  return (
    <div className=" flex flex-col items-center justify-center min-h-screen py-2 ">
      <h1 className="text-3xl">{loading ? "Proccessing....." : "SignUp"}</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input
        className=" p-2  rounded-lg text-black"
        type="text"
        value={user.username}
        onChange={(e) => setuser({ ...user, username: e.target.value })}
        placeholder="Username"
      />
      <label htmlFor="email">Email</label>
      <input
        className=" p-2  rounded-lg text-black"
        type="email"
        value={user.email}
        onChange={(e) => setuser({ ...user, email: e.target.value })}
        placeholder="abc@gmail.com"
      />
      <label htmlFor="password">password</label>
      <input
        className=" p-2  rounded-lg text-black"
        type="password"
        value={user.password}
        onChange={(e) => setuser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        onClick={onSignUp}
        className=" bg-gray-300 p-2 rounded-lg text-white mt-4"
      >
        {buttonDisabled ? " No signUp" : "SignUp"}
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
