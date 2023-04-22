import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useMutation } from "@apollo/client";
import { CREATE_POST_REACTION } from "../../../utils/mutations";
import * as Yup from "yup";

export default function ReactionForm() {
  const [createPostReaction] = useMutation( CREATE_POST_REACTION );

  const initialValues = {
    reactionName: "",
    icon: "",
  };

  const validationSchema = Yup.object().shape({
    reactionName: Yup.string().required("This field is required"),
    icon: Yup.string().required("This field is required"),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      await createPostReaction({
        variables: {
          reactionName: values.reactionName,
          icon: values.icon,
        },
      });
      resetForm();
      console.log("reaction posted");
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
            <label className="label" htmlFor="reactionName">
              <span className="label-text">Reaction Name</span>
            </label>
            <Field
              className="input input-bordered"
              type="text"
              name="reactionName"
            />
            <ErrorMessage
              name="reactionName"
              component="div"
              className="error"
            />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="icon">
              <span className="label-text">Icon</span>
            </label>
            <Field className="input input-bordered" type="text" name="icon" />
            <ErrorMessage name="icon" component="div" className="error" />
          </div>

          <button
            className="btn btn-primary"
            type="submit"
            disabled={isSubmitting}
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}
