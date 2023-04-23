import { useQuery } from "@apollo/client";
import { QUERY_JOBS, QUERY_FEED } from "../../utils/queries";
import PostForm from "./forms/PostForm";

export default function UserDashboard() {
  const { loading: jobLoading, data: jobData } = useQuery(QUERY_JOBS);
  const { loading: feedLoading, data: feedData } = useQuery(QUERY_FEED);

  // const { load, feedData } = useQuery(QUERY_FEED);

  const jobs = jobData?.jobs || [];
  const feed = feedData?.feed || [];

  console.log("below is feed");
  console.log(feed);

  if (!jobLoading) {
    console.log(jobs);
  }

  return (
    <>
      <div className="container grid grid-cols-6 grid-rows-8">
        <div className="box col-span-2 rounded overflow-scroll max-h-64 m-4 bg-slate-700">
          <h1 className="text-4xl text-white m-2 text-center rounded bg-slate-400 ">
            Recent Job Postings
          </h1>
          {jobs &&
            jobs.map((job) => (
              <div key={job._id}>
                <div className="card bg-slate-500 m-3">
                  <h2 className="card-title text-white m-2">{job.title}</h2>
                  <p className="text-white  h-12 truncate pl-3 pr-12">
                    {job.description}
                  </p>
                  <div className="card-actions justify-end">
                    <label
                      htmlFor={job._id}
                      className="modal-button btn btn-sm btn-primary m-2"
                    >
                      Read More
                    </label>
                  </div>
                </div>
                <input type="checkbox" id={job._id} className="modal-toggle " />
                <div className="modal">
                  <div className="modal-box relative max-w-5xl">
                    <label
                      htmlFor={job._id}
                      className="btn btn-sm btn-circle absolute left-2 top-2"
                    >
                      ✕
                    </label>
                    <h3 className="p-5 m-4 font-bold text-white text-5xl">
                      {job.title}
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      <ul className="p-3 m-5 shadow shadow-blue-500/50 ">
                        <h3 className="font-bold text-white text-3xl">
                          Qualifications
                        </h3>
                        <li>{job.qualifications}</li>
                      </ul>

                      <div className="p-3 m-5 shadow shadow-blue-500/50">
                        <h3 className="font-bold text-white text-3xl m-2">
                          Description
                        </h3>
                        <p>{job.description}</p>
                      </div>
                      <div className="p-3 m-5 shadow shadow-blue-500/50">
                        <h3 className="font-bold text-white text-3xl m-2">
                          Responsibilities
                        </h3>
                        <p>{job.responsibilities}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 place-content-between">
                      <div className="p-3 m-5 shadow shadow-blue-500/50">
                        <h2 className="font-bold text-white text-4xl m-2">
                          Salary
                        </h2>
                        <p className="text-xl text-center ">{job.salary}K</p>
                      </div>
                      <div className="p-3 m-5 shadow shadow-blue-500/50">
                        <ul>
                          <h2 className="font-bold text-white text-4xl m-2">
                            Benefits
                          </h2>
                          <li>{job.benefits}</li>
                        </ul>
                      </div>
                      <button className="btn btn-md btn-primary">
                        One Click Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="col-span-3 row-span-8 bg-slate-900 rounded h-min-44 m-6">
          <div className="m-4">
          <PostForm />
          </div>
          <div className="Feed-Containter grid grid-cols-1 bg-slate-500 overflow-scroll max-h-screen  rounded p-4">
            {feed.map((feed) => (
              <div className="Card  bg-slate-700 shadow-xl p-5 m-4 rounded">
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                  </div>
                  <h2 className="card-title text-center ml-5">Michael Mount</h2>
                  
                </div>
                <p className="bg-black text-green-500 rounded p-5 my-2">{feed.postBody}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}