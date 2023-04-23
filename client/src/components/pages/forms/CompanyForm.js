import { Formik, Field, Form, ErrorMessage } from "formik";
import { useMutation } from "@apollo/client";
import { CREATE_COMPANY } from "../../../utils/mutations";
import * as Yup from "yup";
import industries from "../../../utils/industries.json";
import states from "../../../utils/statearray.json";
import { Navigate } from "react-router-dom";

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
      console.log(values);

      await createCompany({
        variables: {
          name: values.name,
          industry: values.industry,
          hqCity: values.hqCity,
          hqState: values.hqState,
          website: values.website,
          bio: values.bio,
          companySize: values.companySize,
          foundedYear: parseInt(values.foundedYear),
          specialties: values.specialties,
        },
      });
      resetForm();
      <Navigate to="/company" replace={true} />;
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
            <label className="label" htmlFor="name">
              <span className="label-text">Name</span>
            </label>
            <Field className="input input-bordered" type="text" name="name" />

            <ErrorMessage name="name" component="div" className="error" />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="industry">
              <span className="label-text">Industry</span>
            </label>
            <Field
              className="input input-bordered"
              as="select"
              type="text"
              name="industry"
            >
              <option value="">Select an Industry</option>
              {industries.map((industry) => (
                <option key={industry.name} value={industry.name.toString()}>
                  {industry.name}
                </option>
              ))}
            </Field>
            <ErrorMessage name="industry" component="div" className="error" />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="hqCity">
              <span className="label-text">Headquarters City</span>
            </label>
            <Field className="input input-bordered" type="text" name="hqCity" />
            <ErrorMessage name="hqCity" component="div" className="error" />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="hqState">
              <span className="label-text">Headquarters State</span>
            </label>
            <Field
              className="input input-bordered"
              as="select"
              type="text"
              name="hqState"
            >
              <option value="">Select an State</option>
              {states.map((state) => (
                <option key={state.name} value={state.name.toString()}>
                  {state.name}
                </option>
              ))}
            </Field>
            <ErrorMessage name="hqState" component="div" className="error" />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="website">
              <span className="label-text">Website</span>
            </label>
            <Field
              className="input input-bordered"
              type="text"
              name="website"
            />
            <ErrorMessage name="website" component="div" className="error" />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="bio">
              <span className="label-text">Bio</span>
            </label>
            <Field
              className="input input-bordered"
              type="text"
              as="textarea"
              name="bio"
            />
            <ErrorMessage name="bio" component="div" className="error" />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="companySize">
              <span className="label-text">Company Size</span>
            </label>
            <Field
              className="input input-bordered"
              type="text"
              name="companySize"
            />
            <ErrorMessage
              name="companySize"
              component="div"
              className="error"
            />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="foundedYear">
              <span className="label-text">Founded Year</span>
            </label>
            <Field
              className="input input-bordered"
              type="number"
              name="foundedYear"
            />
            <ErrorMessage
              name="foundedYear"
              component="div"
              className="error"
            />
          </div>
          <div>
            <label className="label" htmlFor="specialties">
              <span className="label-text">Specialties</span>
            </label>
            <Field
              className="input input-bordered"
              type="text"
              name="specialties"
            />
            <ErrorMessage
              name="specialties"
              component="div"
              className="error"
            />
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
