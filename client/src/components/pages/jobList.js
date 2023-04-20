import { useQuery } from "@apollo/client";
import { QUERY_JOBS } from "../../utils/queries";
import google from "../images/image8-2.jpg";

export default function JobList() {
  //make sure to auto gen drawer with title to match drawer to proper posting
  const { loading, data } = useQuery(QUERY_JOBS);
  const jobs = data?.jobs || [];

  if (!jobs.length) {
    return <h3>No Jobs posted yet</h3>;
  }

  return (
    <>
      <div className="grid grid-rows-2 bg-slate-600 ">
        <div className="card card-side bg-base-100 shadow-xl m-3">
          {jobs &&
            jobs.map((job) => (
              <div key={job._id} className="col-12 col-xl-6">
                <div className="card mb-3">
                  <h4 className="card-header bg-dark text-light p-2 m-0">
                    {job.title} <br />
                  </h4>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

// {jobs && jobs.map((job) => (
//<figure>
//   <img src={google} className="rounded-2xl h-40 px-2" />
//   </figure>
//   <div className="card-body">
//     <h2 className="card-title text-white">{job.title}</h2>
//     <p className="text-white">
//       {job.responsibilities}
//     </p>
//     <div className="badges justify-content align-items">
//       <span className="badge">JavaScript</span>
//       <span className="badge">React</span>
//       <span className="badge">C++</span>
//       <span className="badge">Java</span>
//       <span className="badge">Go</span>
//       <span className="badge">Junior</span>
//     </div>

//     <div className="card-actions justify-end">
//       <label
//         htmlFor="modal-{job._id}"
//         className="modal-button btn btn-primary"
//       >
//         Read More
//       </label>
//       <button className="btn btn-primary">One Click Apply</button>
//     </div>
//   </div>
// </div>

// <input type="checkbox" id="modal-{job._id}" className="modal-toggle " />
// <div className="modal">
//   <div className="modal-box relative max-w-5xl">
//     <label
//       htmlFor="modal-{job._id}"
//       className="btn btn-sm btn-circle absolute left-2 top-2"
//     >
//       ✕
//     </label>
//     <h3 className="p-5 m-4 font-bold text-white text-5xl">
//       Full-Stack Web Developer at Google
//     </h3>
//     <div class="grid grid-cols-3 gap-4">
//       <ul className="p-3 m-5 shadow shadow-blue-500/50 ">
//         <h3 className="font-bold text-white text-3xl">
//           Qualifications
//         </h3>
//         <li>{job.qualifications}</li>
//       </ul>

//       <div className="p-3 m-5 shadow shadow-blue-500/50">
//         <h3 className="font-bold text-white text-3xl m-2">
//
//           Description
//         </h3>
//       </div>
//       <div className="p-3 m-5 shadow shadow-blue-500/50">
//         <h3 className="font-bold text-white text-3xl m-2">
//
//           Responsibilities
//         </h3>
//         <p>
//          {job.responsibilities}
//         </p>
//       </div>
//     </div>
//     <div class="grid grid-cols-2 gap-4 place-content-between">
//       <div className="p-3 m-5 shadow shadow-blue-500/50">
//         <h2 className="font-bold text-white text-4xl m-2"> Salary</h2>
//         <p className="text-xl">{job.salary}</p>
//       </div>
//       <div className="p-3 m-5 shadow shadow-blue-500/50">
//         <ul>
//           <h2 className="font-bold text-white text-4xl m-2">
//             Benefits
//           </h2>
//           <li>
//            {job.benefits}
//           </li>
//           <li>Put in a good word with the Robots</li>
//         </ul>
//       </div>
//       <button className="btn btn-md btn-primary">
//         One Click Apply
//       </button>
//     </div>
//   </div>))}
