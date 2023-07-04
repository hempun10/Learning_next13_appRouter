"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();
  const [user, setuser] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const onLogin = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log(response);
      toast.success("Login Successfull");
      router.push("/profile");
    } catch (error: any) {
      toast.error("Login Failed", error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className=" flex items-center justify-center min-h-screen py-2 ">
      <div className=" shadow-xl flex flex-col p-16 rounded-lg gap-5">
        <h1 className=" text-3xl uppercase font-bold text-center">
          {isLoading ? "Please Wait..." : "Login"}
        </h1>
        <hr />
        <label htmlFor="email">Email</label>
        <input
          className=" p-2  rounded-lg text-black outline outline-black   "
          type="email"
          value={user.email}
          onChange={(e) => setuser({ ...user, email: e.target.value })}
          placeholder="abc@gmail.com"
        />
        <label htmlFor="password">password</label>
        <input
          className=" p-2  rounded-lg text-black outline outline-black"
          type="password"
          value={user.password}
          onChange={(e) => setuser({ ...user, password: e.target.value })}
          placeholder="password"
        />
        <button
          onClick={onLogin}
          className=" bg-black p-2 rounded-lg text-white mt-4 hover:outline hover:bg-transparent outline-black  transition-all hover:text-black"
        >
          LogIn
        </button>
        <span>
          Create New Account &nbsp;
          <Link href={"/signup"} className=" underline">
            SignUp!
          </Link>
        </span>
      </div>
    </div>
  );
};

export default LoginPage;
