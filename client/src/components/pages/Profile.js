import React, { useState } from "react";
import portrait from "../images/portrait-philip-martin-unsplash.jpg";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import CommentForm from "./forms/CommentForm";
import PostForm from "./forms/PostForm";
import ReactionForm from "./forms/ReactionForm";
import { UPDATE_USER_TEST } from "../../utils/mutations";
import ExperienceForm from "./forms/ExperienceForm";
import EditExperienceForm from "./forms/EditExperienceForm";
import EducationForm from "./forms/EducationForm";
import EditEducationForm from "./forms/EditEducationForm";
import GroupForm from "./forms/GroupForm";
import EditGroupForm from "./forms/EditGroupForm";
import AddSkill from "./forms/AddSkill";
import UserInfoForm from "./forms/UserInfoForm";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("About Me");
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const [isEditing, setIsEditing] = useState("");
  const handleEditClick = (formName) => {
    setIsEditing(formName);
  };

  const { loading, data } = useQuery(QUERY_ME);
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
                <h1 className="text-2xl text-right font-bold mx-auto">
                  {profile.firstName} {profile.lastName}
                </h1>
                <h1 className="text-xl text-right font-bold mx-auto">
                  {profile.city && profile.state && profile.country ? (
                    <>
                      {profile.city} {profile.state}
                    </>
                  ) : (
                    <h1 className="text-xl text-right font-bold mx-auto">
                      update your location in the about me section!
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
                <h1 className="text-5xl text-center font-bold mx-auto py-10">
                  Pants
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
                    activeTab === "About Me" ? "rounded bg-base-200" : "hidden"
                  }
                >
                  <h1 className="text-xl text-center font-bold mx-auto py-6">
                    About Me
                  </h1>
                  {profile.bio ? (
                    <>
                      <p className="text-center font-bold">{profile.bio}</p>
                      <button
                        onClick={() => handleEditClick("UserInfoForm")}
                        className="btn btn-success"
                      >
                        edit
                      </button>
                      <div
                        className={
                          isEditing === "UserInfoForm"
                            ? "rounded bg-base-200"
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
                          className="btn btn-success"
                        >
                          close
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditClick("UserInfoForm")}
                        className="btn btn-success"
                      >
                        edit
                      </button>
                      <div
                        className={
                          isEditing === "UserInfoForm"
                            ? "rounded bg-base-200"
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
                          className="btn btn-success"
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
                      ? "rounded bg-base-200"
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
                            <div className="btn">{exp.company.name}</div>
                            <div className="btn">{exp.title}</div>
                            <div className="btn">{exp.jobDescription}</div>
                            <div className="btn">{exp.startMonth}</div>
                            <div className="btn">{exp.startYear}</div>
                            <div className="btn">{exp.current}</div>

                            {exp.current === true ? (
                              <>
                                <div className="btn">{exp.endMonth}</div>
                                <div className="btn">{exp.endYear}</div>
                              </>
                            ) : (
                              <></>
                            )}

                            <button
                              onClick={() => handleEditClick(exp._id)}
                              className="btn btn-success"
                            >
                              edit
                            </button>

                            <div
                              className={
                                isEditing === exp._id
                                  ? "rounded bg-base-200"
                                  : "hidden"
                              }
                            >
                              <EditExperienceForm
                                initialValues={{
                                  company: exp.company.name,
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
                                className="btn btn-success"
                              >
                                close
                              </button>
                            </div>
                          </>
                        ))}
                        <button
                          onClick={() => handleEditClick("ExperienceForm")}
                          className="btn btn-success"
                        >
                          add
                        </button>
                        <div
                          className={
                            isEditing === "ExperienceForm"
                              ? "rounded bg-base-200"
                              : "hidden"
                          }
                        >
                          <ExperienceForm />
                          <button
                            onClick={() => handleEditClick("")}
                            className="btn btn-success"
                          >
                            close
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditClick("ExperienceForm")}
                          className="btn btn-success"
                        >
                          add
                        </button>
                        <div
                          className={
                            isEditing === "ExperienceForm"
                              ? "rounded bg-base-200"
                              : "hidden"
                          }
                        >
                          <ExperienceForm />
                          <button
                            onClick={() => handleEditClick("")}
                            className="btn btn-success"
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
                    activeTab === "Education" ? "rounded bg-base-200" : "hidden"
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
                            <div className="btn btn-secondary">
                              {edu.school.name}
                            </div>
                            <div className="btn btn-secondary">
                              {edu.fieldOfStudy}
                            </div>

                            <div className="btn btn-secondary">
                              {edu.certificateType}
                            </div>

                            <div className="btn btn-secondary">
                              {edu.startMonth}
                            </div>
                            <div className="btn btn-secondary">
                              {edu.startYear}
                            </div>
                            <div className="btn btn-secondary">
                              {edu.current}
                            </div>

                            {edu.current === true ? (
                              <>
                                <div className="btn btn-secondary">
                                  {edu.endMonth}
                                </div>
                                <div className="btn btn-secondary">
                                  {edu.endYear}
                                </div>
                              </>
                            ) : (
                              <></>
                            )}
                            <button
                              onClick={() => handleEditClick(edu._id)}
                              className="btn btn-success"
                            >
                              edit
                            </button>
                            <div
                              className={
                                isEditing === edu._id
                                  ? "rounded bg-base-200"
                                  : "hidden"
                              }
                            >
                              <EditEducationForm
                                initialValues={{
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
                                className="btn btn-success"
                              >
                                close
                              </button>
                            </div>
                          </>
                        ))}
                        <button
                          onClick={() => handleEditClick("EducationForm")}
                          className="btn btn-success"
                        >
                          add
                        </button>
                        <div
                          className={
                            isEditing === "EducationForm"
                              ? "rounded bg-base-200"
                              : "hidden"
                          }
                        >
                          <button
                            onClick={() => handleEditClick("")}
                            className="btn btn-success"
                          >
                            close
                          </button>
                          <EducationForm />
                        </div>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditClick("EducationForm")}
                          className="btn btn-success"
                        >
                          add
                        </button>
                        <div
                          className={
                            isEditing === "EducationForm"
                              ? "rounded bg-base-200"
                              : "hidden"
                          }
                        >
                          <button
                            onClick={() => handleEditClick("")}
                            className="btn btn-success"
                          >
                            close
                          </button>
                          <EducationForm />
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div
                  id="Skills"
                  className={
                    activeTab === "Skills"
                      ? "rounded bg-base-200 h-72"
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
                          <div className="btn btn-outline" key={skill._id}>
                            {skill.skillName}
                          </div>
                        ))}
                        <button
                          onClick={() => handleEditClick("SkillForm")}
                          className="btn btn-success"
                        >
                          add
                        </button>
                        <div
                          className={
                            isEditing === "SkillForm"
                              ? "rounded bg-base-200"
                              : "hidden"
                          }
                        >
                          <AddSkill />
                          <button
                            onClick={() => handleEditClick("")}
                            className="btn btn-success"
                          >
                            close
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditClick("AddSkill")}
                          className="btn btn-success"
                        >
                          add
                        </button>
                        <div
                          className={
                            isEditing === "AddSkill"
                              ? "rounded bg-base-200"
                              : "hidden"
                          }
                        >
                          <AddSkill />
                          <button
                            onClick={() => handleEditClick("")}
                            className="btn btn-success"
                          >
                            close
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div
                  id="Communities"
                  className={
                    activeTab === "Communities"
                      ? "rounded bg-base-200"
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
                            <div className="btn btn-primary" key={group._id}>
                              {group.name}
                            </div>
                            <button
                              onClick={() => handleEditClick(group._id)}
                              className="btn btn-success"
                            >
                              edit
                            </button>
                            <div
                              className={
                                isEditing === group._id
                                  ? "rounded bg-base-200"
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
                                className="btn btn-success"
                              >
                                close
                              </button>
                            </div>
                          </>
                        ))}
                        <button
                          onClick={() => handleEditClick("GroupForm")}
                          className="btn btn-success"
                        >
                          add
                        </button>
                        <div
                          className={
                            isEditing === "GroupForm"
                              ? "rounded bg-base-200"
                              : "hidden"
                          }
                        >
                          <GroupForm />
                          <button
                            onClick={() => handleEditClick("")}
                            className="btn btn-success"
                          >
                            close
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditClick("GroupForm")}
                          className="btn btn-success"
                        >
                          add
                        </button>
                        <div
                          className={
                            isEditing === "GroupForm"
                              ? "rounded bg-base-200"
                              : "hidden"
                          }
                        >
                          <GroupForm />
                          <button
                            onClick={() => handleEditClick("")}
                            className="btn btn-success"
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
                    activeTab === "Posts" ? "rounded bg-base-200" : "hidden"
                  }
                >
                  <div className="m-2">
                    <h1 className="text-xl text-center font-bold mx-auto py-6">
                      Posts
                    </h1>
                    <PostForm />
                    {profile.posts ? (
                      profile.posts.map((post) => (
                        <div className="text-center font-bold" key={post._id}>
                          {post.postBody} {post._id}
                          <span className="label">Comments</span>
                          {post.comments.map((comment) => (
                            <div className="text-center" key={comment._id}>
                              {comment.commentBody}
                            </div>
                          ))}
                          <CommentForm postId={post._id} />
                          <ReactionForm postId={post._id} />
                        </div>
                      ))
                    ) : (
                      <button className="btn btn-success">add Posts</button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" grid w-full justify-items-center">
          <button className="btn btn-accent m-5">View My Resume</button>
          <button className="btn btn-accent m-5">Add as Friend</button>
        </div>
      </div>
    );
  }
}
