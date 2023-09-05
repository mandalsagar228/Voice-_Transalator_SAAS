import FormField from "../FormField";
import { useFormik } from "formik";
import { useNavigate, NavLink } from "react-router-dom";

import * as Yup from "yup";
import useApi from "../../Hooks/useApi";
import { Api_Urls } from "../../Services/api_urls";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { PulseLoader } from "react-spinners";
import useAuth from "../../Hooks/useAuth";
import g_logo from "../../assets/g_logo.png";

const loginValue = {
  email: "",
  password: "",
};

// defining validation schema for login data.
const signUpSchema = Yup.object({
  email: Yup.string().email().required("Enter the email address"),
  password: Yup.string().min(8).required("Enter Password"),
});

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: loginValue,
      validationSchema: signUpSchema,
      onSubmit: (values) => {
        SendLogin();
        console.log("This is  onsubmit value:", values);

        // action.resetForm();
      },
    });

  const loginService = useApi(Api_Urls.login);

  const SendLogin = async () => {
    await loginService.call(values);
    console.log("sent");
  };

  useEffect(() => {
    const response = loginService?.response;
    if (response?.status === 200) {
      auth.Login(response.data.username);
      localStorage.setItem("accessToken", response.data.accessToken);
      console.log("username:", response.data.username);
      navigate("/");
      toast.success(response?.data?.msg);
    }
  }, [loginService, navigate, auth]);
  return (
    <>
      <div className="flex items-center justify-center  bg-slate-200 h-[100vh]">
        <div className=" relative w-[400px] max-h-[800px] bg-white rounded-lg p-6 shadow-lg ">
          <div className=" font-semibold text-xl hover:cursor-pointer absolute top-2 left-[35%]   ">
            Translator
          </div>
          <form onSubmit={handleSubmit} className=" mt-8">
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

            <div className="px-3 mb-4">
              <span
                className=" text-blue-700 hover:cursor-pointer"
                onClick={() => navigate("/queryEmail")}
              >
                Forgot password ?
              </span>
            </div>

            <div className="mb-4 mx-2 flex items-center justify-center">
              Don&apos;t have account? &nbsp;
              <NavLink to="/signup">
                <span
                  className=" text-blue-700 hover:cursor-pointer"
                  // onClick={() => navigate("/signup")}
                >
                  Signup
                </span>
              </NavLink>
            </div>
            <div className="mb-4 mx-2 flex items-center justify-center">OR</div>
            <div className="mb-4 mx-2 px-4 py-2  flex items-center justify-center border rounded-md hover:cursor-pointer ">
              <span className=" mr-3">
                <img src={g_logo} alt="g_logo" width="23px" height="23px" />
              </span>
              Sign in with Google
            </div>
            <div className="mx-2">
              <button
                type="submit"
                className="w-full px-4 py-2  text-white bg-black rounded-md  "
                disabled={loginService?.isLoading}
              >
                Login
                {loginService?.isLoading && (
                  <PulseLoader color="#fff" size={5} />
                )}
              </button>
              <div className="error-message text-red-700 text-sm flex items-center justify-center py-2">
                {loginService?.error?.response?.data?.msg
                  ? loginService.error.response.data.msg
                  : ""}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
