"use client";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className=" h-screen flex flex-col justify-center items-center text-center ">
      <h1 className=" text-3xl font-bold w-[50%] gap-3">
        Hey this is the NEXT JS 13 Full Stack course by Hitesh Choudhary
      </h1>
      <Link
        className=" underline text-blue-500"
        href={
          "/https://www.youtube.com/watch?v=iPGXk-i-VYU&list=PLRAV69dS1uWR7KF-zV6YPYtKYEHENETyE"
        }
      >
        Course Link
      </Link>
      <p className="">
        1. In this course Hitesh teach us how to make a Auth app
      </p>
      <Link className=" underline text-blue-500" href={"/profile"}>
        Project Demo Link
      </Link>
    </div>
  );
}
