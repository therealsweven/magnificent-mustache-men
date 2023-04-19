import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useMutation } from "@apollo/client";
import { CREATE_SCHOOL } from "../../../utils/mutations";
import * as Yup from "yup";

export default function SchoolForm() {
  const [createCompany] = useMutation(CREATE_SCHOOL);

  const initialValues = {
    name: "",
    city: "",
    state: "",
    bio: "",
    foundedYear: "",
    studentBody: "",
    website: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("This is a required field"),
    city: Yup.string().required("This is a required field"),
    state: Yup.string().required("This is a required field"),

    bio: Yup.string().required("This is a required field"),
    foundedYear: Yup.number()
      .typeError("This must be a number")
      .required("This is a required field"),
    studentBody: Yup.number()
      .typeError("This must be a number")
      .required("This is a required field"),
    website: Yup.string()
      .required("This is a required field")
      .url("This must be a valid site"),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      await createSchool({
        variables: {
          input: values,
        },
      });
      resetForm();
      console.log("school registered");
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
            <label htmlFor="name">Name</label>
            <Field type="text" name="name" />
            <ErrorMessage name="name" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="city">City</label>
            <Field type="text" name="city" />
            <ErrorMessage name="city" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="state">State</label>
            <Field type="text" name="state" />
            <ErrorMessage name="state" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="bio">Bio</label>
            <Field type="bio" as="textarea" name="bio" />
            <ErrorMessage name="bio" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="foundedYear">Founded Year</label>
            <Field type="number" name="foundedYear" />
            <ErrorMessage
              name="foundedYear"
              component="div"
              className="error"
            />
          </div>
          <div>
            <label htmlFor="studentBody">Student Body</label>
            <Field type="number" name="studentBody" />
            <ErrorMessage
              name="studentBody"
              component="div"
              className="error"
            />
          </div>
          <div>
            <label htmlFor="website">Website</label>
            <Field type="text" name="website" />
            <ErrorMessage name="website" component="div" className="error" />
          </div>
          <button className="btn" type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}
