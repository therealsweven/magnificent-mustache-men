import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { QUERY_USER, QUERY_ME } from "../../utils/queries";
import CommentForm from "./forms/CommentForm";

import Auth from "../../utils/auth";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("News");
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const { userId } = useParams();

  const { loading, data } = useQuery(userId ? QUERY_USER : QUERY_ME, {
    variables: { userId: userId },
  });

  const user = data?.me || data?.user || {};

  console.log(user);

  if (Auth.loggedIn() && Auth.getProfile().data._id === userId) {
    return <Navigate to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.firstName) {
    return <h4 className="text-center"> Please Login to View Profiles</h4>;
  }

  return (
    <div className="container mx-auto grid-cols-3 bg-base-100">
      <div className="container mx-auto rounded-lg">
        <button className="btn btn-circle text-3xl pb-1 my-2 connection-btn">
          +
        </button>
        <div className="h-15 bg-base-200 rounded-lg">
          <div className="flex-col rounded-lg">
            <img
              src={user.profPic}
              className="float-right m-5 max-w-xs max-h-72 rounded-lg shadow-2xl"
            />
            <div className="mx-auto">
              <h1 className="text-2xl text-right font-bold mx-auto"></h1>
              <h1 className="text-xl text-right font-bold mx-auto">
                {user.city && user.state && user.country ? (
                  <>
                    {user.city} {user.state}
                  </>
                ) : (
                  <Link to="" className="btn btn-success">
                    edit location
                  </Link>
                )}
              </h1>
              <h1 className="text-xl text-right font-bold mx-auto">
                {user.city && user.state && user.country ? (
                  <>{user.country}</>
                ) : (
                  <></>
                )}
              </h1>
            </div>
            <div className="container mx-auto rounded-lg">
              <h1 className="text-5xl text-center font-bold mx-auto py-10">
                {user.firstName} {user.lastName}
              </h1>
            </div>
          </div>
        </div>
        <div className="container flex flex-row content-center bg-base-200 rounded-lg">
          <div className="box m-10 text-left">
            <div className="m-2">
              <h1 className="text-2xl font-bold mx-auto">Skills</h1>
              <ul>
                {user.skills ? (
                  user.skills.map((skill) => (
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
                {user.groups ? (
                  user.groups.map((group) => (
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

              <p className="text-center font-bold">{user.bio}</p>
            </div>
            <div className="container h-72 rounded bg-base-200  m-5">
              <h1 className="text-xl text-center font-bold mx-auto py-6">
                Posts
              </h1>

              {user.posts ? (
                user.posts.map((post) => (
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
              {user.experience.company ? (
                <ul>
                  <li>
                    <div className="badge badge-primary">
                      {user.experience.company}
                    </div>
                  </li>
                  <li>
                    <div className="badge badge-primary">
                      {user.experience.title}
                    </div>
                  </li>
                  <li>
                    <div className="badge badge-primary">
                      {user.experience.jobDescription}
                    </div>
                  </li>
                  <li>
                    <div className="badge badge-primary">
                      {user.experience.startMonth}
                    </div>
                  </li>
                  <li>
                    <div className="badge badge-primary">
                      {user.experience.startMonth}
                    </div>
                  </li>
                  <li>
                    <div className="badge badge-primary">
                      {user.experience.current}
                    </div>
                  </li>
                  {user.experience === true ? (
                    <>
                      {" "}
                      <li>
                        <div className="badge badge-primary">
                          {user.experience.endMonth}
                        </div>
                      </li>
                      <li>
                        <div className="badge badge-primary">
                          {user.experience.endYear}
                        </div>
                      </li>
                    </>
                  ) : (
                    <></>
                  )}
                </ul>
              ) : (
                <button className="btn btn-success hidden">
                  add experience
                </button>
              )}
            </div>
            <div className="m-2">
              <h1 className="text-2xl font-bold mx-auto">Education</h1>

              {user.education.school ? (
                <ul>
                  <li>
                    <div className="badge badge-secondary">
                      {user.education.school}
                    </div>
                  </li>
                  <li>
                    <div className="badge badge-secondary">
                      {user.education.fieldOfStudy}
                    </div>
                  </li>
                  <li>
                    <div className="badge badge-secondary">
                      {user.education.certificateType}
                    </div>
                  </li>
                  <li>
                    <div className="badge badge-secondary">
                      {user.education.startMonth}
                    </div>
                  </li>
                  <li>
                    <div className="badge badge-secondary">
                      {user.education.startYear}
                    </div>
                  </li>
                  <li>
                    <div className="badge badge-secondary">
                      {user.education.current}
                    </div>
                  </li>
                </ul>
              ) : (
                <button className="btn btn-success hidden">
                  add Education
                </button>
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
