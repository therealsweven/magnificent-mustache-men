import { useQuery } from "@apollo/client";
import { QUERY_JOBS, QUERY_FEED, QUERY_REACTIONS } from "../../utils/queries";
import PostForm from "./forms/PostForm";
import ReactionForm from "./forms/ReactionForm";
import CommentForm from "./forms/CommentForm";
import CommentReactionForm from "./forms/CommentReaction";

import { countReactions } from "../../utils/helpers";

export default function UserDashboard() {
  const { loading: jobLoading, data: jobData } = useQuery(QUERY_JOBS);
  const { loading: feedLoading, data: feedData } = useQuery(QUERY_FEED);
  const { loading: reactionLoading, data: reactionData } =
    useQuery(QUERY_REACTIONS);

  //const { loading: profLoading, data: profData } = useQuery(QUERY_ME);

  // const { load, feedData } = useQuery(QUERY_FEED);

  const jobs = jobData?.jobs || [];
  let feed = feedData?.feed || [];
  const reactions = reactionData?.reactions || [];
  //const profile = profData?.me || {};

  if (!jobLoading) {
    console.log(jobs);
  }

  // if (!feedLoading && !reactionLoading && feed.length) {
  //   // console.log(feed);
  //   //console.log(reactions);
  //   feed = JSON.parse(JSON.stringify(feed));
  //   feed.map((post) => {
  //     let reactionIds = [];
  //     let reactionCounts = [];
  //     // create array of reaction _ids for each post
  //     post.reactions.map((reaction) => {
  //       reactionIds.push(reaction.reactionId._id);
  //     });
  //     //count reactions
  //     reactions.map((r) => {
  //       const count = {
  //         _id: r._id,
  //         count: reactionIds.filter((x) => x === r._id).length,
  //         icon: r.icon,
  //       };
  //       reactionCounts.push(count);
  //       //console.log(count);
  //     });
  //     post.reactionCounts = reactionCounts;
  //     //console.log("reactions", reactionCounts);
  //   });
  // }

  return (
    <>
      <h1 className="text-5xl font-bold mx-8 mt-4">
        Hello! Welcome to Your DashBoard!
      </h1>
      <div className="divider m-6 px-4"></div>
      <div className="container grid grid-cols-6 grid-rows-8">
        <div className="drawer drawer-mobile bg-slate-700 end-0 mt-2 ml-5">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center justify-center">
            {/* <!-- Page content here --> */}
            <label
              for="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden"
            >
              Links
            </label>
          </div>
          <div className="drawer-side">
            <label for="my-drawer-2" className="drawer-overlay"></label>
            <ul className="menu p-4 w-80 bg-base-100 bg-base-300">
              {/* <!-- Sidebar content here --> */}
              <li>
                <a>My Connections</a>
              </li>
              <li>
                <a>My Communities</a>
              </li>
              <li>
                <a>Forums</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="col-span-3 row-span-8 bg-base-300 rounde-lg h-min-44 m-6 mt-2 ml-10">
          <div className="m-4">
            <PostForm />
          </div>
          <div className="Feed-Containter grid grid-cols-1 bg-base-300 overflow-scroll max-h-screen  rounded p-4">
            {feed.map((feed) => (
              <div className="Card  bg-base-100 shadow-xl p-5 m-4 rounded">
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img
                      src={
                        feed.entity.user
                          ? feed.entity.user.profPic
                          : feed.entity.company
                          ? feed.entity.company.profPic
                          : feed.entity.school
                          ? feed.entity.school.profPic
                          : "https://png.pngtree.com/png-vector/20190221/ourlarge/pngtree-female-user-vector-avatar-icon-png-image_691506.jpg"
                      }
                    />
                  </div>
                  <h2 className="card-title text-center ml-5">
                    {feed.entity.user
                      ? feed.entity.user.firstName +
                        " " +
                        feed.entity.user.lastName
                      : feed.entity.company
                      ? feed.entity.company.name
                      : feed.entity.school
                      ? feed.entity.school.name
                      : "User Not Found"}
                  </h2>
                </div>
                <p className="bg-base-300  rounded p-5 my-2">{feed.postBody}</p>
                <div className="flex justify-end">
                  {/* <div className="mt-1 bg-base-300 rounded-lg p-1">
                    {feed.reactionCounts.map((reaction) => (
                      <div className="indicator">
                        <span className="indicator-item badge badge-secondary w-2 h-2 text-xs">
                          {reaction.count}
                        </span>
                        <div className="grid w-5 h-5 bg-base-300 place-items-center">
                          {String.fromCodePoint(reaction.icon)}
                        </div>
                      </div>
                    ))}
                  </div> */}
                  <ReactionForm
                    postId={feed._id}
                    counts={feed.reactionCounts}
                    reactions={reactions}
                  />
                </div>
                <div>
                  <h2>
                    <b>Comments:</b>
                  </h2>
                  {feed.comments.map((comment) => (
                    <div className="Card  bg-base-100 shadow-xl p-5 m-4 rounded-lg">
                      <div className="avatar">
                        <div className="w-12 rounded-full">
                          <img
                            src={
                              comment.entity.user
                                ? comment.entity.user.profPic
                                : comment.entity.company
                                ? comment.entity.company.profPic
                                : comment.entity.school
                                ? comment.entity.school.profPic
                                : "https://png.pngtree.com/png-vector/20190221/ourlarge/pngtree-female-user-vector-avatar-icon-png-image_691506.jpg"
                            }
                          />
                        </div>
                        <h2 className="card-title text-center ml-5">
                          {comment.entity.user
                            ? comment.entity.user.firstName +
                              " " +
                              comment.entity.user.lastName
                            : comment.entity.company
                            ? comment.entity.company.name
                            : comment.entity.school
                            ? comment.entity.school.name
                            : "User Not Found"}
                        </h2>
                      </div>
                      <p className="bg-base-300 rounded p-5 my-2">
                        {comment.commentBody}
                      </p>
                      <div className="flex justify-end ">
                        <CommentReactionForm commentId={comment._id} />
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <CommentForm postId={feed._id} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="box col-span-2 rounded-md overflow-scroll max-h-screen m-4 bg-base-300 mt-2">
          <h1 className="text-4xl text-white m-2 text-center rounded  ">
            Recent Job Postings
          </h1>
          {jobs &&
            jobs.map((job) => (
              <div key={job._id}>
                <div className="card bg-base-100 m-3">
                  <h2 className="card-title  m-2">{job.title}</h2>
                  <p className="  h-12 truncate pl-3 pr-12">
                    {job.description}
                  </p>
                  <div className="card-actions justify-end">
                    <label
                      htmlFor={job._id}
                      className="modal-button btn btn-sm btn-primary m-2"
                    >
                      Read More
                    </label>
                  </div>
                </div>
                <input type="checkbox" id={job._id} className="modal-toggle " />
                <div className="modal">
                  <div className="modal-box relative max-w-5xl">
                    <label
                      htmlFor={job._id}
                      className="btn btn-sm btn-circle absolute left-2 top-2"
                    >
                      ✕
                    </label>
                    <h3 className="p-5 m-4 font-bold text-white text-5xl">
                      {job.title}
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      <ul className="p-3 m-5 shadow-xl ">
                        <h3 className="font-bold text-white text-3xl">
                          Qualifications
                        </h3>
                        <li>{job.qualifications}</li>
                      </ul>

                      <div className="p-3 m-5 shadow-xl">
                        <h3 className="font-bold text-white text-3xl m-2">
                          Description
                        </h3>
                        <p>{job.description}</p>
                      </div>
                      <div className="p-3 m-5 shadow-xl">
                        <h3 className="font-bold text-white text-3xl m-2">
                          Responsibilities
                        </h3>
                        <p>{job.responsibilities}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 place-content-between">
                      <div className="p-3 m-5 shadow-xl">
                        <h2 className="font-bold text-white text-4xl m-2">
                          Salary
                        </h2>
                        <p className="text-xl text-center ">{job.salary}K</p>
                      </div>
                      <div className="p-3 m-5 shadow-xl">
                        <ul>
                          <h2 className="font-bold text-white text-4xl m-2">
                            Benefits
                          </h2>
                          <li>{job.benefits}</li>
                        </ul>
                      </div>
                      <button className="btn btn-md btn-primary">
                        One Click Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
