import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../../utils/mutations";
import * as Yup from "yup";

export default function UserForm() {
  const [createUser] = useMutation(CREATE_USER);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("This field is required"),
    lastName: Yup.string().required("This field is required"),
    email: Yup.string()
      .email("Email address not formatted correctly")
      .required("This field is required"),
    password: Yup.string()
      .required("This field is required")
      .min(5, "Your password must be more than 5 characters"),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      await createUser({
        variables: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
        },
      });
      resetForm();
      console.log("user created");
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
            <label className="label" htmlFor="firstName">
              <span className="label-text">First Name</span>
            </label>
            <Field
              className="input input-bordered"
              type="text"
              name="firstName"
            />
            <ErrorMessage name="firstName" component="div" className="error" />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="lastName">
              <span className="label-text">Last Name</span>
            </label>
            <Field
              className="input input-bordered"
              type="text"
              name="lastName"
            />
            <ErrorMessage name="lastName" component="div" className="error" />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="email">
              <span className="label-text">Email</span>
            </label>
            <Field className="input input-bordered" type="email" name="email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="password">
              <span className="label-text">Password</span>
            </label>
            <Field
              className="input input-bordered"
              type="password"
              name="password"
            />
            <ErrorMessage name="password" component="div" className="error" />
          </div>
          <div className="form-control mt-6">
            <button
              className="btn btn-primary"
              type="submit"
              disabled={isSubmitting}
            >
              Sign Up
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
