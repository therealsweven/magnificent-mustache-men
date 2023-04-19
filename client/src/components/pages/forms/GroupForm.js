import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useMutation } from "@apollo/client";
import { CREATE_GROUP } from "../../../utils/mutations";
import * as Yup from "yup";

export default function GroupForm() {
  const [createUser] = useMutation(CREATE_GROUP);

  const initialValues = {
    name: "",
    private: false,
    joinQuestion: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("This field is required"),
    private: Yup.boolean().required("This field is required"),
    joinQuestion: Yup.string(),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      await createUser({
        variables: {
          name: values.name,
          private: values.private,
          joinQuestion: values.joinQuestion,
        },
      });
      resetForm();
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
          <div>
            <label htmlFor="name">Group Name</label>
            <Field type="text" name="name" />
            <ErrorMessage name="name" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="private"></label>
            <Field type="checkbox" name="private" />
            <ErrorMessage name="private" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="joinQuestion">
              Create a statement to ask for users to join
            </label>
            <Field type="text" name="joinQuestion" />
            <ErrorMessage
              name="joinQuestion"
              component="div"
              className="error"
            />
          </div>

          <button className="btn" type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}
