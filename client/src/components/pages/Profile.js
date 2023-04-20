import React, { useState } from "react";
import portrait from "../images/portrait-philip-martin-unsplash.jpg";
import background from "../images/bghome-alesia-kazantcev-unsplash.jpg";
// import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_PROFILES } from "../../utils/queries";

// import Auth from '../utils/auth';

export default function Profile() {
  // const { profileId } = useParams();

  // If there is no `profileId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const [activeTab, setActiveTab] = useState("News");
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  const { loading, data } = useQuery(QUERY_PROFILES);
  const profiles = data?.profiles || {};
  console.log(profiles, loading);
  const profDisplay = [];
  if (!loading) {
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


  return (
    <div className="container mx-auto grid-cols-3 bg-base-100">
      <div className="container mx-auto rounded-lg">
        <div className="h-15 bg-base-200 rounded-lg">
          <div className="flex-col rounded-lg">
            <img
              src={portrait}
              className="float-right m-5 max-w-xs max-h-72 rounded-lg shadow-2xl"
            />
            <div className="mx-auto">
              <h1 className="text-2xl text-right font-bold mx-auto">
                {/* {profile.firstName} {profile.lastName} */}
              </h1>
              <h1 className="text-xl text-right font-bold mx-auto">
                {/* {profile.city} {profile.state} {profile.country} */}
              </h1>
            </div>
            <div className="container mx-auto rounded-lg">
              <h1 className="text-5xl text-center font-bold mx-auto py-10">

              </h1>
            </div>
          </div>
        </div>
        <div className="container flex flex-row content-center bg-base-200 rounded-lg">
          <div className="box w-32 m-10 text-left">
            <div className="m-2">
              <h1 className="text-2xl font-bold mx-auto">Skills</h1>
              <ul>
                <li>
                  <div className="badge badge-primary">javascript</div>
                </li>
                <li>
                  <div className="badge badge-primary">leadership</div>
                </li>
                <li>
                  <div className="badge badge-primary">css</div>
                </li>
                <li>
                  <div className="badge badge-primary">rust</div>
                </li>
                <li>
                  <div className="badge badge-primary">blender</div>
                </li>
                <li>
                  <div className="badge badge-primary">mongodb</div>
                </li>
                <li>
                  <div className="badge badge-primary">css</div>
                </li>
              </ul>
            </div>
            <div className="m-2">
              <h1 className="text-2xl font-bold mx-auto text-left">
                Communities
              </h1>
              <ul>
                <li>
                  <div className="badge badge-secondary">leadership</div>
                </li>
                <li>
                  <div className="badge badge-secondary">css</div>
                </li>
                <li>
                  <div className="badge badge-secondary">javascript</div>
                </li>
                <li>
                  <div className="badge badge-secondary">rust</div>
                </li>
                <li>
                  <div className="badge badge-secondary">blender</div>
                </li>
                <li>
                  <div className="badge badge-secondary">mongodb</div>
                </li>
                <li>
                  <div className="badge badge-secondary">css</div>
                </li>
              </ul>
            </div>
          </div>

          <div className="container flex flex-col m-5">
            <div className="container h-72 rounded bg-base-200 m-5">
              <h1 className="text-xl text-center font-bold mx-auto py-6">
                About Me
              </h1>
              <p className="text-center font-bold">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
                voluptas ratione magni accusantium, adipisci vero.Lorem ipsum
                dolor sit amet consectetur adipisicing elit. Sed voluptas
                ratione magni accusantium, adipisci vero.Lorem ipsum dolor sit
                amet consectetur adipisicing elit. Sed voluptas ratione magni
                accusantium, adipisci vero.Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Sed voluptas ratione magni
                accusantium, adipisci vero.Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Sed voluptas ratione magni
                accusantium, adipisci vero.
              </p>
            </div>
            <div className="container h-72 rounded bg-base-200  m-5">
              <h1 className="text-xl text-center font-bold mx-auto py-6">
                Posts
              </h1>
              <p className="text-center font-bold">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
                voluptas ratione magni accusantium, adipisci vero.
              </p>
            </div>
          </div>

          <div className="box w-32 m-10 text-right bg-base-200 ">
            <div className="m-2">
              <h1 className="text-2xl font-bold mx-auto">Experience</h1>
              <ul>
                <li>
                  <div className="badge badge-primary">javascript</div>
                </li>
                <li>
                  <div className="badge badge-primary">leadership</div>
                </li>
                <li>
                  <div className="badge badge-primary">css</div>
                </li>
                <li>
                  <div className="badge badge-primary">rust</div>
                </li>
                <li>
                  <div className="badge badge-primary">blender</div>
                </li>
                <li>
                  <div className="badge badge-primary">mongodb</div>
                </li>
                <li>
                  <div className="badge badge-primary">css</div>
                </li>
              </ul>
            </div>
            <div className="m-2">
              <h1 className="text-2xl font-bold mx-auto">Education</h1>
              <ul>
                <li>
                  <div className="badge badge-secondary">leadership</div>
                </li>
                <li>
                  <div className="badge badge-secondary">css</div>
                </li>
                <li>
                  <div className="badge badge-secondary">javascript</div>
                </li>
                <li>
                  <div className="badge badge-secondary">rust</div>
                </li>
                <li>
                  <div className="badge badge-secondary">blender</div>
                </li>
                <li>
                  <div className="badge badge-secondary">mongodb</div>
                </li>
                <li>
                  <div className="badge badge-secondary">css</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className=" grid w-full justify-items-center">
        <button className="btn btn-accent m-5">View My Resume</button>
        <button className="btn btn-accent m-5">Add as Friend</button>
      </div>
      <div className="container mx-auto rounded flex flex-row">
        <div className="container flex flex-col rounded ">
          <div className="container rounded">
            <div className="tabs tabs-boxed mx-auto">
              <a
                className={
                  activeTab === "Communities" ? "tab tab-active" : "tab"
                }
                onClick={() => handleTabClick("Communities")}
              >
                Communities
              </a>

              <a
                className={activeTab === "News" ? "tab tab-active" : "tab"}
                onClick={() => handleTabClick("News")}
              >
                News
              </a>

              <a
                className={activeTab === "Jobs" ? "tab tab-active" : "tab"}
                onClick={() => handleTabClick("Jobs")}
              >
                Jobs
              </a>
            </div>
            <div
              id="Communities"
              className={
                activeTab === "Communities"
                  ? "rounded bg-base-200 h-72"
                  : "hidden"
              }
            >
              <h1 className="text-xl text-center font-bold mx-auto">
                COMMUNITIES:
              </h1>
              <p className="text-center font-bold">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
                voluptas ratione magni accusantium, adipisci vero.
              </p>
            </div>
            <div
              id="News"
              className={
                activeTab === "News" ? "rounded bg-base-200 h-72" : "hidden"
              }
            >
              <h1 className="text-xl text-center font-bold mx-auto">NEWS:</h1>
              <p className="text-center font-bold">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
                voluptas ratione magni accusantium, adipisci vero.
              </p>
            </div>
            <div
              id="Jobs"
              className={
                activeTab === "Jobs" ? "rounded bg-base-200 h-72" : "hidden"
              }
            >
              <h1 className="text-xl text-center font-bold mx-auto">JOBS:</h1>
              <p className="text-center font-bold">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
                voluptas ratione magni accusantium, adipisci vero.
              </p>
            </div>
          </div>
          <div className="container rounded">
            <div className="tabs tabs-boxed mx-auto">
              <a className="tab">Resume</a>

              <a className="tab tab-active">MyInfo</a>

              <a className="tab">Preferences</a>
            </div>
            <div className="rounded  bg-base-200 h-72">
              <h1 className="text-xl text-center font-bold mx-auto">
                About Me:
              </h1>
              <p className="text-center font-bold">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
                voluptas ratione magni accusantium, adipisci vero.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto rounded">03</div>
    </div>
  );
}
