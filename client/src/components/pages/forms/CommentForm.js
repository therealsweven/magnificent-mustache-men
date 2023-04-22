import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useMutation } from "@apollo/client";
import { CREATE_COMMENT } from "../../../utils/mutations";
import * as Yup from "yup";

export default function CommentForm({ postId }) {
  const [createComment] = useMutation(CREATE_COMMENT);

  const initialValues = {
    commentBody: "",
  };

  const validationSchema = Yup.object().shape({
    commentBody: Yup.string().required("This field is required"),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      console.log(values.commentBody);
      console.log(postId);
      await createComment({
        variables: {
          postId: postId,
          commentBody: values.commentBody,
        },
      });

      resetForm();
      console.log("comment posted");
    } catch (err) {
      console.error(err);
    }
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="form-control">
            <label className="label" htmlFor="commentBody">
              <span className="label-text">Comment</span>
            </label>
            <Field
              className="input input-bordered"
              type="text"
              as="textarea"
              name="commentBody"
            />
            <ErrorMessage
              name="commentBody"
              component="div"
              className="error"
            />
          </div>
          <div className="form-control mt-6">
            <button
              className="btn btn-primary"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
