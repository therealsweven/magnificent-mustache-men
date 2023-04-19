import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useMutation } from "@apollo/client";
import { CREATE_EXPERIENCE } from "../../../utils/mutations"
import * as Yup from "yup";

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

const ExperienceForm = () => {
  const [createExperience] = useMutation(CREATE_EXPERIENCE);

const initialValues = {
  company: '',
  title: '',
  jobDescription: '',
  skills:  [],
  startMonth: '',
  startYear: '',
  current: false,
  endMonth: '',
  endYear: '',
};

const onSubmit = async (values, { setSubmitting }) => {
  try {
    await createExperience({
      variables: {
        experience: values,
      },
    });
    console.log('experience recorded')
    setSubmitting(false);
  } catch (err) {
    console.error(err);
    setSubmitting(false);
  }
};


  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {" "}
      {({ values, isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="company">Company</label>
            <Field type="text" name="company" />
            <ErrorMessage name="company" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="title">Title</label>
            <Field type="text" name="title" />
            <ErrorMessage name="title" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="startMonth">Start Month</label>
            <Field type="text" name="startMonth" />
            <ErrorMessage name="startMonth" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="startYear">Start Year</label>
            <Field type="number" name="starYear" />
            <ErrorMessage name="starYear" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="current">Current</label>
            <Field type="checkbox" name="current" />
            <ErrorMessage name="current" />
          </div>

          {values.current ? (
            <>
              <div>
                <label htmlFor="endMonth">End Month</label>
                <Field type="text" name="endMonth" disabled />
                <ErrorMessage
                  name="endMonth"
                  component="div"
                  className="error"
                />
              </div>
              <div>
                <label htmlFor="endYear">end Year</label>
                <Field type="number" name="endYear" disabled />
                <ErrorMessage
                  name="endYear"
                  component="div"
                  className="error"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label htmlFor="endMonth">End Month</label>
                <Field type="text" name="endMonth" />
                <ErrorMessage
                  name="endMonth"
                  component="div"
                  className="error"
                />
              </div>
              <div>
                <label htmlFor="endYear">end Year</label>
                <Field type="number" name="endYear" />
                <ErrorMessage
                  name="endYear"
                  component="div"
                  className="error"
                />
              </div>
            </>
          )}

          <button type="submit" disabled={isSubmitting}>
            Subtmit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ExperienceForm
