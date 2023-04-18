import React from "react";
import { Link } from "react-router-dom"
//import { useQuery } from '@apollo/client';
import background from "../images/bghome-alesia-kazantcev-unsplash.jpg"

const Home = () => {
  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:`url(${background})`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Welcome to enCoded</h1>
            <p className="mb-5">
              we are a tech based community looking to take your job search to the next level. don't do it alone, join us, make friends in the process, and land the job of your dreams
            </p>
            <div>
            <Link to="/tour" className="btn btn-primary">Take a Tour</Link>
</div>
            <Link to="/login" className="btn btn-accent  m-5">Log In</Link>
            <Link to="signup" className="btn btn-accent m-5">Sign Up</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
