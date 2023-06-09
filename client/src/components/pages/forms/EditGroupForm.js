import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useMutation } from "@apollo/client";
import { UPDATE_GROUP } from "../../../utils/mutations";
import * as Yup from "yup";

export default function EditGroupForm({initialValues, setIsEditing}) {
  const [updateGroup] = useMutation(UPDATE_GROUP);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("This field is required"),
    private: Yup.boolean().required("This field is required"),
    joinQuestion: Yup.string(),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      await updateGroup({
        variables: {
          name: values.name,
          private: values.private,
          joinQuestion: values.joinQuestion,
        },
      });
      resetForm();
      setIsEditing("")
      console.log("group created");
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
            <label className="label" htmlFor="name">
              <span className="label-text">Group Name</span>
            </label>
            <Field className="input input-bordered" type="text" name="name" />
            <ErrorMessage name="name" component="div" className="error" />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="private">
              <span className="label-text">Private?</span>
            </label>
            <Field
              className="input input-bordered"
              type="checkbox"
              name="private"
            />
            <ErrorMessage name="private" component="div" className="error" />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="joinQuestion">
              <span className="label-text">
                Create a statement to ask for users to join
              </span>
            </label>
            <Field
              className="input input-bordered"
              type="text"
              name="joinQuestion"
            />
            <ErrorMessage
              name="joinQuestion"
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
