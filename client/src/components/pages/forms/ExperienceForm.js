import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useMutation } from "@apollo/client";
import { CREATE_EXPERIENCE } from "../../../utils/mutations";
import * as Yup from "yup";

export default function ExperienceForm() {
  const [createExperience] = useMutation(CREATE_EXPERIENCE);

  const initialValues = {
    company: "",
    title: "",
    jobDescription: "",
    skills: [],
    startMonth: "",
    startYear: "",
    current: false,
    endMonth: "",
    endYear: "",
  };

  const validationSchema = Yup.object().shape({
    company: Yup.string().required("This is a required field"),
    title: Yup.string().required("This is a required field"),
    jobDescription: Yup.string().required("This is a required field"),
    startMonth: Yup.string().required("This is a required field"),
    startYear: Yup.number()
      .typeError("This must be a number")
      .required("This is a required field"),
    current: Yup.boolean().required("This is a required field"),
    endMonth: Yup.string().when("current", {
      is: false,
      then: Yup.string().required("This is a required field"),
      otherwise: Yup.string().notRequired,
    }),
    endYear: Yup.number().when("current", {
      is: false,
      then: Yup.number()
        .typeError("This must be a number")
        .required("This is a required field"),
      otherwise: Yup.number().notRequired(),
    }),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await createExperience({
        variables: {
          input: values,
        },
      });
      console.log("experience recorded");
      setSubmitting(false);
    } catch (err) {
      console.error(err);
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ values, isSubmitting }) => (
        <Form>
          <div className="form-control">
            <label className="label" htmlFor="company">
              <span className="label-text">Company</span>
            </label>
            <Field
              className="input input-bordered"
              type="text"
              name="company"
            />
            <ErrorMessage name="company" component="div" className="error" />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="title">
              <span className="label-text">Title</span>
            </label>
            <Field className="input input-bordered" type="text" name="title" />
            <ErrorMessage name="title" component="div" className="error" />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="startMonth">
              <span className="label-text">Start Month</span>
            </label>
            <Field
              className="input input-bordered"
              type="text"
              name="startMonth"
            />
            <ErrorMessage name="startMonth" component="div" className="error" />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="startYear">
              <span className="label-text">Start Year</span>
            </label>
            <Field
              className="input input-bordered"
              type="number"
              name="starYear"
            />
            <ErrorMessage name="starYear" component="div" className="error" />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="current">
              <span className="label-text">Current</span>
            </label>
            <Field
              className="input input-bordered"
              type="checkbox"
              name="current"
            />
            <ErrorMessage name="current" />
          </div>

          {values.current ? (
            <>
              <div className="form-control">
                <label className="label" htmlFor="endMonth">
                  <span className="label-text">End Month</span>
                </label>
                <Field
                  className="input input-bordered"
                  type="text"
                  name="endMonth"
                  disabled
                />
                <ErrorMessage
                  name="endMonth"
                  component="div"
                  className="error"
                />
              </div>
              <div className="form-control">
                <label className="label" htmlFor="endYear">
                  <span className="label-text">End Year</span>
                </label>
                <Field
                  className="input input-bordered"
                  type="number"
                  name="endYear"
                  disabled
                />
                <ErrorMessage
                  name="endYear"
                  component="div"
                  className="error"
                />
              </div>
            </>
          ) : (
            <>
              <div className="form-control">
                <label className="label" htmlFor="endMonth">
                  <span className="label-text">End Month</span>
                </label>
                <Field
                  className="input input-bordered"
                  type="text"
                  name="endMonth"
                />
                <ErrorMessage
                  name="endMonth"
                  component="div"
                  className="error"
                />
              </div>
              <div className="form-control">
                <label className="label" htmlFor="endYear">
                  <span className="label-text">End Year</span>
                </label>
                <Field
                  className="input input-bordered"
                  type="number"
                  name="endYear"
                />
                <ErrorMessage
                  name="endYear"
                  component="div"
                  className="error"
                />
              </div>
            </>
          )}

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
