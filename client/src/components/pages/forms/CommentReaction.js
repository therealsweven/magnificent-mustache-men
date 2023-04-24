import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_COMMENT_REACTION } from "../../../utils/mutations";
import { QUERY_REACTIONS, QUERY_COMMENT } from "../../../utils/queries";

export default function CommentReactionForm({ commentId }) {
  const { loading, data } = useQuery(QUERY_REACTIONS);
  const {
    loading: commentLoading,
    data: commentData,
    refetch,
  } = useQuery(QUERY_COMMENT, { variables: { commentId: commentId } });
  const [createCommentReaction] = useMutation(CREATE_COMMENT_REACTION);
  const reactions = data?.reactions || [];
  let comment = commentData?.comment || [];

  // if (!commentLoading) {
  //   console.log(commentData);
  //   console.log(reactions);

  //   comment = JSON.parse(JSON.stringify(comment));
  //   comment.reactionCounts = [];
  //   console.log(reactions);
  //   reactions.forEach((reaction) => {
  //     const count = comment.reactions.filter(
  //       (r) => r.reactionId?._id == reaction._id
  //     );
  //     console.log(count);
  //     const countReac = {
  //       _id: reaction._id,
  //       count: count.length,
  //       icon: reaction.icon,
  //     };
  //     console.log(countReac);
  //     comment.reactionCounts.push(countReac);
  //   });
  //   console.log(comment.reactionCounts);
  //   console.log(comment);
  // }

  const handleReaction = async (e) => {
    try {
      console.log(e.target.id);
      console.log(commentId);
      await createCommentReaction({
        variables: {
          reactionId: e.target.id,
          commentId: commentId,
        },
      });
      console.log("reaction posted");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>...loading</h2>;
  }

  if (!loading) {
    return (
      <div className="bg-base-300 rounded-lg px-1">
        {/* {comment.reactionCounts
          ? comment.reactionCounts.map((r) => (
              <div className="indicator">
                {r.count ? (
                  <span className="indicator-item w-2 h-4 badge badge-secondary">
                    {r.count}
                  </span>
                ) : (
                  <></>
                )}
                <button
                  id={r._id}
                  className="grid w-5 h-5 bg-base-300 place-items-center m-1 mt-2"
                  onClick={handleReaction}
                >
                  {String.fromCodePoint(r.icon)}
                </button>
              </div>
            ))
          : reactions.map((reaction) => (
              <button id={reaction._id} onClick={handleReaction}>
                {String.fromCodePoint(reaction.icon)}
              </button>
            ))} */}
        {reactions.map((reaction) => (
          <button id={reaction._id} onClick={handleReaction}>
            {String.fromCodePoint(reaction.icon)}
          </button>
        ))}
      </div>
    );
  }
}
