import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserForm from "./forms/UserForm";
import { useMutation } from "@apollo/client";

import Auth from "../../utils/auth";

export default function Signup() {
  return (
    <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Sign Up</h1>
      <p className="py-6">Welcome to an Exciting New PlatForm built just For Tech Developers Just Like You! Welcom to your new Networking Space!</p>
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div className="card-body">
<UserForm />
      </div>
    </div>
  </div>
</div>
  )
};
