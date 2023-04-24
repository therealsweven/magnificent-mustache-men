import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ALL_USERS } from "../../utils/queries";
import { Link } from "react-router-dom";
import { ADD_CONNECTION } from "../../utils/mutations";

export default function AllUsers() {
  const { loading, data } = useQuery(QUERY_ALL_USERS);
  const [addConnection] = useMutation(ADD_CONNECTION);
  const [buttonClicked, setButtonClicked] = useState({});
  const users = data?.users || [];

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!users.length) {
    return <h3>No Users Found</h3>;
  }

  const handleConnect = async (e) => {
    const userId = e.target.id;
    await addConnection({
      variables: {
        connectionId: userId,
      },
    });
    setButtonClicked((prevButtonClicked) => ({
      ...prevButtonClicked,
      [userId]: true,
    }));
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-semibold m-8">Make A Connection!</h1>
      <div className="divider"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <div className="relative">
              <img
                className="w-full h-64 object-cover"
                src={
                  user.profPic ||
                  "https://png.pngtree.com/png-vector/20190221/ourlarge/pngtree-female-user-vector-avatar-icon-png-image_691506.jpg"
                }
                alt={`Profile picture of ${user.firstName} ${user.lastName}`}
              />
              <div className="absolute top-0 right-0 p-2 bg-green-500 text-white font-bold rounded-tr-lg">
                {user.status}
              </div>
            </div>
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-gray-700">{user.bio}</p>
              <div className="mt-4 flex items-center justify-between">
                <Link
                  className="text-blue-600 hover:underline"
                  to={`/profiles/${user._id}`}
                >
                  View Profile
                </Link>
                <button
                  id={user._id}
                  className={`px-4 py-2 text-white font-semibold rounded-md transition-colors ${
                    buttonClicked[user._id]
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                  onClick={handleConnect}
                  disabled={buttonClicked[user._id]}
                >
                  {buttonClicked[user._id] ? "Connected" : "Connect"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
