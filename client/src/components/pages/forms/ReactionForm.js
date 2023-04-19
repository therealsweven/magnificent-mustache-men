import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useMutation } from "@apollo/client";
import { CREATE_REACTION } from "../../../utils/mutations";
import * as Yup from "yup";

export default function ReactionForm() {
  const [createUser] = useMutation(CREATE_REACTION);

  const initialValues = {
    reactionName: "",
    icon: "",
  };

  const validationSchema = Yup.object().shape({
    reactionName: Yup.string().required("This field is required"),
    icon: Yup.string().required("This field is required")
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      await createReaction({
        variables: {
          reactionName: values.reactionName,
          icon: values.icon
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
          <div>
            <label htmlFor="reactionName">Reaction Name</label>
            <Field type="text" name="reactionName" />
            <ErrorMessage name="reactionName" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="icon">Icon</label>
            <Field type="text" name="icon" />
            <ErrorMessage name="icon" component="div" className="error" />
          </div>

          <button className="btn" type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}
