import React, { useState } from "react";

import LoginForm from "./forms/LoginForm";


export default function Login() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <p className="py-6 text-4xl">Welcome Back!</p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
