import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../../utils/mutations";
import Auth from "../../../utils/auth";
import * as Yup from "yup";

export default function LoginForm() {
  const [login, { error, data }] = useMutation(LOGIN);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email/password")
      .required("This field is required"),
    password: Yup.string().required("This field is required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values) => {
    try {
      const { input } = await login({
        variables: {
          email: values.email,
          password: values.password,
        },
      });
      console.log(data.login.user);
      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
    }
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
            <label className="label" htmlFor="password">
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
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
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
