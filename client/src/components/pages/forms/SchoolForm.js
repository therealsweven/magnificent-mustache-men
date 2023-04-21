import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useMutation } from "@apollo/client";
import { CREATE_SCHOOL } from "../../../utils/mutations";
import * as Yup from "yup";
import states from "../../../utils/statearray.json"

export default function SchoolForm() {
  const [createSchool] = useMutation(CREATE_SCHOOL);

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
      console.log(values)
      await createSchool({
        variables: {
          name: values.name,
          city: values.city,
          state: values.state,
          bio: values.bio,
          foundedYear: values.foundedYear,
          studentBody: values.studentBody,
          website: values.website
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
          <div className="form-control">
            <label className="label" htmlFor="name">
              <span className="label-text">Name</span>
            </label>
            <Field className="input input-bordered" type="text" name="name" />
            <ErrorMessage name="name" component="div" className="error" />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="city">
              <span className="label-text">City</span>
            </label>
            <Field className="input input-bordered" type="text" name="city" />
            <ErrorMessage name="city" component="div" className="error" />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="state">
              <span className="label-text">State</span>
            </label>
            <Field className="input input-bordered" as="select" type="text" name="state">
            <option value="">Select an State</option>
              {states.map((state) => (
                <option key={state.name} value={state.name}>
                  {state.name}
                </option>
              ))}
            </Field>
            <ErrorMessage name="state" component="div" className="error" />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="bio">
              <span className="label-text">Bio</span>
            </label>
            <Field
              className="input input-bordered"
              type="bio"
              as="textarea"
              name="bio"
            />
            <ErrorMessage name="bio" component="div" className="error" />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="foundedYear">
              <span className="label-text">Founded Year</span>
            </label>
            <Field
              className="input input-bordered"
              type="number"
              name="foundedYear"
            />
            <ErrorMessage
              name="foundedYear"
              component="div"
              className="error"
            />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="studentBody">
              <span className="label-text">Student Body</span>
            </label>
            <Field
              className="input input-bordered"
              type="number"
              name="studentBody"
            />
            <ErrorMessage
              name="studentBody"
              component="div"
              className="error"
            />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="website">
              <span className="label-text">Website</span>
            </label>
            <Field
              className="input input-bordered"
              type="text"
              name="website"
            />
            <ErrorMessage name="website" component="div" className="error" />
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
