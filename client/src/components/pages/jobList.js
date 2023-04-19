import {} from "@apollo/client";
import google from "../images/image8-2.jpg";

export default function JobList() {
  return (
    <>
      <div class="grid grid-flow-col grid-cols-1 bg-slate-600 ">
        <div className="drawer drawer-end">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <div className="card card-side bg-base-100 shadow-xl m-3">
              <figure>
                <img src={google} />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-white">
                  Full-Stack Web Developer
                </h2>
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
                    htmlFor="my-drawer-4"
                    className="drawer-button btn btn-primary"
                  >
                    Read More
                  </label>
                  <button className="btn btn-primary">One Click Apply</button>
                </div>
              </div>
            </div>
          </div>
          <div className="drawer-side ">
            <label htmlFor="my-drawer-4" className="drawer-overlay "></label>
            <div className="menu w-90 bg-base-100 text-base-content">
              <label
                htmlFor="my-drawer-4"
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
                    are just rocks with lightening that know how to think! So,
                    if you can't do that, you might as well not be working on
                    computers at all! All users are dumb and we want to steal
                    all their information!
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
                    are just rocks with lightening that know how to think! So,
                    if you can't do that, you might as well not be working on
                    computers at all! All users are dumb and we want to steal
                    all their information!
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
                      We won't make you a low-tier slave when we control the
                      world
                    </li>
                    <li>Put in a good word with the Robots</li>
                  </ul>
                </div>
              </div>
            </div>
            
          </div>
          
        </div>
        
      </div>
    </>
  );
}
