import {} from "@apollo/client";
import google from "../images/image8-2.jpg";

export default function JobList() {
  //make sure to auto gen drawer with title to match drawer to proper posting
  return (
    <>
      <div className="grid grid-rows-2 bg-slate-600 ">
        <div className="card card-side bg-base-100 shadow-xl m-3">
          <figure>
            <img src={google} className="rounded-2xl h-40 px-2" />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-white">Full-Stack Web Developer</h2>
            <p className="text-white">
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
        <div className="card card-side bg-base-100 shadow-xl m-3">
          <figure>
            <img src={google} className="rounded-2xl h-40 px-2" />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-white">Full-Stack Web Developer</h2>
            <p className="text-white">
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
                htmlFor="modal-2"
                className="drawer-button btn btn-primary"
              >
                Read More
              </label>
              <button className="btn btn-primary">One Click Apply</button>
            </div>
          </div>
        </div>
        <input type="checkbox" id="modal-1" className="modal-toggle " />
        <div className="modal">
          <div className="modal-box relative max-w-5xl">
            <label
              htmlFor="modal-1"
              className="btn btn-sm btn-circle absolute left-2 top-2"
            >
              ✕
            </label>
            <h3 className="p-5 m-4 font-bold text-white text-5xl">
              Full-Stack Web Developer at Google
            </h3>
            <div class="grid grid-cols-3 gap-4">
              <ul className="p-3 m-5 shadow shadow-blue-500/50 ">
                <h3 className="font-bold text-white text-3xl">
                  Qualifications
                </h3>
                <li className="pl-5 m-2">Know someone at Google</li>
                <li className="pl-5 m-2">Be able to rebuild Google server</li>
                <li className="pl-5 m-2">
                  Know how to take peoples info and sell it
                </li>
              </ul>

              <div className="p-3 m-5 shadow shadow-blue-500/50">
                <h3 className="font-bold text-white text-3xl m-2">
                  {" "}
                  Description
                </h3>
                <p>
                  Welcome to Google! We need some who knows how to build
                  computers with just knowing rocks and some sticks. Computers
                  are just rocks with lightening that know how to think! So, if
                  you can't do that, you might as well not be working on
                  computers at all! All users are dumb and we want to steal all
                  their information!
                </p>
              </div>
              <div className="p-3 m-5 shadow shadow-blue-500/50">
                <h3 className="font-bold text-white text-3xl m-2">
                  {" "}
                  Responsibilities
                </h3>
                <p>
                  Welcome to Google! We need some who knows how to build
                  computers with just knowing rocks and some sticks. Computers
                  are just rocks with lightening that know how to think! So, if
                  you can't do that, you might as well not be working on
                  computers at all! All users are dumb and we want to steal all
                  their information!
                </p>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4 place-content-between">
              <div className="p-3 m-5 shadow shadow-blue-500/50">
                <h2 className="font-bold text-white text-4xl m-2"> Salary</h2>
                <p className="text-xl">$100k - $130k</p>
              </div>
              <div className="p-3 m-5 shadow shadow-blue-500/50">
                <ul>
                  <h2 className="font-bold text-white text-4xl m-2">
                    Benefits
                  </h2>
                  <li>
                    We won't make you a low-tier slave when we control the world
                  </li>
                  <li>Put in a good word with the Robots</li>
                </ul>
              </div>
              <button className="btn btn-md btn-primary">
                One Click Apply
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* modal 2 */}
      <input type="checkbox" id="modal-2" className="modal-toggle " />
      <div className="modal">
        <div className="modal-box relative max-w-5xl">
          <label
            htmlFor="modal-2"
            className="btn btn-sm btn-circle absolute left-2 top-2"
          >
            ✕
          </label>
          <h3 className="p-5 m-4 font-bold text-white text-5xl">Modal 2</h3>
          <div class="grid grid-cols-3 gap-4">
            <ul className="p-3 m-5 shadow shadow-blue-500/50 ">
              <h3 className="font-bold text-white text-3xl">Qualifications</h3>
              <li className="pl-5 m-2">Know someone at Google</li>
              <li className="pl-5 m-2">Be able to rebuild Google server</li>
              <li className="pl-5 m-2">
                Know how to take peoples info and sell it
              </li>
            </ul>

            <div className="p-3 m-5 shadow shadow-blue-500/50">
              <h3 className="font-bold text-white text-3xl m-2">
                {" "}
                Description
              </h3>
              <p>
                Welcome to Google! We need some who knows how to build computers
                with just knowing rocks and some sticks. Computers are just
                rocks with lightening that know how to think! So, if you can't
                do that, you might as well not be working on computers at all!
                All users are dumb and we want to steal all their information!
              </p>
            </div>
            <div className="p-3 m-5 shadow shadow-blue-500/50">
              <h3 className="font-bold text-white text-3xl m-2">
                {" "}
                Responsibilities
              </h3>
              <p>
                Welcome to Google! We need some who knows how to build computers
                with just knowing rocks and some sticks. Computers are just
                rocks with lightening that know how to think! So, if you can't
                do that, you might as well not be working on computers at all!
                All users are dumb and we want to steal all their information!
              </p>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4 place-content-between">
            <div className="p-3 m-5 shadow shadow-blue-500/50">
              <h2 className="font-bold text-white text-4xl m-2"> Salary</h2>
              <p className="text-xl">$100k - $130k</p>
            </div>
            <div className="p-3 m-5 shadow shadow-blue-500/50">
              <ul>
                <h2 className="font-bold text-white text-4xl m-2">Benefits</h2>
                <li>
                  We won't make you a low-tier slave when we control the world
                </li>
                <li>Put in a good word with the Robots</li>
              </ul>
            </div>
            <button className="btn btn-md btn-primary">One Click Apply</button>
          </div>
        </div>
      </div>
    </>
  );
}
