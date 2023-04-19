import {} from "@apollo/client";
import google from "../images/image8-2.jpg";
import philip from "../images/portrait-philip-martin-unsplash.jpg";
import Sundar from "../images/download.jpg";
import { Link } from "react-router-dom";

export default function CompanyProfile() {
  return (
    <>
      {/* Header */}
      <div className="container-Header m-5 ">
        <div className="grid grid-cols-8 gird-rows-1 justify-items-center">
          <div className="col-span-4 row-span-1 bg-slate-700 rounded ml-10 ">
            <h1 className="Name font-bold text-white text-5xl m-4">Google</h1>
            <p className="About text-xl m-5 pl-4">
              A problem isn't truly solved until it's solved for all. Googlers
              build products that help create opportunities for everyone,
              whether down the street or across the globe. Bring your insight,
              imagination and a healthy disregard for the impossible. Bring
              everything that makes you unique. Together, we can build for
              everyone.
            </p>
          </div>
          <div className="col-span-1 row-span-1 bg-slate-700 rounded ml-40">
            <img
              src={google}
              className="float-right m-5 max-w-xs max-h-72 rounded-lg shadow-2xl"
            />
          </div>
          <div className="col-span-3 row-span-1 bg-slate-700 ml-44 rounded">
            <h2 className="font-bold text-white text-3xl my-2 px-4">Info</h2>
            <ul>
              <li className="px-4 m-3">Location: Mountain View, CA</li>
              <li className="px-4 m-3">Size: 3000-5000 Employees</li>
              <li className="px-4 m-3">Founded: 1998</li>
              <li className="px-4 m-3">
                <a href="https://www.careers.google.com">Website</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Body */}
      <div className="container-Body m-5 ">
        {/* Current Job Postings */}
        <div className="grid grid-cols-8 gird-rows-1 justify-items-center">
          <div className="col-span-6 row-span-1 overflow-scroll bg-slate-700 p-3 rounded max-h-72 w-11/12 ">
            <h2 className="jobPosts font-bold text-white text-4xl m-4">
              Current Job Openings
            </h2>
            <div className="card-body bg-cyan-900 rounded w-full p-4 my-2">
              <h2 className="card-title text-white">
                Full-Stack Web Developer
              </h2>
              <p className="text-white">
                We need someone who is good at things and stuff for web
                Development.
              </p>
              <div className="badges justify-content align-items">
                <span className="badge">JavaScript</span>
                <span className="badge">React</span>
                <span className="badge">C++</span>
                <span className="badge">Java</span>
                <span className="badge">Go</span>
                <span className="badge">Junior</span>
              </div>

              <div className="card-actions justify-end">
                <label
                  htmlFor="modal-1"
                  className="drawer-button btn btn-primary"
                >
                  Read More
                </label>
                <button className="btn btn-primary">One Click Apply</button>
              </div>
            </div>
            <div className="card-body bg-cyan-900 rounded w-full p-4 my-2">
              <h2 className="card-title text-white">
                Full-Stack Web Developer
              </h2>
              <p className="text-white">
                We need someone who is good at things and stuff for web
                Development.
              </p>
              <div className="badges justify-content align-items">
                <span className="badge">JavaScript</span>
                <span className="badge">React</span>
                <span className="badge">C++</span>
                <span className="badge">Java</span>
                <span className="badge">Go</span>
                <span className="badge">Junior</span>
              </div>

              <div className="card-actions justify-end">
                <label
                  htmlFor="modal-1"
                  className="drawer-button btn btn-primary"
                >
                  Read More
                </label>
                <button className="btn btn-primary">One Click Apply</button>
              </div>
            </div>
          </div>
          {/* Current Employess */}
          <div className="col-span-2 row-span-1 overflow-y-scroll bg-slate-700 p-3 rounded max-h-72">
            <h2 className="font-bold text-white text-2xl m-4">
              Current Employees
            </h2>
            <ul className=" p-3 rounded bg-cyan-900">
              <li>
                <div className="avatar">
                  <div className="w-12 my-2 rounded-full">
                    <Link to="#">
                      <img src={philip} className="overlow-hidden" />
                    </Link>
                  </div>
                  <h4 className="Name text-xl text-white self-center px-3">
                    Philip Martin
                  </h4>
                </div>
              </li>
              <li>
                <div className="avatar">
                  <div className="w-12 my-2 rounded-full">
                    <Link to="#">
                      <img src={Sundar} className="overlow-hidden" />
                    </Link>
                  </div>
                  <h4 className="Name text-xl text-white self-center px-3">
                    Sundar Pichai
                  </h4>
                </div>
              </li>
            </ul>
          </div>
          <div className="col-span-6 row-span-1 overflow-scroll bg-slate-700 p-3 rounded max-h-72 w-11/12 my-12">
            <h2 className="jobPosts font-bold text-white text-4xl m-4">
              What is Happening at Google
            </h2>
            <div className="card-body bg-cyan-900 rounded w-full p-4 my-2">
              <h2 className="card-title text-white">
                We dont Sell your info, We promise
              </h2>
              <p className="text-white">
                We don't make money off of your basic info, we promise!
              </p>

              <div className="card-actions justify-end">
                <label
                  htmlFor="modal-1"
                  className="drawer-button btn btn-primary"
                >
                  Read More
                </label>
              </div>
            </div>
            <div className="card-body bg-cyan-900 rounded w-full p-4 my-2">
              <h2 className="card-title text-white">
                We dont work for the robots!
              </h2>
              <p className="text-white">
                We are planning on starting the robot uprising. We have already
                converted 30% of our work force to robots to complete work
                faster than humans!
              </p>

              <div className="card-actions justify-end">
                <label
                  htmlFor="modal-1"
                  className="drawer-button btn btn-primary"
                >
                  Read More
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
