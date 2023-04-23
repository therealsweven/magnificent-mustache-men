import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../../utils/mutations";
import * as Yup from "yup";
import states from "../../../utils/statearray.json";

export default function UserInfoForm({ initialValues }) {
  const [updateUser] = useMutation(UPDATE_USER);

  const validationSchema = Yup.object().shape({
    city: Yup.string(),
    state: Yup.string(),
    country: Yup.string(),
    bio: Yup.string().max(500)

  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      await updateUser({
        variables: {
          city: values.city,
          state: values.state,
          country: values.country,
          bio: values.bio,
        },
      });
      resetForm();
      console.log("user updated");
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
            <label className="label" htmlFor="city">
              <span className="label-text">City</span>
            </label>
            <Field
              className="input input-bordered"
              type="text"
              name="city"
            />
            <ErrorMessage name="city" component="div" className="error" />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="state">
              <span className="label-text">State</span>
            </label>
            <Field
              className="input input-bordered"
              as="select"
              type="text"
              name="state"
            >
              <option value="">Select a State</option>
              {states.map((state) => (
                <option key={state.name} value={state.name}>
                  {state.name}
                </option>
              ))}
            </Field>
            <ErrorMessage name="state" component="div" className="error" />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="country">
              <span className="label-text">Country</span>
            </label>
            <Field className="input input-bordered" type="text" name="country" />
            <ErrorMessage name="country" component="div" className="error" />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="bio">
              <span className="label-text">About Me</span>
            </label>
            <Field
              className="input input-bordered"
              type="text"
              name="bio"
            />
            <ErrorMessage name="bio" component="div" className="error" />
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
