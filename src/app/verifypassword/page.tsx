"use client";
import axios from "axios";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";

export default function VerifyPasswordPage() {
  const [token, setToken] = useState("");
  const [isLodaing, setIsLodaing] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const verifyToken = async () => {
    try {
      const response = await axios.post("/api/users/verifytokenpass", {
        token,
      });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      toast.error(error.message);
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
      verifyToken();
    }
  }, [token]);

  const handlePasswordUpdate = async () => {
    try {
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      setIsLodaing(true);

      const response = await axios.post("/api/users/updatepassword", {
        token,
        password,
      });
      if (response.status === 200) {
        toast.success("Password updated successfully");
      }
      console.log(response);
    } catch (error: any) {
      console.log(error);
      toast.error("Error updating password");
    } finally {
      setIsLodaing(false);
    }
  };

  return (
    <div className=" flex h-screen justify-center items-center flex-col">
      <div className=" shadow-xl flex flex-col p-16 rounded-lg gap-5">
        {verified ? (
          <>
            <h1 className=" text-3xl font-bold uppercase">
              {" "}
              {isLodaing ? "Please Wait..." : "Reset Password"}
            </h1>
            <hr />
            <label htmlFor="password">Password</label>
            <input
              className="p-2 rounded-lg text-black outline outline-black"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              className="p-2 rounded-lg text-black outline outline-black"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              onClick={handlePasswordUpdate}
              className=" p-2  rounded-lg text-white bg-black hover:bg-transparent hover:text-black border-2 border-black transition-all "
              type="submit"
            >
              Submit
            </button>
            <Link
              href={"/login"}
              className=" flex items-center justify-center gap-2"
            >
              <BiArrowBack /> Back to Login
            </Link>
          </>
        ) : (
          <>
            <h1 className=" text-3xl font-bold uppercase">
              {error ? "Error" : "Verifying Token"}
            </h1>

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
