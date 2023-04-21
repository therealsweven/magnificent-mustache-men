import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useMutation } from "@apollo/client";
import { CREATE_JOB } from "../../../utils/mutations";
import * as Yup from "yup";

export default function JobForm() {
  const [createJob] = useMutation(CREATE_JOB);

  const initialValues = {
    title: "",
    description: "",
    responsibilities: "",
    qualifications: "",
    schedule: "",
    salary: "",
    benefits: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("This field is required"),
    responsibilities: Yup.string().required("This field is required"),
    description: Yup.string().required("This field is required"),
    qualifications: Yup.string().required("This field is required"),
    schedule: Yup.string().required("This field is required"),
    salary: Yup.number()
      .typeError("This must be a number")
      .required("This is a required field"),
    benefits: Yup.string().required("This field is required"),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      console.log(values);
      await createJob({
        variables: {
          title: values.title,
          description: values.description,
          responsibilities: values.responsibilities,
          qualifications: values.qualifications,
          schedule: values.schedule,
          salary: values.salary,
          benefits: values.benefits,
        },
      });
      resetForm();
      console.log("job posted");
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
            <label className="label" htmlFor="title">
              <span className="label-text">Title</span>
            </label>
            <Field className="input input-bordered" type="text" name="title" />
            <ErrorMessage name="title" component="div" className="error" />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="description">
              <span className="label-text">Description</span>
            </label>
            <Field
              className="input input-bordered"
              type="text"
              name="description"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="error"
            />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="responsibilities">
              <span className="label-text">Responsibilities</span>
            </label>
            <Field
              className="input input-bordered"
              type="text"
              name="responsibilities"
            />
            <ErrorMessage
              name="responsibilities"
              component="div"
              className="error"
            />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="qualifications">
              <span className="label-text">Qualifications</span>
            </label>
            <Field
              className="input input-bordered"
              type="text"
              name="qualifications"
            />
            <ErrorMessage
              name="qualifications"
              component="div"
              className="error"
            />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="schedule">
              <span className="label-text">Schedule</span>
            </label>
            <Field
              className="input input-bordered"
              type="text"
              name="schedule"
            />
            <ErrorMessage name="schedule" component="div" className="error" />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="salary">
              <span className="label-text">Salary</span>
            </label>
            <Field
              className="input input-bordered"
              type="number"
              name="salary"
            />
            <ErrorMessage name="salary" component="div" className="error" />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="benefits">
              <span className="label-text">Benefits</span>
            </label>
            <Field
              className="input input-bordered"
              type="text"
              name="benefits"
            />
            <ErrorMessage name="benefits" component="div" className="error" />
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
