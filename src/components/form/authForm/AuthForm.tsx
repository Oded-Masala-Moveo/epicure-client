import React, { useEffect, useId, useState } from "react";
import { Formik, Form, useFormikContext } from "formik";
import "./auth.scss";
import { MyFormValues } from "../../../models";
import InputFieldComponent from "../InputFieldComponent/InputFieldComponent";
import ClickButton from "../../buttons/clickButton/ClickButton";
import { loginUser } from "../../../services";
import { useAppDispatch, closeAllNavbar, login } from "../../../store";
import { AuthFelid, AuthFormFelid, authFieldFill, initialValues, validateFunction, } from "./authFormHelper";

const AuthForm: React.FC<{ register: boolean }> = ({ register }) => {
  const dispatch = useAppDispatch();
  const [requestError, setRequestError] = useState<number>(0);
  const restError = () => setRequestError(0);
  const giveField = (field: AuthFormFelid) => (key: string) => (objectField: string) =>
      field[key as keyof AuthFormFelid][objectField as keyof AuthFelid];
  let sendLoginRequest = (values: MyFormValues) => {
    setRequestError(0);
    if (values.email && values.password) loginUser(values.email, values.password) .then((res) => {
          if (res?._id && res.email && res.userName) {
            dispatch( login({ email: res?.email, _id: res?._id, userName: res?.userName, }) );
            dispatch(closeAllNavbar(false));
          }
        }) .catch((err) => { console.log(err.response);
          console.log(err.response.status);
          setRequestError(err.response.status);
        });
  };
  const FormStatusEffect: React.FC = () => {
    const { errors } = useFormikContext<MyFormValues>();
    useEffect(() => {
      if (errors.email || errors.password) {
        restError();
      }
    }, [errors.email, errors.password]);
    return null;
  };
  return (
    <>
      <div>
        <Formik initialValues={initialValues} validate={validateFunction} onSubmit={sendLoginRequest} >
          {({ touched, errors, handleSubmit, dirty, isValid, ...Formik }) => (
            <>
              <FormStatusEffect />
              <Form>
                <div className="auth-form-container">
                  <div className="input-form-container">
                    {Object.keys(authFieldFill).map((key) => (
                      <InputFieldComponent
                        key={useId()}
                        labelName={giveField(authFieldFill)(key)("placeholder")}
                        authPage={true}
                        formikProps={{ touched, errors, handleSubmit, dirty, isValid, ...Formik, }}
                        inputName={ giveField(authFieldFill)(key)( "name" ) as keyof MyFormValues }
                        inputType={giveField(authFieldFill)(key)("type")}
                      />
                    ))}
                  </div>
                  {requestError == 404 && ( <p className="auth-request-error-message"> Email not found </p> )}
                  {requestError == 401 && ( <p className="auth-request-error-message"> Password is incorrect </p> )}
                  <div className="submit-login-button">
                    <ClickButton type="submit" onClick={handleSubmit} primaryBlack={dirty && isValid} >
                      {!register ? "Login" : "Register"}
                    </ClickButton>
                  </div>
                  {!register && ( <div className="forget-password-container"> <p>Forget password?</p> </div> )}
                </div>
              </Form>
            </>
          )}
        </Formik>
      </div>
    </>
  );
};

export default AuthForm;
