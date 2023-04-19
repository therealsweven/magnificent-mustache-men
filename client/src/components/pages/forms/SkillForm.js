import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useMutation } from "@apollo/client";
import { CREATE_SKILL } from "../../../utils/mutations";
import * as Yup from "yup";

export default function SkillForm() {
  const [createSkill] = useMutation(CREATE_SKILL);

  const initialValues = {
    skillName: "",
  };

  const validationSchema = Yup.object().shape({
    postBody: Yup.string().required("This field is required"),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      await createSkill({
        variables: {
          postBody: values.skillName,
        },
      });
      resetForm();
      console.log("skiill created");
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
            <label htmlFor="skill">Skill Name</label>
            <Field type="text" name="skill" />
            <ErrorMessage name="skill" component="div" className="error" />
          </div>

          <button className="btn" type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}
