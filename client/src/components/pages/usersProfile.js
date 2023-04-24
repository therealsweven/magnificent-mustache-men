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

  const { loading, data } = useQuery(QUERY_USER, {
    variables: { userId: userId },
  });

  const user =  data?.user || {};

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
                  <h1 className="text-xl text-right font-bold mx-auto">
                  Location not recorded
                </h1>
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
            
            <div className="mx-6">
      <h1 className="text-3xl font-bold mb-6 mt-5">Communities</h1>
      <div className="divider"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {user.groups.map((group) => (
          <div
            key={group._id}
            className="card flex flex-col justify-between rounded-md shadow-md overflow-hidden my-3 border bg-base-200"
          >
            <div className="card-header">
              <img
                src={group.profPic}
                alt="Group Logo"
                className="h-48 w-full object-cover"
              />
            </div>
            <div className="card-body">
              <h2 className="card-title text-2xl">{group.name}</h2>
              <p className="card-text">{group.description}</p>
            </div>
            <div className="card-footer flex justify-center my-3">
              <Link to={`/groups/${group._id}`}>
                <button className="btn btn-primary" to={`/${group._id}`}>
                  View Group
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>


<div className="container mx-auto rounded-lg flex flex-row" >
<h1 className="text-3xl font-bold mb-6 mt-5">Posts</h1>


    {user.posts ? 
    ( 
    user.posts.map((post) => ( 
    <div className="card w-96 bg-base-300 text-primary-content m-5">
  <div className="card-body">
    <h2 className="card-title">Posted {new Date(parseInt(post.createdAt)).toLocaleString()}</h2>
    <p>{post.postBody}</p>
    <div className="card-actions justify-center">
        <CommentForm postId={post._id} />
    </div>
  </div>
</div>)) ) : (<h1 className="text-xl text-right font-bold mx-auto">
                {user.firstName} doesn't have any posts.
                </h1> )}
</div>
          <div className="box w-32 m-10 text-right bg-base-200 ">
            <div className="m-2">
              <h1 className="text-2xl font-bold mx-auto">Experience</h1>
              {user.experience.length ? (

{user.posts ? 
  ( 
  {user.experience.map((exp) => ( 
  <div className="card w-96 bg-base-300 text-primary-content m-5">
<div className="card-body">
  <h2 className="card-title">{exp.company.name}</h2>
  <p>{exp.title}</p>
  <p>{exp.jobDescription}</p>
  <p>{exp.startMonth}</p>
  <p>{exp.startYear}</p>
  <p> Current: {exp.current === true ? "Yes" : "No"}</p>
{exp.current === false ? (
  <>
    <p className="text-xl">
      End Month: {exp.endMonth}
    </p>
    <p className="text-xl">
      End Year: {exp.endYear}
    </p>
    </> ) : ( <></> ) }
  <div className="card-actions justify-center">
  </div>
</div>
</div> ))} ) : ( <h1 className="text-xl text-right font-bold mx-auto">
              {user.firstName} doesn't have any experience recorded.
              </h1> )}
              
               
              {user.education.length ? (
                
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
          
          <div className="container mx-auto rounded-lg">
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
        </div>
      </div>
    </div>
    </div>
    
  )
}