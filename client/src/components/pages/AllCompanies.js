import { useQuery } from "@apollo/client";
import { QUERY_COMPANIES } from "../../utils/queries";
import { Link } from "react-router-dom";

export default function AllCompanies() {
  const { loading, data } = useQuery(QUERY_COMPANIES);
  const companies = data?.companies || [];

  if (!companies.length) {
    return <h3>No Companies Built Yet!</h3>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
      {companies.map((company) => (
        <div
          key={company._id}
          className="card card-side bg-base-200 shadow-xl m-3 flex flex-col justify-between border"
        >
          <div>
            <img
              src={company.profPic}
              alt="company logo"
              className="w-full object-cover h-48 p-4 rounded"
            />
            <div className="card-body items-start p-4">
              <h2 className="card-title text-3xl">{company.name}</h2>
              <p>{company.industry}</p>
              <p>
                {company.hqState}, {company.hqCity}
              </p>
              <p>Year Founded: {company.foundedYear}</p>
            </div>
          </div>
          <Link
            className="btn btn-active btn-ghost my-3 shadow-xl mx-4"
            to={`/companyProfile/${company._id}`}
          >
            Explore More
          </Link>
        </div>
      ))}
    </div>
  );
}
