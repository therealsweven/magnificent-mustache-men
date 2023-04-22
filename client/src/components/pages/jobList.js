import { useQuery, useMutation } from "@apollo/client";
import { QUERY_JOBS } from "../../utils/queries";
import google from "../images/image8-2.jpg";
import { APPLY_TO_JOB } from "../../utils/mutations";

export default function JobList() {
  //make sure to auto gen drawer with title to match drawer to proper posting
  const { loading, data } = useQuery(QUERY_JOBS);
  const [applyToJob] = useMutation(APPLY_TO_JOB);
  const jobs = data?.jobs || [];

  if (!jobs.length) {
    return <h3>No Jobs posted yet</h3>;
  }
  const handleApply = async (e) => {
    // console.log(e.target.id);
    try {
      await applyToJob({
        variables: {
          jobId: e.target.id,
        },
      });
      console.log("applied to job");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 grid-rows-1 bg-slate-900 ">
        <div className="card card-side bg-base-100 shadow-xl h-screen glass m-5">
          {jobs &&
            jobs.map((job) => (
              <div key={job._id}>
                <div className="grid col-span-1 card-body shadow-xl border-black bg-slate-800 rounded m-4">
                  <figure>
                    <img src={google} className="rounded-2xl h-40 px-2" />
                  </figure>

                  <h2 className="card-title text-white">{job.title}</h2>
                  <p className="text-white ">{job.responsibilities}</p>
                  <div className="badges justify-content align-items"></div>
                  <div className="card-actions justify-end">
                    <label
                      htmlFor={job._id}
                      className="modal-button btn btn-primary"
                    >
                      Read More
                    </label>
                    <button
                      id={job._id}
                      className="btn btn-primary"
                      onClick={handleApply}
                    >
                      One Click Apply
                    </button>
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
      </div>
    </>
  );
}
