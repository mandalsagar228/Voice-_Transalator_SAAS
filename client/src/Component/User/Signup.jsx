import FormField from "../FormField";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import * as Yup from "yup";
import useApi from "../../Hooks/useApi";
import { Api_Urls } from "../../Services/api_urls";

import { PulseLoader } from "react-spinners";
import { useEffect } from "react";
import g_logo from "../../assets/g_logo.png";

const signupValue = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  confirmPassword: "",
};

// defining validation schema for signUp data.
const signUpSchema = Yup.object({
  firstname: Yup.string().min(2).max(25).required("Enter the firstname"),
  lastname: Yup.string().min(2).max(25).required("Enter the lastname"),
  email: Yup.string().email().required("Enter the email address"),
  password: Yup.string().min(8).required("Enter Password"),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Password must  match"),
});

const Signup = () => {
  const navigate = useNavigate();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: signupValue,
      validationSchema: signUpSchema,
      onSubmit: (values, action) => {
        SendSingup();
        console.log("This is  onsubmit value:", values);

        action.resetForm();
      },
    });

  const signupService = useApi(Api_Urls.saveSignup); //initialising hooks to send signup data
  // send signup data to the server
  const SendSingup = async () => {
    try {
      await signupService.call(values);
    } catch (error) {
      console.log("error from signup", error);
    }
  };

  useEffect(() => {
    const response = signupService?.response;

    if (response?.status === 201) {
      toast.success(response?.data?.msg);
      toast.info("OTP has sent in you email address", {
        autoClose: false,
      });
      navigate("/otp");
    }
    return () => {
      signupService;
    };
  }, [signupService, navigate]);

  return (
    <>
      <div className="  flex items-center justify-center  bg-slate-200 h-[100vh]">
        <div className=" relative w-[400px] max-h-[800px] bg-white rounded-lg p-6 shadow-lg ">
          <div className=" font-semibold text-xl hover:cursor-pointer absolute top-2 left-[35%]   ">
            Translator
          </div>

          <form onSubmit={handleSubmit} className=" mt-8">
            <FormField
              labelName="Firstname"
              type="text"
              name="firstname"
              placeholder="Enter your firstname"
              value={values.firstname}
              handleChange={handleChange}
              onBlur={handleBlur}
              errors={errors.firstname}
              touched={touched.firstname}
            />
            <FormField
              labelName="Lastname"
              type="text"
              name="lastname"
              placeholder="Enter your Lastname"
              value={values.lastname}
              handleChange={handleChange}
              onBlur={handleBlur}
              errors={errors.lastname}
              touched={touched.lastname}
            />

            <FormField
              labelName="Email"
              type="text"
              name="email"
              placeholder="Enter your Email"
              value={values.email}
              handleChange={handleChange}
              onBlur={handleBlur}
              errors={errors.email}
              touched={touched.email}
            />
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
            <div className="mb-4 mx-2 flex items-center justify-center">
              Already have account ? &nbsp;
              <span
                className=" text-blue-700 hover:cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </div>
            <div className="mb-4 mx-2 flex items-center justify-center">OR</div>
            <div className="mb-4 mx-2 px-4 py-2  flex items-center justify-center border rounded-md hover:cursor-pointer ">
              <span className=" mr-3">
                <img src={g_logo} alt="g_logo" width="23px" height="23px" />
              </span>{" "}
              Sign in with Google
            </div>

            <div className="mx-2">
              <button
                type="submit"
                className="w-full px-4 py-2  text-white bg-black rounded-md hover:cursor-pointer "
                disabled={signupService?.isLoading}
              >
                {signupService?.isLoading ? "SigningUp" : "Signup"}
                {signupService?.isLoading && (
                  <PulseLoader color="#fff" size={5} />
                )}
              </button>

              <div className="error-message text-red-700 text-sm flex items-center justify-center py-2">
                {signupService?.error?.response?.data?.msg
                  ? signupService.error.response.data.msg
                  : ""}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
