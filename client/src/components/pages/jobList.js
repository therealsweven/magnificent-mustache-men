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
      console.log(e.target);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="container mx-auto">
      <h1 className="text-3xl font-semibold m-8">Find The Right Job For You!</h1>
      <div className="divider"></div>
          {jobs &&
            jobs.map((job) => (
              <div key={job._id}>
                <div className="grid col-span-1 card-body shadow-xl border bg-base-100 rounded m-4">
                  <figure>
                    <img src={google} className="rounded-2xl h-40 px-2" />
                  </figure>

                  <h2 className="card-title ">{job.title}</h2>
                  <p className=" ">{job.responsibilities}</p>
                  <div className="badges justify-content align-items"></div>
                  <div className="card-actions justify-end">
                    <label
                      htmlFor={job._id}
                      className="modal-button btn btn-primary"
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
                    <h3 className="p-5 m-4 font-bold text-5xl">{job.title}</h3>
                    <div class="grid grid-cols-3 gap-4">
                      <ul className="p-3 m-5 shadow-xl ">
                        <h3 className="font-bold text-3xl">Qualifications</h3>
                        <li>{job.qualifications}</li>
                      </ul>

                      <div className="p-3 m-5 shadow-xl ">
                        <h3 className="font-bold  text-3xl m-2">Description</h3>
                        <p>{job.description}</p>
                      </div>
                      <div className="p-3 m-5 shadow-xl ">
                        <h3 className="font-bold  text-3xl m-2">
                          Responsibilities
                        </h3>
                        <p>{job.responsibilities}</p>
                      </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4 place-content-between">
                      <div className="p-3 m-5 shadow-xl ">
                        <h2 className="font-bold text-4xl m-2">Salary</h2>
                        <p className="text-xl text-center ">{job.salary}K</p>
                      </div>
                      <div className="p-3 m-5 shadow-xl ">
                        <ul>
                          <h2 className="font-bold text-4xl m-2">Benefits</h2>
                          <li>{job.benefits}</li>
                        </ul>
                      </div>
                      <button
                        id={job._id}
                        className="btn btn-primary"
                        onClick={handleApply}
                      >
                        One Click Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      
    </>
  );
}
