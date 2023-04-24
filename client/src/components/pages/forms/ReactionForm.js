import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_POST_REACTION } from "../../../utils/mutations";
import { QUERY_REACTIONS, QUERY_POST } from "../../../utils/queries";
import { lte } from "lodash";

export default function ReactionForm({ postId }) {
  const { loading, data } = useQuery(QUERY_REACTIONS);
  const {
    loading: postLoading,
    data: postData,
    refetch,
  } = useQuery(QUERY_POST, { variables: { postId: postId } });
  const [createPostReaction] = useMutation(CREATE_POST_REACTION);
  const reactions = data?.reactions || [];
  let post = postData?.post || [];
  if (!postLoading) {
    // console.log(postData);

    // console.log(reactions);

    post = JSON.parse(JSON.stringify(post));
    post.reactionCounts = [];
    // console.log(reactions);
    reactions.forEach((reaction) => {
      const count = post.reactions.filter(
        (r) => r.reactionId?._id == reaction._id
      );
      // console.log(count);
      const countReac = {
        _id: reaction._id,
        count: count.length,
        icon: reaction.icon,
      };
      // console.log(countReac);
      post.reactionCounts.push(countReac);
    });
    // console.log(post.reactionCounts);

    // console.log(post);
  }
  const handleReaction = async (e) => {
    try {
      // console.log(e.target.id);
      await createPostReaction({
        variables: {
          reactionId: e.target.id,
          postId: post._id,
        },
      });
      console.log("reaction posted");
      await refetch();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <>...Loading</>;
  }

  if (!loading) {
    return (
      <div className="bg-base-300 rounded-lg p-1">
        {post.reactionCounts ? (
          post.reactionCounts.map((r) => (
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
        ) : (
          <></>
        )}
      </div>
    );
  }
}
