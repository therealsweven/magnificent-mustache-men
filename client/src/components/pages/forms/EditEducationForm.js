import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_EDUCATION } from "../../../utils/mutations";
import * as Yup from "yup";
import { QUERY_SCHOOL } from "../../../utils/queries";
import months from "../../../utils/months.json"

export default function EducationForm({ initialValues }) {
  const [updateEducation] = useMutation(UPDATE_EDUCATION);

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
      then: () => Yup.string().required("This is a required field"),
      otherwise: () => Yup.string(),
    }),
    endYear: Yup.number().when("current", {
      is: false,
      then: () =>
        Yup.number()
          .typeError("This must be a number")
          .required("This is a required field"),
      otherwise: () => Yup.number(),
    }),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    console.log(values);
    try {
      let variables = {
        school: values.school,
        fieldOfStudy: values.fieldOfStudy,
        certificateType: values.certificateType,
        startMonth: values.startMonth,
        startYear: values.startYear,
        current: values.current,
      };
      if (!values.current) {
        variables.endMonth = values.endMonth;
        variables.endYear = values.endYear;
      }
      await updateEducation({
        variables: variables,
      });
      resetForm();
      console.log("education recorded");
    } catch (err) {
      console.error(err);
      setSubmitting(false);
    }
  };
  const { loading, data } = useQuery(QUERY_SCHOOL);
  const schools = [data];
  console.log(schools);
  if (loading) {
    return <h2>...loading</h2>;
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, isSubmitting }) => (
        <Form>
          <div className="form-control">
            <label className="label" htmlFor="school">
              <span className="label-text">School</span>
            </label>
            <Field
              className="input input-bordered"
              as="select"
              type="text"
              name="school"
            >
              <option>Select a school...</option>
              {schools.map((schoolGroup, groupIndex) => (
                <optgroup key={groupIndex} label={`Group ${groupIndex + 1}`}>
                  {schoolGroup.schools.map((school, schoolIndex) => (
                    <option key={schoolIndex} value={school._id}>
                      {school.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </Field>
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
              name="certificateType"
            />
            <ErrorMessage
              name="certificateType"
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
              as="select"
              type="text"
              name="startMonth"
            ><option>Select a Month</option>
            {months.map((month) =>
            <option key={month.name} value={month.name}>{month.name}</option>)}
            </Field>
            <ErrorMessage name="startMonth" component="div" className="error" />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="startYear">
              <span className="label-text">Start Year</span>
            </label>
            <Field
              className="input input-bordered"
              type="number"
              name="startYear"
            />
            <ErrorMessage name="startYear" component="div" className="error" />
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
              as="select"
              type="text"
              name="endMonth"
            ><option>Select a Month</option>
            {months.map((month) =>
            <option key={month.name} value={month.name}>{month.name}</option>)}
            </Field>
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
              as="select"
              type="text"
              name="endMonth"
            ><option>Select a Month</option>
            {months.map((month) =>
            <option key={month.name} value={month.name}>{month.name}</option>)}
            </Field>
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
