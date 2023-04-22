import { useQuery } from "@apollo/client";
import { QUERY_ALL_USERS } from "../../utils/queries";
import { Link } from "react-router-dom";

export default function AllUsers() {
  const { loading, data } = useQuery(QUERY_ALL_USERS);
  const users = data?.users || [];

  if (!users.length) {
    return <h3>No Users Found</h3>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 bg-slate-700">
      {users.map((user) => (
        <div key={user._id} className="card card-side bg-base-300 shadow-xl m-3 items-center">
          <div className="avatar">
            <div className="w-24 ml-3 rounded-full">
              <img src="https://i.pinimg.com/originals/49/3f/a0/493fa0f13970ab3ef29375669f670451.jpg" />
            </div>
          </div>
          <div className="card-body items-start">
            <h2 className="card-title text-white text-3xl">
              {user.firstName} {user.lastName}
            </h2>
            <Link className="btn btn-active btn-ghost my-3 shadow-xl" to={`/profiles/${user._id}`}>
              Know More
            </Link>
            <button className="btn btn-active btn-primary  shadow-xl">Conntect</button>
          </div>
        </div>
      ))}
    </div>
  );
}