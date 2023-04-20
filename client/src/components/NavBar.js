import { Link } from "react-router-dom";
import React, { useState } from "react";
import logo from "../components/images/Untitled design.png";
import placeholder from "../components/images/portrait-philip-martin-unsplash.jpg";

export default function NavBar() {
  return (
    <>
      <div className="navbar bg-base-300">
        <div className="flex-1">
          <img className=" mx-3 rounded h-11 " src={logo} />
          <Link
            to="#"
            className="btn btn-ghost normal-case text-xl font-titilliumWeb"
          >
            enCoded
          </Link>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered"
            />
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                {/* Profile images*/}
                <img src={placeholder} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <div className="dropdown dropdown-left">
                  <label tabIndex={1} className="">
                    Switch Profiles
                  </label>
                  {}
                  <ul
                    tabIndex={1}
                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <label
                        tabIndex={0}
                        className="btn btn-ghost btn-circle avatar"
                      >
                        <div className="w-14 rounded-full">
                          {/* Profile images*/}
                          <img src={placeholder} />
                        </div>
                      </label>
                    </li>
                    <li>
                      <label
                        tabIndex={0}
                        className="btn btn-ghost btn-circle avatar"
                      >
                        <div className="w-14 rounded-full">
                          {/* Profile images*/}
                          <img src={placeholder} />
                        </div>
                      </label>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <Link to="#">Settings</Link>
              </li>
              <li>
                <Link to="#">Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
