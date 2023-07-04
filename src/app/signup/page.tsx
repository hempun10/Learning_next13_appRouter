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
    <div className=" flex  items-center justify-center min-h-screen py-2 ">
      <div className="flex flex-col shadow-xl rounded-lg p-14 gap-3">
        <h1 className="text-3xl uppercase font-bold text-center">
          {loading ? "Please Wait.." : "Sign Up"}
        </h1>

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
          className={` bg-black p-2 rounded-lg text-white mt-4 hover:outline hover:bg-transparent outline-black  transition-all hover:text-black disabled:cursor-not-allowed`}
        >
          {buttonDisabled ? "Fill all input" : "SignUp"}
        </button>
        <span>
          Already Account &nbsp;
          <Link href={"/login"} className=" underline">
            Login!
          </Link>
        </span>
      </div>
    </div>
  );
};

export default SignUpPage;
