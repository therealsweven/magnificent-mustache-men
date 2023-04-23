import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ALL_USERS } from "../../utils/queries";
import { Link } from "react-router-dom";
import { ADD_CONNECTION } from "../../utils/mutations";

export default function AllUsers() {
  const { loading, data } = useQuery(QUERY_ALL_USERS);
  const [addConnection] = useMutation(ADD_CONNECTION);
  const users = data?.users || [];

  if (!users.length) {
    return <h3>No Users Found</h3>;
  }

  const handleConnect = async (e) => {
    console.log(e.target.id);
    await addConnection({
      variables: {
        connectionId: e.target.id,
      },
    });
    console.log("Connected with user");
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
      {users.map((user) => (
        <div
          key={user._id}
          className="card card-side bg-base-300 shadow-xl m-3 items-center"
        >
          <div className="avatar">
            <div className="w-24 ml-3 rounded-full">
              <img src={user.profPic} />
            </div>
          </div>
          <div className="card-body items-start">
            <h2 className="card-title  text-3xl">
              {user.firstName} {user.lastName}
            </h2>
            <Link
              className="btn btn-active btn-ghost my-3 shadow-xl"
              to={`/profiles/${user._id}`}
            >
              Know More
            </Link>
            <button
              id={user._id}
              className="btn btn-active btn-primary  shadow-xl"
              onClick={handleConnect}
            >
              Conntect
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
