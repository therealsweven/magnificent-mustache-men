import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../../../utils/mutations";
import * as Yup from "yup";

export default function PostForm() {
  const [createUser] = useMutation(CREATE_POST);

  const initialValues = {
    postBody: "",
  };

  const validationSchema = Yup.object().shape({
    postBody: Yup.string().required("This field is required"),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      await createPost({
        variables: {
          postBody: values.postBody,
        },
      });
      resetForm();
      console.log("post created");
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
            <label htmlFor="postBody">Post</label>
            <Field type="text" as="textarea" name="postBody" />
            <ErrorMessage name="postBody" component="div" className="error" />
          </div>

          <button className="btn" type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}
