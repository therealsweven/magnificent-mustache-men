import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import SchoolForm from "./forms/SchoolForm";
import Auth from "..//../utils/auth";
import background from "..//..//components/images/vasily-createschool-unsplash.jpg";

export default function Login() {
  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url(${background})`,
        }}
      >
        <div className="hero-overlay bg-opacity-80"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">
              Represent your Educational Institution
            </h1>
            <p className="mb-5">
              Need a page to represent your educational institution? Create one
              now.
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <SchoolForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
