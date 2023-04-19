import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useMutation } from "@apollo/client";
import { CREATE_LOCATION } from "../../../utils/mutations";
import * as Yup from "yup";

export default function LocationForm() {
  const [createLocation] = useMutation(CREATE_LOCATION);

  const initialValues = {
    city: "",
    state: "",
    size: "",
    phone: "",
  };

  const validationSchema = Yup.object.shape({
    city: Yup.string().required("This field is required"),
    state: Yup.string().required("This field is required"),
    size: Yup.string().required("This field is required"),
    phone: Yup.phone("US", "Please enter a valid phone number").required(
      "This is a required field"
    ),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      await createLocation({
        variables: {
          city: values.city,
          state: values.state,
          size: values.email,
          phone: values.password,
        },
      });
      resetForm();
      console.log("location registered");
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
            <label htmlFor="city">City</label>
            <Field type="text" name="city" />
            <ErrorMessage name="city" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="state">State</label>
            <Field type="text" name="state" />
            <ErrorMessage name="state" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="size">Size</label>
            <Field type="text" name="size" />
            <ErrorMessage name="size" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="phone">Phone Number</label>
            <Field type="number" name="phone" />
            <ErrorMessage name="phone" component="div" className="error" />
          </div>

          <button className="btn" type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}
