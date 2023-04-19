import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useMutation } from "@apollo/client";
import { CREATE_COMPANY } from "../../../utils/mutations";
import * as Yup from "yup";

export default function CompanyForm() {
  const [createCompany] = useMutation(CREATE_COMPANY);

  const initialValues = {
    name: "",
    industry: "",
    hqCity: "",
    hqState: "",
    website: "",
    bio: "",
    companySize: "",
    foundedYear: "",
    specialties: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("This is a required field"),
    industry: Yup.string(),
    hqCity: Yup.string().required("This is a required field"),
    hqState: Yup.string().required("This is a required field"),
    website: Yup.string()
      .required("This is a required field")
      .url("This must be a valid site"),
    bio: Yup.string().required("This is a required field"),
    companySize: Yup.string().required("This is a required field"),
    foundedYear: Yup.number()
      .typeError("This must be a number")
      .required("This is a required field"),
    specialties: Yup.string(),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      await createCompany({
        variables: {
          input: values,
        },
      });
      resetForm();
      console.log("company created");
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
          <div>
            <label htmlFor="name">Name</label>
            <Field type="text" name="name" />
            <ErrorMessage name="name" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="industry">Industry</label>
            <Field type="text" name="industry" />
            <ErrorMessage name="industry" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="hqCity">Headquarters City</label>
            <Field type="text" name="hqCity" />
            <ErrorMessage name="hqCity" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="hqState">Headquarters State</label>
            <Field type="text" name="hqState" />
            <ErrorMessage name="hqState" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="website">Website</label>
            <Field type="text" name="website" />
            <ErrorMessage name="website" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="bio">Bio</label>
            <Field type="bio" as="textarea" name="bio" />
            <ErrorMessage name="bio" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="companySize">Company Size</label>
            <Field type="text" name="companySize" />
            <ErrorMessage
              name="companySize"
              component="div"
              className="error"
            />
          </div>
          <div>
            <label htmlFor="foundedYear">Founded Year</label>
            <Field type="number" name="foundedYear" />
            <ErrorMessage
              name="foundedYear"
              component="div"
              className="error"
            />
          </div>
          <div>
            <label htmlFor="specialties">Specialties</label>
            <Field type="text" name="specialties" />
            <ErrorMessage
              name="specialties"
              component="div"
              className="error"
            />
          </div>
          <button className="btn" type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}
