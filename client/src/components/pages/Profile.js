import React, { useState } from "react";
import portrait from "../images/portrait-philip-martin-unsplash.jpg";
import { Link } from "react-router-dom";
// import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import CommentForm from "./forms/CommentForm";
import PostForm from "./forms/PostForm";
// import Auth from '../utils/auth';

export default function Profile() {
  // const { profileId } = useParams();

  // If there is no `profileId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const [activeTab, setActiveTab] = useState("News");
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  const { loading, data } = useQuery(QUERY_ME);
  const profile = data?.me || {};
  console.log(data);

  if (loading) {
    return <h2>...loading</h2>;
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
                {profile.firstName} {profile.lastName}
              </h1>
              <h1 className="text-xl text-right font-bold mx-auto">
                {profile.city && profile.state && profile.country ? (
                  <>
                    {profile.city} {profile.state}
                  </>
                ) : (
                  <Link to="" className="btn btn-success">
                    edit location
                  </Link>
                )}
              </h1>
              <h1 className="text-xl text-right font-bold mx-auto">
                {profile.city && profile.state && profile.country ? (
                  <>{profile.country}</>
                ) : (
                  <></>
                )}
              </h1>
            </div>
            <div className="container mx-auto rounded-lg">
              <h1 className="text-5xl text-center font-bold mx-auto py-10">
                Pants
              </h1>
            </div>
          </div>
        </div>
        <div className="container flex flex-row content-center bg-base-200 rounded-lg">
          <div className="box m-10 text-left">
            <div className="m-2">
              <h1 className="text-2xl font-bold mx-auto">Skills</h1>
              <ul>
                {profile.skills ? (
                  profile.skills.map((skill) => (
                    <div className="btn btn-outline" key={skill._id}>
                      {skill.skillName}
                    </div>
                  ))
                ) : (
                  <button className="btn btn-success">add skills</button>
                )}
              </ul>
            </div>
            <div className="m-2">
              <h1 className="text-2xl font-bold mx-auto text-left">
                Communities
              </h1>
              <ul>
                {profile.groups ? (
                  profile.groups.map((group) => (
                    <li>
                      <div className="badge" key={group._id}>
                        {group.name}
                      </div>
                    </li>
                  ))
                ) : (
                  <button className="btn btn-success">add groups</button>
                )}
              </ul>
            </div>
          </div>

          <div className="container flex flex-col m-5">
            <div className="container h-72 rounded bg-base-200 m-5">
              <h1 className="text-xl text-center font-bold mx-auto py-6">
                About Me
              </h1>
              {profile.bio ? (
                <p className="text-center font-bold">{profile.bio}</p>
              ) : (
                <button className="btn btn-success">edit bio</button>
              )}
            </div>
            <div className="container h-72 rounded bg-base-200  m-5">
              <h1 className="text-xl text-center font-bold mx-auto py-6">
                Posts
              </h1>

              {profile.posts ? (
                profile.posts.map((post) => (
                  <div className="text-center font-bold" key={post._id}>
                    {post.postBody} {post._id}
                    <CommentForm postId={post._id} />
                  </div>
                ))
              ) : (
                <button className="btn btn-success">add Posts</button>
              )}
            </div>
          </div>

          <div className="box w-32 m-10 text-right bg-base-200 ">
            <div className="m-2">
              <h1 className="text-2xl font-bold mx-auto">Experience</h1>
              {profile.experience.company ? (
                <ul>
                  <li>
                    <div className="badge badge-primary">
                      {profile.experience.company}
                    </div>
                  </li>
                  <li>
                    <div className="badge badge-primary">
                      {profile.experience.title}
                    </div>
                  </li>
                  <li>
                    <div className="badge badge-primary">
                      {profile.experience.jobDescription}
                    </div>
                  </li>
                  <li>
                    <div className="badge badge-primary">
                      {profile.experience.startMonth}
                    </div>
                  </li>
                  <li>
                    <div className="badge badge-primary">
                      {profile.experience.startMonth}
                    </div>
                  </li>
                  <li>
                    <div className="badge badge-primary">
                      {profile.experience.current}
                    </div>
                  </li>
                  {profile.experience.current === true ? (
                    <>
                      {" "}
                      <li>
                        <div className="badge badge-primary">
                          {profile.experience.endMonth}
                        </div>
                      </li>
                      <li>
                        <div className="badge badge-primary">
                          {profile.experience.endYear}
                        </div>
                      </li>
                    </>
                  ) : (
                    <></>
                  )}
                </ul>
              ) : (
                <button className="btn btn-success">add experience</button>
              )}
            </div>
            <div className="m-2">
              <h1 className="text-2xl font-bold mx-auto">Education</h1>

              {profile.education.school ? (
                <ul>
                  <li>
                    <div className="badge badge-secondary">
                      {profile.education.school}
                    </div>
                  </li>
                  <li>
                    <div className="badge badge-secondary">
                      {profile.education.fieldOfStudy}
                    </div>
                  </li>
                  <li>
                    <div className="badge badge-secondary">
                      {profile.education.certificateType}
                    </div>
                  </li>
                  <li>
                    <div className="badge badge-secondary">
                      {profile.education.startMonth}
                    </div>
                  </li>
                  <li>
                    <div className="badge badge-secondary">
                      {profile.education.startYear}
                    </div>
                  </li>
                  <li>
                    <div className="badge badge-secondary">
                      {profile.education.current}
                    </div>
                  </li>
                </ul>
              ) : (
                <button className="btn btn-success">add Education</button>
              )}
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
      <div className="container mx-auto rounded"></div>
    </div>
  );
}
