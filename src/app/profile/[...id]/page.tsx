import React from "react";

const UserProfile = ({ params }: any) => {
  return (
    <div className=" flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className=" text-2xl"> Profile {params.id} </h1>
    </div>
  );
};

export default UserProfile;
