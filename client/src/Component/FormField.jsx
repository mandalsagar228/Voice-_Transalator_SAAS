import PropTypes from "prop-types";
import { useState } from "react";
const FormField = ({
  type,
  name,
  placeholder,
  value,
  handleChange,
  labelName,
  errors,
  touched,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <div className=" relative  mb-2 mx-2">
        {labelName === "Password" ? (
          <p
            className=" absolute right-3 top-7  font-semibold z-10 hover:cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </p>
        ) : (
          ""
        )}
        {labelName === "ConfirmPassword" ? (
          <p
            className=" absolute right-3 top-7  font-semibold z-10  hover:cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </p>
        ) : (
          ""
        )}
        <label
          htmlFor={name}
          className="block font-semibold   text-sm text-black"
        >
          {labelName}
        </label>
        <input
          type={showPassword ? "text" : type}
          name={name}
          autoComplete="off"
          placeholder={placeholder}
          onChange={handleChange}
          value={value}
          className={` relative w-full px-4 pr-14 py-2  border border-gray-300 rounded  focus:outline-none   ${
            errors && touched
              ? "border-red-600"
              : "focus:ring-1 ring-black  overflow-y"
          } `}
        />
        {errors && touched ? (
          <div className="text-red-700 text-sm">{errors && errors}</div>
        ) : null}
      </div>
    </>
  );
};

FormField.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  labelName: PropTypes.string.isRequired,
  errors: PropTypes.string,

  touched: PropTypes.bool,
};

export default FormField;
