import React, { useState, useEffect } from "react";
import portrait from "../images/portrait-philip-martin-unsplash.jpg";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import CommentForm from "./forms/CommentForm";
import PostForm from "./forms/PostForm";
import ReactionForm from "./forms/ReactionForm";
import { REMOVE_SKILL } from "../../utils/mutations";
import ExperienceForm from "./forms/ExperienceForm";
import EditExperienceForm from "./forms/EditExperienceForm";
import EducationForm from "./forms/EducationForm";
import EditEducationForm from "./forms/EditEducationForm";
import GroupForm from "./forms/GroupForm";
import EditGroupForm from "./forms/EditGroupForm";
import AddSkill from "./forms/AddSkill";
import UserInfoForm from "./forms/UserInfoForm";
import CommentReactionForm from "./forms/CommentReaction";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("About Me");
  const [removeSkill] = useMutation(REMOVE_SKILL);
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  const [removeSwitch, setRemoveSwitch] = useState(false);

  const [isEditing, setIsEditing] = useState("");
  const handleEditClick = (formName) => {
    setIsEditing(formName);
  };

  const handleRender = () => {
    refetch();
  };

  const handleRemove = async ({ skillId }) => {
    try {
      console.log(skillId);
      await removeSkill({
        variables: {
          skillId: skillId,
        },
      });
      handleRender();
    } catch (err) {
      console.error(err);
    }
  };

  const { loading, data, refetch } = useQuery(QUERY_ME);
  const profile = data?.me || {};
  console.log(profile);

  if (loading) {
    return <h2>...loading</h2>;
  }

  if (!loading) {
    return (
      <div className="container mx-auto grid-cols-3 bg-base-100">
        <div className="container mx-auto rounded-lg">
          <div className="h-15 bg-base-200 rounded-lg">
            <div className="flex-col rounded-lg">
              <img
                src={profile.profPic}
                className="float-right m-5 max-w-xs max-h-72 rounded-lg shadow-2xl"
              />
              <div className="mx-auto">
                <h1 className="text-2xl text-right font-bold mx-auto"></h1>
                <h1 className="text-xl text-right font-bold mx-auto">
                  {profile.city && profile.state && profile.country ? (
                    <>
                      {profile.city} {profile.state}
                    </>
                  ) : (
                    <h1 className="text-xl text-right font-bold mx-auto">
                      Update your location in the About Me section
                    </h1>
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
              <h2 className="text-xl text-center italic mx-auto py-10">{profile.bio}</h2>
                <h1 className="text-5xl text-left font-bold py-10">
                  {profile.firstName} {profile.lastName}
                </h1>
              </div>
            </div>
          </div>
          <div className="container flex flex-row content-center bg-base-200 rounded-lg">
            <div className="container flex flex-col rounded ">
              <div className="container rounded">
                <div className="tabs tabs-boxed mx-auto">
                  <a
                    className={
                      activeTab === "About Me" ? "tab tab-active" : "tab"
                    }
                    onClick={() => handleTabClick("About Me")}
                  >
                    About Me
                  </a>
                  <a
                    className={
                      activeTab === "Experience" ? "tab tab-active" : "tab"
                    }
                    onClick={() => handleTabClick("Experience")}
                  >
                    Experience
                  </a>

                  <a
                    className={
                      activeTab === "Education" ? "tab tab-active" : "tab"
                    }
                    onClick={() => handleTabClick("Education")}
                  >
                    Education
                  </a>

                  <a
                    className={
                      activeTab === "Skills" ? "tab tab-active" : "tab"
                    }
                    onClick={() => handleTabClick("Skills")}
                  >
                    Skills
                  </a>
                  <a
                    className={
                      activeTab === "Communites" ? "tab tab-active" : "tab"
                    }
                    onClick={() => handleTabClick("Communities")}
                  >
                    Communities
                  </a>
                  <a
                    className={activeTab === "Posts" ? "tab tab-active" : "tab"}
                    onClick={() => handleTabClick("Posts")}
                  >
                    Posts
                  </a>
                </div>
                <div
                  id="About Me"
                  className={
                    activeTab === "About Me"
                      ? "rounded bg-base-300 border-2 border-slate-700 w-2/3 mx-auto"
                      : "hidden"
                  }
                >
                  <h1 className="text-xl text-center font-bold mx-auto py-6">
                    About Me
                  </h1>
                  {profile.bio ? (
                    <>
                      <p className="text-left font-bold">City: {profile.city}</p>
                      <p className="text-left font-bold">State: {profile.state}</p>
                      <p className="text-left font-bold">Country: {profile.country}</p>
                      <p className="text-left font-bold">Banner: {profile.bio}</p>
                      <button
                        onClick={() => handleEditClick("UserInfoForm")}
                        className="m-5 btn btn-success"
                      >
                        edit
                      </button>
                      <div
                        className={
                          isEditing === "UserInfoForm"
                            ? "rounded bg-base-300 border-2 border-slate-700 mx-auto w-2/3"
                            : "hidden"
                        }
                      >
                        <UserInfoForm
                          initialValues={{
                            city: profile.city,
                            state: profile.state,
                            country: profile.country,
                            bio: profile.bio,
                          }}
                        />
                        <button
                          onClick={() => handleEditClick("")}
                          className="m-5 btn btn-success"
                        >
                          close
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditClick("UserInfoForm")}
                        className="m-5 btn btn-success"
                      >
                        edit
                      </button>
                      <div
                        className={
                          isEditing === "UserInfoForm"
                            ? "rounded bg-base-300 border-2 border-slate-700 mx-auto w-2/3"
                            : "hidden"
                        }
                      >
                        <UserInfoForm
                          initialValues={{
                            city: profile.city,
                            state: profile.state,
                            country: profile.country,
                            bio: profile.bio,
                          }}
                        />
                        <button
                          onClick={() => handleEditClick("")}
                          className="m-5 btn btn-success"
                        >
                          close
                        </button>
                      </div>
                    </>
                  )}
                </div>
                <div
                  id="Experience"
                  className={
                    activeTab === "Experience"
                      ? "rounded bg-base-300 border-2 border-slate-700 mx-auto w-2/3"
                      : "hidden"
                  }
                >
                  <h1 className="text-xl text-center font-bold mx-auto py-6">
                    Experience:
                  </h1>
                  <div className="m-2">
                    {profile.experience && profile.experience.length ? (
                      <>
                        {profile.experience.map((exp) => (
                          <>
                          
                          <div className="card w-96 bg-base-200 text-primary-content m-5">
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
                            <button
                              onClick={() => handleEditClick(exp._id)}
                              className="m-5 btn btn-success"
                            >
                              edit
                            </button>

                            <div
                              className={
                                isEditing === exp._id
                                  ? "rounded bg-base-300 border-2 border-slate-700 mx-auto w-2/3"
                                  : "hidden"
                              }
                            >
                              <EditExperienceForm
                                initialValues={{
                                  expId: exp._id,
                                  company: exp.name,
                                  title: exp.title,
                                  jobDescription: exp.jobDescription,
                                  startMonth: exp.startMonth,
                                  startYear: exp.startYear,
                                  current: exp.current,
                                  endMonth: exp.endMonth,
                                  endYear: exp.endYear,
                                }}
                              />
                              <button
                                onClick={() => handleEditClick("")}
                                className="m-5 btn btn-success"
                              >
                                close
                              </button>
                            </div>
                          </>
                        ))}
                        <button
                          onClick={() => handleEditClick("ExperienceForm")}
                          className="m-5 btn btn-success"
                        >
                          add
                        </button>
                        <div
                          className={
                            isEditing === "ExperienceForm"
                              ? "rounded bg-base-300 border-2 border-slate-700 mx-auto w-2/3"
                              : "hidden"
                          }
                        >
                          <ExperienceForm />
                          <button
                            onClick={() => handleEditClick("")}
                            className="m-5 btn btn-success"
                          >
                            close
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditClick("ExperienceForm")}
                          className="m-5 btn btn-success"
                        >
                          add
                        </button>
                        <div
                          className={
                            isEditing === "ExperienceForm"
                              ? "rounded bg-base-300 border-2 border-slate-700"
                              : "hidden"
                          }
                        >
                          <ExperienceForm />
                          <button
                            onClick={() => handleEditClick("")}
                            className="m-5 btn btn-success"
                          >
                            close
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div
                  id="Education"
                  className={
                    activeTab === "Education"
                      ? "rounded bg-base-300 border-2 border-slate-700 mx-auto w-2/3"
                      : "hidden"
                  }
                >
                  <h1 className="text-xl text-center font-bold mx-auto py-6">
                    Education:
                  </h1>
                  <div className="m-2">
                    {profile.education && profile.education.length ? (
                      <>
                        {profile.education.map((edu) => (
                          <>
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
                            <button
                              onClick={() => handleEditClick(edu._id)}
                              className="m-5 btn btn-success"
                            >
                              edit
                            </button>
                            <div
                              className={
                                isEditing === edu._id
                                  ? "rounded bg-base-300 border-2 border-slate-700 mx-auto w-2/3"
                                  : "hidden"
                              }
                            >
                              <EditEducationForm
                                initialValues={{
                                  eduId: edu._id,
                                  school: edu.school.name,
                                  fieldOfStudy: edu.fieldOfStudy,
                                  certificateType: edu.certificateType,
                                  startMonth: edu.startMonth,
                                  startYear: edu.startYear,
                                  current: edu.current,
                                  endMonth: edu.endMonth || "",
                                  endYear: edu.endYear || "",
                                }}
                              />
                              <button
                                onClick={() => handleEditClick("")}
                                className="btn btn-success mx-auto"
                              >
                                close
                              </button>
                            </div>
                          </>
                        ))}
                        <button
                          onClick={() => handleEditClick("EducationForm")}
                          className="m-5 btn btn-success"
                        >
                          add
                        </button>
                        <div
                          className={
                            isEditing === "EducationForm"
                              ? "rounded bg-base-300 border-2 border-slate-700 mx-auto w-2/3"
                              : "hidden"
                          }
                        >
                          <EducationForm />
                          <button
                            onClick={() => handleEditClick("")}
                            className="m-5 btn btn-success"
                          >
                            close
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditClick("EducationForm")}
                          className="m-5 btn btn-success"
                        >
                          add
                        </button>
                        <div
                          className={
                            isEditing === "EducationForm"
                              ? "rounded bg-base-300 border-2 border-slate-700 mx-auto w-2/3"
                              : "hidden"
                          }
                        >
                          <EducationForm />
                          <button
                            onClick={() => handleEditClick("")}
                            className="m-5 btn btn-success"
                          >
                            close
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div
                  id="Skills"
                  className={
                    activeTab === "Skills"
                      ? "rounded bg-base-300 border-2 border-slate-700 mx-auto w-2/3"
                      : "hidden"
                  }
                >
                  <h1 className="text-xl text-center font-bold mx-auto py-6">
                    Skills
                  </h1>
                  <div className="m-2">
                    {profile.skills && profile.skills.length ? (
                      <>
                        {profile.skills.map((skill) => (
                          <button
                            className="btn btn-outline"
                            skillId={skill._id}
                            key={skill._id}
                            onClick={
                              removeSwitch
                                ? () => handleRemove({ skillId: skill._id })
                                : null
                            }
                          >
                            {removeSwitch ? (
                              <>Click to Remove {skill.skillName} </>
                            ) : (
                              <> {skill.skillName} </>
                            )}
                          </button>
                        ))}

                        <button
                          onClick={() => handleEditClick("SkillForm")}
                          className="m-5 btn btn-success"
                        >
                          add
                        </button>
                        <div
                          className={
                            isEditing === "SkillForm"
                              ? "rounded bg-base-300 border-2 border-slate-700 mx-auto w-2/3"
                              : "hidden"
                          }
                        >
                          <AddSkill />
                          <button
                            onClick={() => handleEditClick("")}
                            className="m-5 btn btn-success"
                          >
                            close
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditClick("AddSkill")}
                          className="m-5 btn btn-success"
                        >
                          add
                        </button>
                        <div
                          className={
                            isEditing === "AddSkill"
                              ? "rounded bg-base-300 border-2 border-slate-700 mx-auto w-2/3"
                              : "hidden"
                          }
                        >
                          <AddSkill />
                          <button
                            onClick={() => handleEditClick("")}
                            className="m-5 btn btn-success"
                          >
                            close
                          </button>
                        </div>
                      </>
                    )}
                    <label className="label">
                      <span className="label-text">
                        {removeSwitch
                          ? "Skillswitch Engaged"
                          : "Skillswitch Disengaged"}
                      </span>
                    </label>
                    <input
                      type="radio"
                      name="radio-8"
                      className="radio radio-error"
                      checked={!removeSwitch}
                      onChange={() => setRemoveSwitch(false)}
                    />
                    <input
                      type="radio"
                      name="radio-8"
                      className="radio radio-error"
                      checked={removeSwitch}
                      onChange={() => setRemoveSwitch(true)}
                    />
                  </div>
                </div>

                <div
                  id="Communities"
                  className={
                    activeTab === "Communities"
                      ? "rounded bg-base-300 border-2 border-slate-700 mx-auto w-2/3"
                      : "hidden"
                  }
                >
                  <h1 className="text-xl text-center font-bold mx-auto py-6">
                    Communities
                  </h1>
                  <div className="m-2">
                    {profile.groups && profile.groups.length ? (
                      <>
                        {profile.groups.map((group) => (
                          <>
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
                            <button
                              onClick={() => handleEditClick(group._id)}
                              className="m-5 btn btn-success"
                            >
                              edit
                            </button>
                            <div
                              className={
                                isEditing === group._id
                                  ? "rounded bg-base-300 border-2 border-slate-700 mx-auto w-2/3"
                                  : "hidden"
                              }
                            >
                              <EditGroupForm
                                initialValues={{
                                  name: group.name,
                                  private: group.private,
                                  joinQuestion: group.joinQuestion,
                                }}
                              />
                              <button
                                onClick={() => handleEditClick("")}
                                className="m-5 btn btn-success"
                              >
                                close
                              </button>
                            </div>
                          </>
                        ))}
                        <button
                          onClick={() => handleEditClick("GroupForm")}
                          className="m-5 btn btn-success"
                        >
                          add
                        </button>
                        <div
                          className={
                            isEditing === "GroupForm"
                              ? "rounded bg-base-300 border-2 border-slate-700 mx-auto w-2/3"
                              : "hidden"
                          }
                        >
                          <GroupForm />
                          <button
                            onClick={() => handleEditClick("")}
                            className="m-5 btn btn-success"
                          >
                            close
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditClick("GroupForm")}
                          className="m-5 btn btn-success"
                        >
                          add
                        </button>
                        <div
                          className={
                            isEditing === "GroupForm"
                              ? "rounded bg-base-300 border-2 border-slate-700 mx-auto w-2/3"
                              : "hidden"
                          }
                        >
                          <GroupForm />
                          <button
                            onClick={() => handleEditClick("")}
                            className="m-5 btn btn-success"
                          >
                            close
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div
                  id="Posts"
                  className={
                    activeTab === "Posts"
                      ? "mx-auto container rounded bg-base-300 border-2 border-slate-700 w-2/3"
                      : "hidden"
                  }
                >
                  <div className="col-span-3 row-span-8 bg-base-300 rounde-lg h-min-44 m-6 mt-2 ml-10">
                    <div className="m-4">
                      <PostForm />
                    </div>
                    <div className="Feed-Containter grid grid-cols-1 bg-base-300 overflow-scroll max-h-screen  rounded p-4">
                      {profile.posts.map((post) => (
                        <div className="Card  bg-base-100 shadow-xl p-5 m-4 rounded">
                          <div className="avatar">
                            <div className="w-12 rounded-full">
                              <img
                                src={
                                  post.entity.user
                                    ? post.entity.user.profPic
                                    : post.entity.company
                                    ? post.entity.company.profPic
                                    : post.entity.school
                                    ? post.entity.school.profPic
                                    : "https://png.pngtree.com/png-vector/20190221/ourlarge/pngtree-female-user-vector-avatar-icon-png-image_691506.jpg"
                                }
                              />
                            </div>
                            <h2 className="card-title text-center ml-5">
                              {post.entity.user
                                ? post.entity.user.firstName +
                                  " " +
                                  post.entity.user.lastName
                                : post.entity.company
                                ? post.entity.company.name
                                : post.entity.school
                                ? post.entity.school.name
                                : "User Not Found"}
                            </h2>
                          </div>

                          <p className="bg-base-300  rounded p-5 my-2">
                            {post.postBody}
                          </p>
                          <span className="label-text flex justify-end">
                            {new Date(
                              parseInt(post.createdAt)
                            ).toLocaleString()}
                          </span>
                          <div className="flex justify-end">
                            <ReactionForm postId={post._id} />
                          </div>
                          <div>
                            <h2>Comments:</h2>
                            {post.comments.map((comment) => (
                              <div className="Card  bg-base-100 shadow-xl p-5 m-4 rounded-lg">
                                <div className="avatar">
                                  <div className="w-12 rounded-full">
                                    <img
                                      src={
                                        comment.entity.user
                                          ? comment.entity.user.profPic
                                          : comment.entity.company
                                          ? comment.entity.company.profPic
                                          : comment.entity.school
                                          ? comment.entity.school.profPic
                                          : "https://png.pngtree.com/png-vector/20190221/ourlarge/pngtree-female-user-vector-avatar-icon-png-image_691506.jpg"
                                      }
                                    />
                                  </div>
                                  <h2 className="card-title text-center ml-5">
                                    {comment.entity.user
                                      ? comment.entity.user.firstName +
                                        " " +
                                        comment.entity.user.lastName
                                      : comment.entity.company
                                      ? comment.entity.company.name
                                      : comment.entity.school
                                      ? comment.entity.school.name
                                      : "User Not Found"}
                                  </h2>
                                </div>
                                <p className="bg-base-300 rounded p-5 my-2">
                                  {comment.commentBody}
                                </p>
                                <span className="label-text flex justify-end">
                                  {new Date(
                                    parseInt(post.createdAt)
                                  ).toLocaleString()}
                                </span>
                                <div className="flex justify-end ">
                                  <CommentReactionForm
                                    commentId={comment._id}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                          <div>
                            <CommentForm postId={post._id} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
