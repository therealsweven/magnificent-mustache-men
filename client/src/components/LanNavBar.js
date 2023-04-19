import { Link } from "react-router-dom";
import logo from "./images/logo.png";
import UserForm from "./pages/forms/UserForm";
import LoginForm from "./pages/forms/LoginForm"

export default function LanNavBar() {
  return (
    <>
      <div className="navbar bg-base-300">
        <div className="flex-1">
          <img className=" mx-3 rounded h-11" src={logo} />
          <Link
            to="/signup"
            className="btn btn-ghost normal-case text-xl font-titilliumWeb"
          >
            enCoded
          </Link>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered"
            />
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn m-1">
              Sign Up
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <label htmlFor="sign-modal" className="btn m-1">
                  Sign Up!
                </label>
              </li>
              <li>
                <label htmlFor="login-modal" className="btn m-1">
                  Log In!
                </label>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <input type="checkbox" id="login-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box flex items-center justify-center max-w-5xl">
          <label
            htmlFor="login-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
              <div className="text-center lg:text-left">
                <h1 className="text-5xl font-bold">Login now!</h1>
                <p className="py-6">
                  Provident cupiditate voluptatem et in. Quaerat fugiat ut
                  assumenda excepturi exercitationem quasi. In deleniti eaque
                  aut repudiandae et a id nisi.
                </p>
              </div>
              <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <div className="card-body">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="text"
                      placeholder="email"
                      className="input input-bordered"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      type="text"
                      placeholder="password"
                      className="input input-bordered"
                    />
                    <label className="label">
                      <a href="#" className="label-text-alt link link-hover">
                        Forgot password?
                      </a>
                    </label>
                  </div>
                  <div className="form-control mt-6">
                    <button className="btn btn-primary">Login</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <input type="checkbox" id="sign-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box flex items-center justify-center max-w-5xl">
          <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
              <label
                htmlFor="sign-modal"
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </label>
              <div className="text-center lg:text-left">
                <h1 className="text-5xl font-bold">Sign Up</h1>
                <p className="py-6">
                  Provident cupiditate voluptatem et in. Quaerat fugiat ut
                  assumenda excepturi exercitationem quasi. In deleniti eaque
                  aut repudiandae et a id nisi.
                </p>
              </div>
              <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <div className="card-body">
                  <UserForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
