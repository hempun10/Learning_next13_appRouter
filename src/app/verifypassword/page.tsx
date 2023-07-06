"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";

export default function VerifyPasswordPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyToken = async () => {
    try {
      const response = await axios.post("/api/users/verifypasschangetoken", {
        token,
      });
      setVerified(true);
      console.log(response);
    } catch (error: any) {
      setError(true);
      toast.error("Verification Failed", error.message);
    }
  };
  //   Get the Token form URL
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);
  console.log(token);

  //   IF there is token it will invoke the verify email function
  useEffect(() => {
    if (token.length > 0) {
      verifyToken();
    }
  }, [token]);

  return (
    <div className=" flex h-screen justify-center items-center flex-col">
      <div className=" shadow-xl flex flex-col p-16 rounded-lg gap-5">
        {verified ? (
          <>
            <h1 className=" text-3xl font-bold uppercase">Reset Password</h1>
            <hr />
            <label htmlFor="password">Password</label>
            <input
              className=" p-2  rounded-lg text-black outline outline-black"
              type="password"
              placeholder="password"
            />
            <label htmlFor="password">Confirm Password</label>
            <input
              className=" p-2  rounded-lg text-black outline outline-black"
              type="password"
              placeholder="password"
            />
            <button
              className=" p-2  rounded-lg text-white bg-black hover:bg-transparent hover:text-black border-2 border-black transition-all "
              type="submit"
            >
              Submit
            </button>
          </>
        ) : (
          <>
            <h1 className=" text-xl text-red-600 ">Verification Failed </h1>

            <Link
              href="/forgetpassemail"
              className=" text-center text-sm underline  flex  items-center gap-2"
            >
              <BiArrowBack />
              Forgot Password
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
