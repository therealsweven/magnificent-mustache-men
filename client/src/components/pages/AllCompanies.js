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
      <div className="grid grid-cols-1 grid-rows-1 bg-slate-900 ">
        <div className="card card-side bg-base-100 shadow-xl h-screen m-5">
            {companies && companies.map((company) => (
                <div key={company._id}>
                    <h1>{company.name}</h1>
                </div>
            ))}
        </div>
      </div>
    </>
  );
}
