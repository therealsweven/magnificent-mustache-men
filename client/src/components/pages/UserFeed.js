import { useQuery } from "@apollo/client";
import { QUERY_JOBS, QUERY_FEED } from "../../utils/queries";
import PostForm from "./forms/PostForm";

export default function UserFeed() {
  const { loading, data } = useQuery(QUERY_JOBS);
  const { load, feedData } = useQuery(QUERY_FEED);
  const jobs = data?.jobs || [];
  const feed = feedData?.feed || [];
  if (!load) {
    console.log(feed);
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
                    <div class="grid grid-cols-3 gap-4">
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
                    <div class="grid grid-cols-2 gap-4 place-content-between">
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
        <div className="col-span-3 row-span-8 bg-slate-700 rounded h-min-44 m-2">
          <PostForm />
        </div>
      </div>
    </>
  );
}
