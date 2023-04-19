import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../../utils/mutations"
import * as Yup from "yup";



export default function UserForm() {
  const [createUser] = useMutation( CREATE_USER );

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("This field is required"),
  lastName: Yup.string().required("This field is required"),
  email: Yup.string().email("Email address not formatted correctly").required("This field is required"),
  password: Yup.string().required("This field is required").min(5, "Your password must be more than 5 characters"),
});

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      await createUser({
        variables: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
        },
      });
      resetForm();
      console.log('user created')
    } catch (err) {
      console.error(err)
    }
    setSubmitting(false);
    };
  ;

  return (
    <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={handleSubmit}
    >
      {({ isSubmitting}) => (
<Form>
  <div>
    <label htmlFor="firstName">First Name</label>
    <Field type="text" name="firstName" />
    <ErrorMessage name="firstName" component="div" className="error" />
      </div>
      <div>
    <label htmlFor="lastName">Last Name</label>
    <Field type="text" name="lastName" />
    <ErrorMessage name="lastName" component="div" className="error" />
      </div>
      <div>
    <label htmlFor="email">Email</label>
    <Field type="email" name="email" />
    <ErrorMessage name="email" component="div" className="error" />
      </div>
      <div>
    <label htmlFor="password">Password</label>
    <Field type="password" name="password" />
    <ErrorMessage name="password" component="div" className="error" />
      </div>

      <button className="btn" type="submit" disable={isSubmitting}>
        Submit
      </button>
</Form>
      )}
    </Formik>
  );

      }