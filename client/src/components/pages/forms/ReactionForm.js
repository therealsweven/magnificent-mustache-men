import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_POST_REACTION } from "../../../utils/mutations";
import { QUERY_REACTIONS } from "../../../utils/queries";

export default function ReactionForm({ postId, counts }) {
  const { loading, data, refetch } = useQuery(QUERY_REACTIONS);
  const [createPostReaction] = useMutation(CREATE_POST_REACTION);

  const Reactions = data?.reactions || [];
  if (!loading) {
  }

  const handleReaction = async (e) => {
    try {
      console.log(e.target);
      await createPostReaction({
        variables: {
          reactionId: e.target.id,
          postId: postId,
        },
      });
      console.log("reaction posted");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-base-300 rounded-lg p-1">
      {Reactions.map((reaction) => (
        <button id={reaction._id} onClick={handleReaction}>
          {String.fromCodePoint(reaction.icon)}
        </button>
      ))}
      {/* {counts.map((reaction) => (
        <div className="indicator">
          <span className="indicator-item badge badge-secondary w-2 h-2 text-xs">
            {reaction.count}
          </span>
          <button id={reaction._id} onClick={handleReaction}>
            {String.fromCodePoint(reaction.icon)}
          </button>
        </div>
      ))} */}
    </div>
  );
}
