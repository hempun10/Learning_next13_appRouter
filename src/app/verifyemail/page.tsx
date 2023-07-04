"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  //   Get the Token form URL
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  //   IF there is token it will invoke the verify email function
  useEffect(() => {
    if (token.length > 0) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div className=" flex h-screen justify-center items-center flex-col">
      <h1 className=" text-xl">
        {verified ? toast.success("Succesfully Verified ") : "Verifing"}
      </h1>
      {verified && (
        <div>
          <Link href="/login" className=" underline text-lg ">
            Login
          </Link>
        </div>
      )}
      {error && toast.error("Error Occured")}
    </div>
  );
}
