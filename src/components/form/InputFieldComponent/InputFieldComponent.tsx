import React, { useEffect, useState } from "react";
import { Field, FormikProps } from "formik";
import { MyFormValues } from "../../../models";
import "./inputFieldComponent.scss";

interface InputFieldProp {
  labelName?: string;
  inputName: keyof MyFormValues;
  inputType: string;
  inputPlaceholder?: string;
  formikProps: FormikProps<MyFormValues>;
  authPage?: boolean;
  className?: string;
}

const InputFieldComponent: React.FC<InputFieldProp> = ({
  labelName,
  inputName,
  inputPlaceholder,
  formikProps,
  inputType,
  authPage,
  className,
}) => {
  const { touched, errors } = formikProps;
  const hasError = touched[inputName] && errors[inputName];
  const [isActive, setIsActive] = useState(false);

  const handleInputFocus = () => {
    setIsActive(true);
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setIsActive(inputValue !== "");
  };

  return (
    <>
      <div className={`input-checkout-container ${className}`}>
        {labelName && (
          <label
            className={`label-checkout ${isActive ? "active" : ""}`}
            htmlFor={inputName}
          >
            {labelName}
          </label>
        )}
        <Field
          className={`input-checkout ${authPage ? "auth-input-change" : ""} ${
            hasError ? "has-error" : ""
          }`}
          name={inputName}
          type={inputType}
          placeholder={inputPlaceholder}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        {hasError && <p className="error-message">{errors[inputName]}</p>}
      </div>
    </>
  );
};

export default InputFieldComponent;
