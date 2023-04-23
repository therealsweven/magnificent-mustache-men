import { useQuery } from "@apollo/client";
import { QUERY_COMPANIES } from "../../utils/queries";
import { Link } from "react-router-dom";

export default function AllCompanies() {
  const { loading, data } = useQuery(QUERY_COMPANIES);
  const companies = data?.companies || [];

  if (!companies.length) {
    return <h3>No Companies Built Yet!</h3>;
  }
  if (!loading) {
    console.log(data);
  }

  return (
    <>
      <div className="grid grid-flow-col grid-cols-1 grid-rows-4">
        <div className="card card-side flex flex-wrap  shadow-xl max-h-screen m-5">
          {companies &&
            companies.map((company) => (
              <div key={company._id}>
                <div className="card card-side shadow-xl m-3 items-center bg-base-300 border">
                  <figure className="p-10">
                    <img
                      src={company.profPic}
                      alt="company logo"
                      className="rounded-xl float"
                      style={{ width: "200px", height: "200px" }}
                    ></img>
                  </figure>
                  <div className="card-body items-start">
                    <h2 className="card-title text-3xl">{company.name}</h2>
                    <p>{company.industry}</p>
                    <p>
                      {company.hqState}, {company.hqCity}
                    </p>
                    <p>Year Founded: {company.foundedYear}</p>
                    <Link
                      className="btn btn-active btn-ghost my-3 shadow-xl"
                      to={`/companyProfile/${company._id}`}
                    >
                      {" "}
                      Explore More{" "}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
