import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { QUERY_USER, QUERY_ME } from "../../utils/queries";
import CommentForm from "./forms/CommentForm";
import { useMutation } from "@apollo/client"
import { ADD_CONNECTION } from "../../utils/mutations"
import Auth from "../../utils/auth";

export default function Profile() {
  const [addConnection] = useMutation(ADD_CONNECTION);
  const [buttonClicked, setButtonClicked] = useState({});

  const { userId } = useParams();

  const { loading, data } = useQuery(QUERY_USER, {
    variables: { userId: userId },
  });
  
  const handleConnect = async (e) => {
    const userId = e.target.id;
    await addConnection({
      variables: {
        connectionId: userId,
      },
    });
    setButtonClicked((prevButtonClicked) => ({
      ...prevButtonClicked,
      [userId]: true,
    }));
  };

  const user = data?.user || {};

  console.log(user);

  if (Auth.loggedIn() && Auth.getProfile().data._id === userId) {
    return <Navigate to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!Auth.loggedIn()) {
    return <h4 className="text-center"> Please Login to View Profiles</h4>;
  }

  return (
    <div className="container mx-auto grid-cols-3 bg-base-100">
      <div className="container mx-auto rounded-lg">
      <button
                  id={user._id}
                  className={`px-4 py-2 text-white font-semibold rounded-md transition-colors ${
                    buttonClicked[user._id]
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                  onClick={handleConnect}
                  disabled={buttonClicked[user._id]}
                >
                  {buttonClicked[user._id] ? "Connected" : "Connect"}
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
              <div className="divider" />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {user.groups.map((group) => (
                  <div
                    key={group._id}
                    className="card flex flex-col justify-between rounded-md shadow-md overflow-hidden my-3 border bg-base-300"
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
                        <button
                          className="btn btn-primary"
                          to={`/${group._id}`}
                        >
                          View Group
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="m-2">
              <h1 className="text-2xl font-bold mx-auto">Posts</h1>
              <div className="divider" />
              <div className="flex flex-row">
              {user.posts ? (
                user.posts.map((post) => (
                  <div className="card w-96 bg-base-300 text-primary-content m-5">
                    <div className="card-body">
                      <h2 className="card-title">{post.postBody}</h2>
                      <p>posted {new Date(parseInt(post.createdAt)).toLocaleString()}</p>
                      <div className="card-actions justify-center">
                        <CommentForm postId={post._id} />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <h1 className="text-xl text-right font-bold mx-auto">
                  {user.firstName} doesn't have any posts.
                </h1>
              )}
              </div>
            </div>

            <div className="m-2">
              <h1 className="text-2xl font-bold mx-auto">Experience</h1>
              <div className="divider" />
              {user.experience.length ? (
                user.experience.map((exp) => (
                  <div className="card w-96 bg-base-300 text-primary-content m-5">
                    <figure>
                      <img src={exp.company.profPic} alt="company photo" />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">{exp.company.name}</h2>
                      <p>Title: {exp.title}</p>
                      <p>Job Description: {exp.jobDescription}</p>
                      <p>Start Month: {exp.startMonth}</p>
                      <p>Start Year: {exp.startYear}</p>
                      <p> Current: {exp.current === true ? "Yes" : "No"}</p>
                      {exp.current === false ? (
                        <>
                          <p className="text-xl">End Month: {exp.endMonth}</p>
                          <p className="text-xl">End Year: {exp.endYear}</p>
                        </>
                      ) : (
                        <></>
                      )}
                      <Link
                        to={`/companyProfile/:${exp.company._id}`}
                        className="btn btn-primary justify-center"
                      >
                        View Company
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <h1 className="text-xl text-right font-bold mx-auto">
                  {user.firstName} doesn't have any experience recorded.
                </h1>
              )}
              <div className="m-2">
                <h1 className="text-2xl font-bold mx-auto">Education</h1>
                <div className="divider" />
                {user.education.length ? (
                  user.education.map((edu) => (
                    <div className="card w-96 bg-base-300 text-primary-content m-5">
                      <figure>
                        <img src={edu.profPic} alt="education photo" />
                      </figure>
                      <div className="card-body">
                        <h2 className="card-title">{edu.school.name}</h2>
                        <p>Field of Study: {edu.fieldOfStudy}</p>
                        <p>Certificate Type: {edu.jobDescription}</p>
                        <p>Start Month: {edu.startMonth}</p>
                        <p>Start Year: {edu.startYear}</p>
                        <p> Current: {edu.current === true ? "Yes" : "No"}</p>
                        {edu.current === false ? (
                          <>
                            <p className="text-xl">End Month: {edu.endMonth}</p>
                            <p className="text-xl">End Year: {edu.endYear}</p>
                          </>
                        ) : (
                          <></>
                        )}
                        <Link
                          to={`/educationProfile/:${edu._id}`}
                          className="btn btn-primary justify-center"
                        >
                          View Education
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <h1 className="text-xl text-right font-bold mx-auto">
                    {user.firstName} doesn't have any education recorded.
                  </h1>
                )}
              </div>
              <div className="container content-center bg-base-200 rounded-lg">
                <div className="m-2">
                  <h1 className="text-2xl font-bold mx-auto">Skills</h1>
                  <div className="divider" />
                  {user.skills ? (
                    user.skills.map((skill) => (
                      <div className="btn btn-outline" key={skill._id}>
                        {skill.skillName}
                      </div>
                    ))
                  ) : (
                    <h1 className="text-xl text-right font-bold mx-auto">
                      {user.firstName} doesn't have any skills mentioned.
                    </h1>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
