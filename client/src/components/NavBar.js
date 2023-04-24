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
 

  const profDisplay = [];

  if (!loading) {
    profiles.forEach((profile) => {
      if (profile.user) {
        const prof = {
          type: "user",
          entityId: profile._id,
          name: profile.user.firstName + " " + profile.user.lastName,
          profPic: profile.user.profPic || "https://png.pngtree.com/png-vector/20190221/ourlarge/pngtree-female-user-vector-avatar-icon-png-image_691506.jpg",
        };
        profDisplay.push(prof);
      } else if (profile.school) {
        const prof = {
          type: "school",
          entityId: profile._id,
          name: profile.school.name,
          profPic: profile.user.profPic || "https://png.pngtree.com/png-vector/20190221/ourlarge/pngtree-female-user-vector-avatar-icon-png-image_691506.jpg",
        };
        profDisplay.push(prof);
      } else if (profile.company) {
        const prof = {
          type: "company",
          entityId: profile._id,
          name: profile.company.name,
          profPic: profile.company.profPic,
        };
        profDisplay.push(prof);
      }
    });
  }
  // Auth.profileSwitch(type, entity);
  const [type, setType] = useState();
  const [entity, setEntity] = useState();
  if (type && entity) {
    Auth.profileSwitch(type, entity);
  }
  if (loading) {
    return <h2>...loading</h2>;
  }
  if (!loading) {
    return (
      <>
        <div className="navbar bg-base-300">
          <div className="flex-1">
            <img className=" mx-3 rounded h-11 " src={logo} />
            <Link
              to="/myDashboard"
              className="btn btn-ghost normal-case text-xl font-titilliumWeb"
            >
              enCoded
            </Link>
          </div>

          <div className="flex-none gap-2">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  {/* Menu Dropdown*/}
                  <img
                    src={
                      profDisplay.length ? (
                        profDisplay[0].profPic
                      ) : (
                        <h2>...loading</h2>
                      )
                    }
                  />
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

                    <ul
                      tabIndex={0}
                      className="dropdown-content menu p-2 shadow bg-base-100 rounded-box"
                    >
                      <>
                        {profDisplay.length ? (
                          profDisplay.map((prof) => (
                            <li>
                              <div>
                                <label
                                  tabIndex={0}
                                  className="btn btn-ghost w-14 btn btn-circle avatar"
                                >
                                  <div className="w-14  rounded-full">
                                    {/* Profile images*/}
                                    <img src={prof.profPic} />
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
                                  <p className="w-72">
                                    {prof.type !== "user"
                                      ? prof.type + " - "
                                      : ""}
                                    {prof.name}
                                  </p>
                                </div>
                              </div>
                            </li>
                          ))
                        ) : (
                          <h2>...loading</h2>
                        )}
                      </>
                    </ul>
                  </div>
                </li>
                <li>
                  <Link to="/myDashboard">My DashBoard</Link>
                </li>
                <li>
                  <Link to="/company">Companies</Link>
                </li>
                <li>
                  <Link to="/jobPost">Jobs</Link>
                </li>
                <li>
                  <Link to="/profiles">Make Connections</Link>
                </li>
                <li>
                  <Link to="/activeCommunities">Communities</Link>
                </li>
                <li>
                  <Link to="/settings">Settings</Link>
                </li>
                <li>
                  <Link to="/" onClick={() => Auth.logout()}>
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
            <div className="divider divider-horizontal"></div>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-square m-1">
                {" "}
                +{" "}
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <Link
                  className="m-3 p-3 bg-base-300 rounded"
                  to="/createCompany"
                >
                  Create a Company
                </Link>
                <Link className="m-3 p-3 bg-base-300 rounded" to="/createGroup">
                  Create a Group
                </Link>
                <Link
                  className="m-3 p-3 bg-base-300 rounded"
                  to="/createSchool"
                >
                  Create a School
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  }
}
