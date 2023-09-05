import FormField from "../FormField";
import { useFormik } from "formik";
import useApi from "../../Hooks/useApi";
import { Api_Urls } from "../../Services/api_urls";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import * as Yup from "yup";
import { useEffect } from "react";

const OtpValue = {
  otp: "",
};

// defining validation schema for QueryEmail data.
const OtpSchema = Yup.object({
  otp: Yup.string().min(6).required("Enter OTP sent in your email address"),
});

const Otp = () => {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: OtpValue,
      validationSchema: OtpSchema,
      onSubmit: (values, action) => {
        SendOtp();
        console.log("This is  onsubmit value:", values);

        action.resetForm();
      },
    });

  const navigate = useNavigate();
  const sendOtpService = useApi(Api_Urls.sendOtp);
  //  send received otp to server for matching
  const SendOtp = async () => {
    await sendOtpService.call(values);
    console.log("sent");
  };

  useEffect(() => {
    const response = sendOtpService?.response;

    if (response?.status === 200) {
      navigate("/login");
      toast.success("Login to get access to to Translator", {
        autoClose: false,
      });
    }
    return () => {
      sendOtpService;
    };
  }, [sendOtpService, navigate]);
  return (
    <>
      <div className="flex items-center justify-center  bg-slate-200 h-[100vh]">
        <div className=" relative w-[400px] max-h-[800px] bg-white rounded-lg p-6 shadow-lg ">
          <div className=" font-semibold text-xl hover:cursor-pointer absolute top-2 left-[35%]   ">
            Translator
          </div>
          <form onSubmit={handleSubmit} className=" mt-8">
            <FormField
              labelName="Enter the 6-digit verification"
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={values.otp}
              handleChange={handleChange}
              onBlur={handleBlur}
              errors={errors.otp}
              touched={touched.otp}
            />

            <div className="mx-2">
              <button
                type="submit"
                className="w-full px-4 py-2  text-white bg-black rounded-md  "
              >
                Proceed
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Otp;
