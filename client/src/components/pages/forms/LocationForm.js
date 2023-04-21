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
          <div className="form-control">
            <label className="label" htmlFor="city">
              <span className="label-text">City</span>
            </label>
            <Field className="input input-bordered" type="text" name="city" />
            <ErrorMessage name="city" component="div" className="error" />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="state">
              <span className="label-text">State</span>
            </label>
            <Field
              className="input input-bordered"
              as="select"
              type="text"
              name="state"
            >
              <option value="">Select an State</option>
              {states.map((state) => (
                <option key={state.name} value={state.name}>
                  {state.name}
                </option>
              ))}
            </Field>
            <ErrorMessage name="state" component="div" className="error" />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="size">
              <span className="label-text">Size</span>
            </label>
            <Field className="input input-bordered" type="text" name="size" />
            <ErrorMessage name="size" component="div" className="error" />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="phone">
              <span className="label-text">Phone Number</span>
            </label>
            <Field
              className="input input-bordered"
              type="number"
              name="phone"
            />
            <ErrorMessage name="phone" component="div" className="error" />
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
