import { useQuery } from "@apollo/client";
import { QUERY_ALL_USERS } from "../../utils/queries";
import { Link } from "react-router-dom";

export default function AllUsers() {
    const {loading, data} = useQuery(QUERY_ALL_USERS);
    const users = data?.users || [];

    if(!users.length){
        return <h3>No Users Found</h3>
    }

    return (
        <>
        <div className="grid grid-flow-row grid-cols-1 bg-slate-900 ">
        <div className="card card-side bg-base-100 shadow-xl h-screen m-5">
          {users &&
            users.map((user) => (
              <div key={user._id}>
                <div className="card card-side bg-base-300 shadow-xl m-3 items-center">
                  
                  <div className="card-body items-start">
                    <h2 className="card-title text-white text-3xl">
                      {user.firstName} {user.lastName}
                    </h2>
                    <p></p>
                    <p>
                    </p>
                    <p>Year Founded:</p>
                    <Link
                      className="btn btn-active btn-ghost my-3 shadow-xl"
                      to={`/profiles/${user._id}`}
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
    )
}