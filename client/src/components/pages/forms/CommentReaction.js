import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_COMMENT_REACTION } from "../../../utils/mutations";
import { QUERY_REACTIONS } from "../../../utils/queries";

export default function CommentReactionForm({ commentId }) {
  const { loading, data } = useQuery(QUERY_REACTIONS);
  const [createCommentReaction] = useMutation(CREATE_COMMENT_REACTION);

  const reactions = data?.reactions || [];
  if (!loading) {
    console.log(reactions);
    console.log(reactions[0].icon);
  }

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

  return (
    <div className="bg-base-300 rounded-lg px-1">
      {reactions.map((reaction) => (
        <button id={reaction._id} onClick={handleReaction}>
          {String.fromCodePoint(reaction.icon)}
        </button>
      ))}
    </div>
  );
}
