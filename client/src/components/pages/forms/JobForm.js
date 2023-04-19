import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useMutation } from "@apollo/client";
import { CREATE_JOB } from "../../../utils/mutations";
import * as Yup from "yup";

export default function JobForm() {
  const [createJob] = useMutation(CREATE_JOB);

  const initialValues = {
    title: "",
    responsibilities: "",
    qualifications: "",
    schedule: "",
    salary: "",
    benefits: "",
  };

  const validationSchema = Yup.object.shape({
    title: Yup.string().required("This field is required"),
    responsibilities: Yup.string().required("This field is required"),
    qualifications: Yup.string().required("This field is required"),
    schedule: Yup.string().required("This field is required"),
    salary: Yup.number()
      .typeError("This must be a number")
      .required("This is a required field"),
    benefits: Yup.string().required("This field is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await createJob({
        variables: {
          input: values,
        },
      });
      console.log("job posted");
      setSubmitting(false);
    } catch (err) {
      console.error(err);
      setSubmitting(false);
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
          <div>
            <label htmlFor="title">Title</label>
            <Field type="text" name="title" />
            <ErrorMessage name="title" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="responsibilities">Responsibilities</label>
            <Field type="text" name="responsibilities" />
            <ErrorMessage
              name="responsibilities"
              component="div"
              className="error"
            />
          </div>
          <div>
            <label htmlFor="qualifications">Qualifications</label>
            <Field type="text" name="qualifications" />
            <ErrorMessage
              name="qualifications"
              component="div"
              className="error"
            />
          </div>
          <div>
            <label htmlFor="schedule">Schedule</label>
            <Field type="text" name="schedule" />
            <ErrorMessage name="schedule" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="salary">Salary</label>
            <Field type="number" name="salary" />
            <ErrorMessage name="salary" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="benefits">Benefits</label>
            <Field type="text" name="benefits" />
            <ErrorMessage name="benefits" component="div" className="error" />
          </div>
          <button className="btn" type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}
