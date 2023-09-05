import FormField from "../FormField";
import { useFormik } from "formik";

import * as Yup from "yup";

const QueryEmailValue = {
  email: "",
};

// defining validation schema for QueryEmail data.
const QueryEmailSchema = Yup.object({
  email: Yup.string().email().required("Enter the email address"),
});

const QueryEmail = () => {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: QueryEmailValue,
      validationSchema: QueryEmailSchema,
      onSubmit: (values, action) => {
        console.log("This is  onsubmit value:", values);

        action.resetForm();
      },
    });

  return (
    <>
      <div className="flex items-center justify-center  bg-slate-200 h-[100vh]">
        <div className=" relative w-[400px] max-h-[800px] bg-white rounded-lg p-6 shadow-lg ">
          <div className=" font-semibold text-xl hover:cursor-pointer absolute top-2 left-[35%]   ">
            Translator
          </div>
          <form onSubmit={handleSubmit} className=" mt-8">
            <FormField
              labelName=" Enter email for verification"
              type="text"
              name="email"
              placeholder="Enter your Email"
              value={values.email}
              handleChange={handleChange}
              onBlur={handleBlur}
              errors={errors.email}
              touched={touched.email}
            />

            <div className="mx-2">
              <button
                type="submit"
                className="w-full px-4 py-2  text-white bg-black rounded-md  "
              >
                Proceed to get OTP
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default QueryEmail;
