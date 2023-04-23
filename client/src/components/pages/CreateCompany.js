import CompanyForm from "./forms/CompanyForm";

export default function CreateCompany() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl text-center m-2">Create A Company!</h2>
          </div>
          <div className="divider px-6"></div>
          <div className="card-body">
            <CompanyForm />
          </div>
        </div>
      </div>
    </div>
  );
}
