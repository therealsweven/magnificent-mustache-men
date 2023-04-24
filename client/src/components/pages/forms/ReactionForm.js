import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_POST_REACTION } from "../../../utils/mutations";
import { QUERY_REACTIONS } from "../../../utils/queries";

export default function ReactionForm({ postId }) {
  const { loading, data, refetch } = useQuery(QUERY_REACTIONS);
  const [createPostReaction] = useMutation(CREATE_POST_REACTION);

  const reactions = data?.reactions || [];
  if (!loading) {
  }

  const handleReaction = async (e) => {
    try {

      await createPostReaction({
        variables: {
          reactionId: e.target.id,
          postId: postId,
        },
      });
      console.log("reaction posted");
      await refetch();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {/* <h1>REACTION </h1> */}
      <div>
        {reactions.map((reaction) => (
          <button id={reaction._id} onClick={handleReaction}>
            {String.fromCodePoint(reaction.icon)}
          </button>
        ))}
      </div>
    </div>
  );
}
