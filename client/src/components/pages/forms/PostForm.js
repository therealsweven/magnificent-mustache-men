import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../../../utils/mutations";
import * as Yup from "yup";

export default function PostForm() {
  const [createPost] = useMutation(CREATE_POST);

  const initialValues = {
    postBody: "",
  };

  const validationSchema = Yup.object().shape({
    postBody: Yup.string().required("This field is required"),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      console.log(values.postBody);
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
          <div className="form-control">
            <label className="label" htmlFor="postBody">
              <span className="label-text text-3xl text-white">What You Have Been Up To</span>
            </label>
            <Field
              className="input input-bordered"
              type="text"
              as="textarea"
              name="postBody"
            />
            <ErrorMessage name="postBody" component="div" className="error" />
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
