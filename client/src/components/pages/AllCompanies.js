import { useQuery } from "@apollo/client";
import { QUERY_COMPANIES } from "../../utils/queries";

export default function AllCompanies() {
  const { loading, data } = useQuery(QUERY_COMPANIES);
  const companies = data?.companies || [];

  if (!companies.length) {
    return <h3>No Companies Built Yet!</h3>;
  }

  return (
    <>
      <div className="grid grid-flow-row grid-cols-1 bg-slate-900 ">
        <div className="card card-side bg-base-100 shadow-xl h-screen m-5">
          {companies &&
            companies.map((company) => (
              <div key={company._id}>
                <div className="card card-side bg-base-300 shadow-xl m-3 items-center">
                  <figure className="p-10 ">
                    <img
                      src="https://placehold.co/200x200"
                      alt="company logo"
                      className="rounded-xl float"
                    ></img>
                  </figure>
                  <div className="card-body items-start">
                    <h2 className="card-title text-white text-3xl">
                      {company.name}
                    </h2>
                    <p>{company.industry}</p>
                    <p>
                      {company.hqState}, {company.hqCity}
                    </p>
                    <p>Year Founded: {company.foundedYear}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
