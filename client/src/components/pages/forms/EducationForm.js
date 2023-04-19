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
          <div>
            <label htmlFor="school">School</label>
            <Field type="text" name="school" />
            <ErrorMessage name="school" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="fieldOfStudy">Field of Study</label>
            <Field type="text" name="fieldOfStudy" />
            <ErrorMessage
              name="fieldOfStudy"
              component="div"
              className="error"
            />
          </div>
          <div>
            <label htmlFor="certificateType">Type of Certificate</label>
            <Field type="text" name="fieldofStudy" />
            <ErrorMessage
              name="fieldofStudy"
              component="div"
              className="error"
            />
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
                <label htmlFor="endYear">End Year</label>
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
                <label htmlFor="endYear">End Year</label>
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
}
