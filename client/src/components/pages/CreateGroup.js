import GroupForm from "./forms/GroupForm";
import backGround from "../images/community.jpg";

export default function CreateGroup() {
  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `URL(${backGround})`,
        }}
      >
        <div className="hero-overlay bg-opacity-70"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">
              Community Starts Here on enCoded!
            </h1>
            <p className="mb-5">
              Find new Friends and make connections with people who love the
              same things you do!
            </p>
          </div>

          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <GroupForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
