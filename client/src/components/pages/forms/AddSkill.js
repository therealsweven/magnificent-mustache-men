import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_SKILL } from "../../../utils/mutations";
import { QUERY_SKILLS } from "../../../utils/queries";
import * as Yup from "yup";

export default function AddSkillForm({setIsEditing}) {
  const [addSkill] = useMutation(ADD_SKILL);

  const initialValues = {
    skillName: "",
  };

  const validationSchema = Yup.object().shape({
    skillName: Yup.string().required("This field is required"),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      await addSkill({
        variables: {
          skillName: values.skillName,
        },
      });

      resetForm();
      setIsEditing("")
      console.log("skill created");
    } catch (err) {
      console.error(err);
    }
    setSubmitting(false);
  };

  const { loading, data } = useQuery(QUERY_SKILLS);
  const skills = [{ data }];
  console.log(skills);
  if (loading) {
    return <h2>...loading</h2>;
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="form-control">
            <label className="label" htmlFor="state">
              <span className="label-text">Skills</span>
            </label>
            <Field
              className="input input-bordered"
              as="select"
              type="text"
              name="skillName"
            >
              <option value="">Select a Skill</option>
              {data.skills.map((skill, index) => (
                <option key={index} value={skill.skillName}>
                  {skill.skillName}
                </option>
              ))}
            </Field>
            <ErrorMessage name="skillName" component="div" className="error" />
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
