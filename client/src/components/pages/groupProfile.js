import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { QUERY_SINGLE_GROUP, QUERY_ME } from "../../utils/queries";
import { JOIN_GROUP } from "../../utils/mutations";

import Auth from "../../utils/auth";

export default function GroupProfile() {
  const { groupId } = useParams();

  const { loading, data } = useQuery(groupId ? QUERY_SINGLE_GROUP : QUERY_ME, {
    variables: { groupId: groupId },
  });

  const [joinGroup, { error }] = useMutation(JOIN_GROUP);

  const handleJoin = async (groupId) => {
    try {
      console.log(groupId);
      const { data } = await joinGroup({
        variables: { groupId: groupId },
      });
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  const group = data?.me || data?.group || {};

  if (Auth.loggedIn() && Auth.getProfile().data._id === groupId) {
    return <Navigate to="/" />;
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!group?.name) {
    return <h1> Please Log In to View this Group</h1>;
  }

  return (
    <>
      <div
        className="bg-cover bg-center w-full h-64 m-5 p-5"
        style={{
          backgroundImage: `url(${group.bannerPic})`,
        }}
      >
        <div className="bg-gray-800 bg-opacity-75 h-full flex items-center">
          <h1 className="text-white text-4xl mx-auto px-4">
            {group.name || "No group found"}
          </h1>
        </div>
      </div>
      <div className="mx-auto max-w-7xl">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {group.name}
            </h3>
            <button className="btn float-right" groupId={group._id} onClick={() => handleJoin({groupId})} >Follow</button>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              WE ARE HERE TO STEAL YOUR TOES
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Members</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {/* {group.members.map((member) => member.user.).join(", ")} */}
                  <div className="avatar-group -space-x-6">
                    <div className="avatar">
                      <div className="w-12">
                        <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                      </div>
                    </div>
                    <div className="avatar">
                      <div className="w-12">
                        <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                      </div>
                    </div>
                    <div className="avatar">
                      <div className="w-12">
                        <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                      </div>
                    </div>
                    <div className="avatar">
                      <div className="w-12">
                        <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                      </div>
                    </div>
                  </div>
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Admins</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {/* {group.admins.map((admin) => admin.first && admin.last).join(", ")} */}
                  <div className="avatar-group -space-x-6">
                    <div className="avatar">
                      <div className="w-12">
                        <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                      </div>
                    </div>
                    <div className="avatar">
                      <div className="w-12">
                        <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                      </div>
                    </div>
                    <div className="avatar">
                      <div className="w-12">
                        <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                      </div>
                    </div>
                    <div className="avatar">
                      <div className="w-12">
                        <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                      </div>
                    </div>
                  </div>
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Posts</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {/* {group.posts.map((post) => (
                  <div key={post._id}>
                    <h4 className="text-md font-medium text-gray-900">
                      {post.title}
                    </h4>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      {post.postBody}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Posted by {post.memeber.fistName} on{" "}
                      {new Date(post.createdAt).toLocaleString()}
                    </p>
                    <hr className="my-2" />
                  </div>
                ))} */}
                  <h4 className="text-md font-medium text-gray-900">
                    This is a post by this community
                  </h4>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    THis is the post Body
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Post By: Michael Mount
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </>
  );
}
