import CompanyForm from "./forms/CompanyForm";
import background from "../images/company-bg.jpeg";

export default function CreateCompany() {
  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url(${background})`,
        }}
      >
        <div className="hero-overlay bg-opacity-70"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">
              Teamwork Starts Here on enCoded!
            </h1>
            <p className="mb-5">
              Find your teammates quickly and effecietnly here!
            </p>
          </div>

          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <CompanyForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
