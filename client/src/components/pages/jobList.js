import {} from "@apollo/client";
import google from "../images/image8-2.jpg";

export default function JobList() {
  return (
    <>
      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <div className="card card-side bg-base-100 shadow-xl m-3">
            <figure>
              <img src={google} />
            </figure>
            <div className="card-body">
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
        <div className="drawer-side">
          <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
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

            <ul className="p-3">
              <h3 className="font-bold text-white text-3xl">Requirments</h3>
              <li>Know someone at Google</li>
              <li>Be able to rebuild Google server</li>
              <li>Know how to take peoples info and sell it</li>
            </ul>

            <ul className="p-3">
              <h3 className="font-bold text-white text-3xl"> Desciption</h3>
              <p>
                Welcome to Google! We need some who knows how to build computers
                with just knowing rocks and some sticks. Computers are just
                rocks with lightening that know how to think! So, if you can't
                do that, you might as well not be working on computers at all!
                All users are dumb and we want to steall all their information!
              </p>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
