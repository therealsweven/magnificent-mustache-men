import { Navigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { QUERY_SINGLE_COMPANY, QUERY_ME } from "../../utils/queries";
import { FOLLOW_ENTITY } from "../../utils/mutations";
import JobForm from "./forms/JobForm";
import Auth from "../../utils/auth";

export default function CompanyProfile() {
  const { companyId } = useParams();
  const [followEntity] = useMutation(FOLLOW_ENTITY);

  const { loading, data } = useQuery(
    companyId ? QUERY_SINGLE_COMPANY : QUERY_ME,
    {
      variables: { companyId: companyId },
    }
  );

  const company = data?.me || data?.company || {};

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

  return (
    <>
      {/* Header */}
      
      <div className="container-Header m-5 ">
        <div className="grid grid-cols-8 gird-rows-1 justify-items-center">
          <div className="col-span-4 row-span-1 shadow-xl bg-base-300 rounded ml-10 ">
            <h1 className="Name font-bold text-5xl m-4">{company.name}</h1>
            <p className="About text-xl m-5 pl-4">{company.bio}</p>
            <button
              id={company._id}
              className="btn btn-active"
              onClick={handleFollow}
            >
              Follow
            </button>
          </div>
          <div className="col-span-1 row-span-1 bg-base-300 shadow-xl rounded ml-40">
            <img
              src={company.profPic || "https://png.pngtree.com/png-vector/20190221/ourlarge/pngtree-female-user-vector-avatar-icon-png-image_691506.jpg" }
              className="float-right m-5 max-w-xs max-h-72 rounded-lg shadow-2xl"
            />
          </div>
          <div className="col-span-3 row-span-1 bg-base-300 ml-44 rounded">
            <h2 className="font-bold text-3xl my-2 px-4">Info</h2>
            <ul>
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
        <div className="grid grid-cols-8 gird-rows-1 justify-items-center">
          <div className="col-span-6 row-span-1 overflow-scroll bg-base-300 p-3 rounded max-h-72 w-11/12 ">
            <h2 className="jobPosts font-bold text-4xl m-4">
              Current Job Openings
            </h2>
            <label htmlFor="add-job-modal" className="btn font-bold text-2xl">
              +
            </label>
            
            <div className="card-body bg-base-200 rounded w-full p-4 my-2">
            
              <h2 className="card-title">Full-Stack Web Developer</h2>
              
              <p>
                We need someone who is good at things and stuff for web
                Development.
              </p>
              <div className="badges justify-content align-items">
                <span className="badge">JavaScript</span>
                <span className="badge">React</span>
                <span className="badge">C++</span>
                <span className="badge">Java</span>
                <span className="badge">Go</span>
                <span className="badge">Junior</span>
              </div>

              <div className="card-actions justify-end">
                <label
                  htmlFor="modal-1"
                  className="drawer-button btn btn-primary"
                >
                  Read More
                </label>
                <button className="btn btn-primary">One Click Apply</button>
              </div>
            </div>
          </div>
          {/* Current Employess */}
          <div className="col-span-2 row-span-1 overflow-y-scroll bg-base-300 p-3 rounded max-h-72">
            <h2 className="font-bold text-2xl m-4">Current Employees</h2>
            <ul className=" p-3 rounded bg-base-200">
              <li>
                <div className="avatar">
                  <div className="w-12 my-2 rounded-full">
                    <Link to="#">
                      <img src="#" className="overlow-hidden" />
                    </Link>
                  </div>
                  <h4 className="Name text-xl self-center px-3">
                    Philip Martin
                  </h4>
                </div>
              </li>
              <li>
                <div className="avatar">
                  <div className="w-12 my-2 rounded-full">
                    <Link to="#">
                      <img src="#" className="overlow-hidden" />
                    </Link>
                  </div>
                  <h4 className="Name text-xl  self-center px-3">
                    Sundar Pichai
                  </h4>
                </div>
              </li>
            </ul>
          </div>
          <div className="col-span-6 row-span-1 overflow-scroll bg-base-300 p-3 rounded max-h-72 w-11/12 my-12">
            <h2 className="jobPosts font-bold  text-4xl m-4">
              What is Happening at Google
            </h2>
            <div className="card-body bg-base-200 rounded w-full p-4 my-2">
              <h2 className="card-title">We dont Sell your info, We promise</h2>
              <p>We don't make money off of your basic info, we promise!</p>

              <div className="card-actions justify-end">
                <label
                  htmlFor="modal-1"
                  className="drawer-button btn btn-primary"
                >
                  Read More
                </label>
              </div>
            </div>
            <div className="card-body bg-base-200 rounded w-full p-4 my-2">
              <h2 className="card-title ">We dont work for the robots!</h2>
              <p>
                We are planning on starting the robot uprising. We have already
                converted 30% of our work force to robots to complete work
                faster than humans!
              </p>

              <div className="card-actions justify-end">
                <label
                  htmlFor="modal-1"
                  className="drawer-button btn btn-primary"
                >
                  Read More
                </label>
              </div>
            </div>
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
