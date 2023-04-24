import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_EXPERIENCE } from "../../../utils/mutations";
import * as Yup from "yup";
import { QUERY_COMPANIES } from "../../../utils/queries";
import months from "../../../utils/months.json";

export default function EditExperienceForm({ initialValues }) {
  const [updateExperience] = useMutation(UPDATE_EXPERIENCE);

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
      then: () => Yup.string().required("This is a required field"),
      otherwise: () => Yup.string().notRequired(),
    }),
    endYear: Yup.number().when("current", {
      is: false,
      then: () =>
        Yup.number()
          .typeError("This must be a number")
          .required("This is a required field"),
      otherwise: () => Yup.number().notRequired(),
    }),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      console.log(values);

      let variables = {
        expId: values.expId,
        company: values.company,
        title: values.title,
        jobDescription: values.jobDescription,
        startMonth: values.startMonth,
        startYear: values.startYear,
        current: values.current,
      };

      if (!values.current) {
        variables.endMonth = values.endMonth;
        variables.endYear = values.endYear;
      }
      console.log("line 71 ", variables);
      await updateExperience({
        variables: variables,
      });
      console.log("experience recorded");
      resetForm();
    } catch (err) {
      console.error(err);
      setSubmitting(false);
    }
  };

  const { loading, data } = useQuery(QUERY_COMPANIES);
  const companydata = [data];
  if (loading) {
    return <h2>...loading</h2>;
  }
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
              as="select"
              type="text"
              name="company"
            >
              <option value="">Select a Company</option>
              {companydata.map((company, index) => (
                <optgroup key={index}>
                  {company.companies.map((comp, compindex) => (
                    <option key={compindex} value={comp._id}>
                      {comp.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </Field>
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
            <label className="label" htmlFor="title">
              <span className="label-text">Job Description</span>
            </label>
            <Field
              className="input input-bordered"
              type="text"
              name="jobDescription"
            />
            <ErrorMessage
              name="jobDescription"
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
            >
              <option>Select a Month</option>
              {months.map((month) => (
                <option key={month.name} value={month.name}>
                  {month.name}
                </option>
              ))}
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
                  disabled
                >
                  <option>Select a Month</option>
                  {months.map((month) => (
                    <option key={month.name} value={month.name}>
                      {month.name}
                    </option>
                  ))}
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
                  disabled
                >
                  <option>Select a Month</option>
                  {months.map((month) => (
                    <option key={month.name} value={month.name}>
                      {month.name}
                    </option>
                  ))}
                </Field>
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
              // onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
