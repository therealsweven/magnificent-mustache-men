import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useMutation } from "@apollo/client";
import { CREATE_EDUCATION } from "../../../utils/mutations";
import * as Yup from "yup";

export default function EducationForm() {
  const [createEducation] = useMutation(CREATE_EDUCATION);

  const initialValues = {
    school: "",
    fieldOfStudy: "",
    certificateType: "",
    skills: [],
    startMonth: "",
    startYear: "",
    current: false,
    endMonth: "",
    endYear: "",
  };

  const validationSchema = Yup.object().shape({
    school: Yup.string().required("This is a required field"),
    fieldOfStudy: Yup.string().required("This is a required field"),
    certificateType: Yup.string().required("This is a required field"),
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
      await createEducation({
        variables: {
          input: values,
        },
      });
      console.log("education recorded");
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
      {" "}
      {({ values, isSubmitting }) => (
        <Form>
          <div className="form-control">
            <label className="label" htmlFor="school">
              <span className="label-text">School</span>
            </label>
            <Field className="input input-bordered" type="text" name="school" />
            <ErrorMessage name="school" component="div" className="error" />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="fieldOfStudy">
              <span className="label-text">Field of Study</span>
            </label>
            <Field
              className="input input-bordered"
              type="text"
              name="fieldOfStudy"
            />
            <ErrorMessage
              name="fieldOfStudy"
              component="div"
              className="error"
            />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="certificateType">
              <span className="label-text">Type of Certificate</span>
            </label>
            <Field
              className="input input-bordered"
              type="text"
              name="fieldofStudy"
            />
            <ErrorMessage
              name="fieldofStudy"
              component="div"
              className="error"
            />
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
