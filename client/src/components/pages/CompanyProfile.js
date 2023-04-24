import { Navigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { QUERY_SINGLE_COMPANY, QUERY_ME } from "../../utils/queries";
import { FOLLOW_ENTITY, REMOVE_JOB } from "../../utils/mutations";
import JobForm from "./forms/JobForm";
import Auth from "../../utils/auth";
import { APPLY_TO_JOB } from "../../utils/mutations";

export default function CompanyProfile() {
  const { companyId } = useParams();
  const [followEntity] = useMutation(FOLLOW_ENTITY);
  const [applyToJob] = useMutation(APPLY_TO_JOB);
  const [removeJob] = useMutation(REMOVE_JOB);

  const { loading, data } = useQuery(
    companyId ? QUERY_SINGLE_COMPANY : QUERY_ME,
    {
      variables: { companyId: companyId },
    }
  );

  const company = data?.me || data?.company || {};

  console.log(company);

  if (Auth.loggedIn() && Auth.getProfile().data._id === companyId) {
    return <Navigate to="/" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!company?.name) {
    return <h4> Please Login to edit your company profile!</h4>;
  }
  const handleFollow = async (e) => {
    console.log(e.target.id);
    await followEntity({
      variables: {
        companyId: e.target.id,
      },
    });
    console.log("Company Followed");
  };

  const handleApply = async (e) => {
    // console.log(e.target.id);
    try {
      await applyToJob({
        variables: {
          jobId: e.target.id,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemove = async (e) => {
    try {
      await removeJob({
        variables: {
          jobId: e.target.id,
        },
      });
      console.log(e.target.id);
    } catch (err) {}
  };

  const hasAccessToAddJobModal =
    Auth.loggedIn() && Auth.getProfile().data._id === company.admins[0]._id;

  return (
    <>
      {/* Header */}

      <div className="container-Header m-5">
        <div className="grid grid-cols-1 md:grid-cols-8 md:gird-rows-1 justify-items-center">
          <div className="col-span-4 md:col-span-4 row-span-1 shadow-xl bg-base-300 rounded mb-5 md:mb-0">
            <h1 className="Name font-bold text-4xl md:text-5xl mt-4 md:mt-0">
              {company.name}
            </h1>
            <p className="About text-base md:text-xl m-5 pl-4">{company.bio}</p>
            <button
              id={company._id}
              className="btn btn-active"
              onClick={handleFollow}
            >
              Follow
            </button>
          </div>
          <div className="col-span-1 md:col-span-1 row-span-1 bg-base-300 shadow-xl rounded mb-5 md:mb-0">
            <img
              src={
                company.profPic ||
                "https://png.pngtree.com/png-vector/20190221/ourlarge/pngtree-female-user-vector-avatar-icon-png-image_691506.jpg"
              }
              className="float-right m-5 max-w-xs max-h-72 rounded-lg shadow-2xl"
            />
          </div>
          <div className="col-span-3 md:col-span-3 row-span-1 bg-base-300 rounded">
            <h2 className="font-bold text-2xl md:text-3xl my-2 px-4">Info</h2>
            <ul className="text-sm md:text-base">
              <li className="px-4 m-3">
                Location: {company.hqState}, {company.hqCity}
              </li>
              <li className="px-4 m-3">Size: {company.companySize}</li>
              <li className="px-4 m-3">Founded: {company.foundedYear}</li>
              <li className="px-4 m-3">
                <a href={company.website}>{company.website}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Body */}
      <div className="container-Body m-5 ">
        {/* Current Job Postings */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-8 md:grid-rows-1 md:justify-items-center">
          <div className="col-span-1 md:col-span-6 md:row-span-1 overflow-scroll bg-base-300 p-3 rounded max-h-72 w-full md:w-11/12">
            <h2 className="jobPosts font-bold text-4xl md:text-5xl m-4">
              {" "}
              Current Job Openings{" "}
            </h2>
            {hasAccessToAddJobModal && (
              <label htmlFor="add-job-modal" className="btn font-bold text-2xl">
                +
              </label>
            )}
            {company.jobs.map((jobs) => (
              <>
                <div Key={jobs._id} className="my-2">
                  <div className="card-body bg-base-200 rounded w-full p-4">
                    <h2 className="card-title text-2xl md:text-3xl">
                      {jobs.title}
                    </h2>
                    <p className="text-sm md:text-base">{jobs.description}</p>
                    <div className="card-actions flex justify-between">
                      {hasAccessToAddJobModal && (
                        <button
                          id={jobs._id}
                          className="flex justify-center self-center shadow-3xl w-4 mx-4 btn btn-primary"
                          onClick={handleRemove}
                        >
                          X
                        </button>
                      )}
                      <label
                        htmlFor={`modal-${jobs._id}`}
                        className="drawer-button btn btn-primary"
                      >
                        Read More
                      </label>
                    </div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  id={`modal-${jobs._id}`}
                  className="modal-toggle"
                />
                <div className="modal">
                  <div className="modal-box relative max-w-5xl">
                    <label
                      htmlFor={`modal-${jobs._id}`}
                      className="btn btn-sm btn-circle absolute left-2 top-2"
                    >
                      ✕
                    </label>

                    <h3 className="p-5 m-4 font-bold text-5xl md:text-6xl">
                      {jobs.title}
                    </h3>
                    <div class="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
                      <ul className="p-3 shadow-xl bg-base-200">
                        <h3 className="font-bold text-3xl md:text-4xl mb-3">
                          Qualifications
                        </h3>
                        <li className="text-sm md:text-base">
                          {jobs.qualifications}
                        </li>
                      </ul>
                      <div className="p-3 shadow-xl bg-base-200">
                        <h3 className="font-bold text-3xl md:text-4xl m-2">
                          Description
                        </h3>
                        <p className="text-sm md:text-base">
                          {jobs.description}
                        </p>
                      </div>
                      <div className="p-3 shadow-xl bg-base-200">
                        <h3 className="font-bold text-3xl md:text-4xl m-2">
                          Responsibilities
                        </h3>
                        <p className="text-sm md:text-base">
                          {jobs.responsibilities}
                        </p>
                      </div>
                    </div>
                    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 md:place-content-between">
                      <div className="p-3 shadow-xl bg-base-200">
                        <h2 className="font-bold text-4xl m-2">Salary</h2>
                        <p className="text-xl text-center ">{jobs.salary}K</p>
                      </div>
                      <div className="p-3 m-5 shadow-xl ">
                        <ul>
                          <h2 className="font-bold text-4xl m-2">Benefits</h2>
                          <li>{jobs.benefits}</li>
                        </ul>
                      </div>
                      <button
                        id={jobs._id}
                        className="btn btn-primary"
                        onClick={handleApply}
                      >
                        One Click Apply
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
      <input type="checkbox" id="add-job-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h2>Please Fill this out!</h2>
          <JobForm />
          <div className="modal-action">
            <label htmlFor="add-job-modal" className="btn float-top">
              X
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
