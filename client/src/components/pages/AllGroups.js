import { useQuery } from "@apollo/client";
import { QUERY_ALL_GROUPS } from "../../utils/queries";
import { Link } from "react-router-dom";

export default function AllGroups() {
  const { loading, data } = useQuery(QUERY_ALL_GROUPS);
  const groups = data?.groups || [];

  console.log(groups);

  if (!groups.length) {
    return <h1>No Communities have been built!</h1>;
  }

  if (!loading) {
    <h1>Loading...</h1>;
  }

  return (
    <div className="mx-6">
      <h1 className="text-5xl font-bold mb-6">Join a community today!</h1>
      <div className="divider"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {groups.map((group) => (
          <div
            key={group._id}
            className="card flex flex-col justify-between rounded-md shadow-md overflow-hidden my-3"
          >
            <div className="card-header">
              <img
                src={group.profilePic}
                alt="Group Logo"
                className="h-64 w-full object-cover"
              />
            </div>
            <div className="card-body">
              <h2 className="card-title text-2xl">{group.name}</h2>
              <p className="card-text">{group.description}</p>
            </div>
            <div className="card-footer flex justify-center my-3">
              <Link to={`/groups/${group._id}`}>
                <button className="btn btn-primary">Get to Know Us!</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}