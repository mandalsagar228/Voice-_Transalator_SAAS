import FormField from "../FormField";
import { useFormik } from "formik";
// import { NavLink } from "react-router-dom";

import * as Yup from "yup";

const loginValue = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  confirmPassword: "",
};

// defining validation schema for login data.
const signUpSchema = Yup.object({
  email: Yup.string().email().required("Enter the email address"),
  password: Yup.string().min(8).required("Enter Password"),
});

const Reset = () => {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: loginValue,
      validationSchema: signUpSchema,
      onSubmit: (values, action) => {
        console.log("This is  onsubmit value:", values);

        action.resetForm();
      },
    });
  return (
    <>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg p-6 shadow-lg transition-all duration-300 ease-in-out w-[400px] max-h-[800px] bg-white h-[100vh]">
        <div className=" font-semibold text-xl hover:cursor-pointer absolute top-1 left-[30%]  ">
          Reset Password
        </div>
        <form onSubmit={handleSubmit} className=" mt-8">
          <FormField
            labelName="Password"
            type="password"
            name="password"
            placeholder="Enter your Password"
            value={values.password}
            handleChange={handleChange}
            onBlur={handleBlur}
            errors={errors.password}
            touched={touched.password}
          />

          <FormField
            labelName="ConfirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="Enter your ConfirmPassword"
            value={values.confirmPassword}
            handleChange={handleChange}
            onBlur={handleBlur}
            errors={errors.confirmPassword}
            touched={touched.confirmPassword}
          />

          <div className="mx-2">
            <button
              type="submit"
              className="w-full px-4 py-2   text-white bg-black rounded-md  "
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Reset;
