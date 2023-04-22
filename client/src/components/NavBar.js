import { Link } from "react-router-dom";
import React, { useState } from "react";
import logo from "../components/images/Untitled design.png";
import placeholder from "../components/images/portrait-philip-martin-unsplash.jpg";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_PROFILES } from "../utils/queries";

export default function NavBar() {
  const { loading, data } = useQuery(QUERY_PROFILES);
  const profiles = data?.profiles || {};
  console.log(profiles, loading);
  const profDisplay = [];
  if (!loading && profiles.length) {
    profiles.forEach((profile) => {
      if (profile.user) {
        const prof = {
          type: "user",
          entityId: profile._id,
          name: profile.user.firstName + " " + profile.user.lastName,
        };
        profDisplay.push(prof);
      } else if (profile.school) {
        const prof = {
          type: "school",
          entityId: profile._id,
          name: profile.school.name,
        };
        profDisplay.push(prof);
      } else if (profile.company) {
        const prof = {
          type: "company",
          entityId: profile._id,
          name: profile.company.name,
        };
        profDisplay.push(prof);
      }
    });
    console.log(profDisplay);
  }
  // Auth.profileSwitch(type, entity);
  const [type, setType] = useState();
  const [entity, setEntity] = useState();
  if (type && entity) {
    Auth.profileSwitch(type, entity);
  }

  return (
    <>
      <div className="navbar bg-base-300">
        <div className="flex-1">
          <img className=" mx-3 rounded h-11 " src={logo} />
          <Link
            to="/profile"
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
                <Link to="/profile">My Profile</Link>
              </li>
              <li>
                <div className="dropdown dropdown-left">
                  <label tabIndex={0} className="">
                    Switch Profiles
                  </label>
                  {}
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box"
                  >
                    <>
                      {profDisplay.map((prof) => (
                        <li>
                          <div>
                            <label
                              tabIndex={0}
                              className="btn btn-ghost w-14 btn btn-circle avatar"
                            >
                              <div className="w-14  rounded-full">
                                {/* Profile images*/}
                                <img src={placeholder} />
                              </div>
                            </label>
                            <div
                              className="btn btn-ghost"
                              onClick={() => {
                                setType(prof.type);
                                setEntity(prof.entityId);
                                console.log(type);
                                console.log(entity);
                              }}
                              key={prof.entityId}
                            >
                              <p>
                                {prof.type !== "user" ? prof.type + " - " : ""}{" "}
                                {prof.name}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </>
                  </ul>
                </div>
              </li>
              <li>
                <Link to="/company">Companies</Link>
              </li>
              <li>
                <Link to="/jobPost">Jobs</Link>
              </li>
              <li>
                <Link to="#">Settings</Link>
              </li>
              <li>
                <Link to="/" onClick={() => Auth.logout()}>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
