import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import User from "../../models/UserModel";
import LoginRegistrationService from "../../services/LoginRegistrationService";
import "./Register.css";
import RegisterModel from "../../models/RegisterModel";
import { date } from "yup";
import { toBeEmptyDOMElement } from "@testing-library/jest-dom/matchers";

const RegisterPageComponent = () => {
  const [input, setInput] = useState<User>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [messageSuccess, setMessageSuccess] = useState<string>();
  const [passwordShow, setPasswordShow] = useState("password");
  const [confirmPasswordShow, setConfirmPasswordShow] = useState("password");
  const [iconToShowConfirm, setIconToShowConfirm] = useState(
    <svg width="16" height="16" fill="black" className="bi bi-eye-slash-fill" viewBox="0 0 16 16">
      <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
      <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
    </svg>
  );
  const [iconToShow, setIconToShow] = useState(
    <svg width="16" height="16" fill="black" className="bi bi-eye-slash-fill" viewBox="0 0 16 16">
      <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
      <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
    </svg>
  );
  const navigate = useNavigate();
  const [passwordDetails, setPasswordDetails] = useState(true);

  const showPassword = () => {
    if (passwordShow === "password") {
      setPasswordShow("text");
      setIconToShow(
        <svg width="16" height="16" fill="black" className="bi bi-eye-fill" viewBox="0 0 16 16">
          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
          <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
        </svg>
      );
    } else {
      setPasswordShow("password");
      setIconToShow(
        <svg width="16" height="16" fill="black" className="bi bi-eye-slash-fill" viewBox="0 0 16 16">
          <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
          <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
        </svg>
      );
    }
  };

  const showPasswordConfirm = () => {
    if (confirmPasswordShow === "password") {
      setConfirmPasswordShow("text");
      setIconToShowConfirm(
        <svg width="16" height="16" fill="black" className="bi bi-eye-fill" viewBox="0 0 16 16">
          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
          <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
        </svg>
      );
    } else {
      setConfirmPasswordShow("password");
      setIconToShowConfirm(
        <svg width="16" height="16" fill="black" className="bi bi-eye-slash-fill" viewBox="0 0 16 16">
          <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
          <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
        </svg>
      );
    }
  };

  const showDetails = () => {
    if (passwordDetails === true) {
      setPasswordDetails(false);
    } else {
      setPasswordDetails(true);
    }
  };

  const validateEmail = (email:any) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const response = await LoginRegistrationService.registrationStudentService(input!);
        if (response.status === 201) {
          window.location.reload()
          setMessageSuccess("Registration successful!");
        } else {
          setErrorMessage("Errore nel register. Controlla le tue credenziali e riprova.");
        }
      } catch (error) {
        setErrorMessage("Errore nel register. Controlla le tue credenziali e riprova.");
      }
    };
  

  const isFormValid =
    input?.firstName &&
    input?.lastName &&
    validateEmail(input?.email) &&
    input?.password &&
    input.password == input?.confirmPassword;


  const passwordMatch =
    input?.confirmPassword == input?.password &&
    input?.confirmPassword !== '' &&
    input?.confirmPassword !== undefined;

  const passwordErrorMatch =
    input?.confirmPassword !== input?.password;

  const validateEmailInput = 
    validateEmail(input?.email);

 
    


  return (
    <div className={`containerRegister`}>
      <div className={`cardRegister`}>
        <form className={`formRegister`} onSubmit={handleRegister}>
          <div className={`titleRegister`}>
            <h3>
              Register
            </h3>
          </div>
          <div className={`fieldRegister`}>
            <input
              name="firstName"
              value={input?.firstName}
              onChange={(e) => {
                setInput({
                  ...input!,
                  [e.target.name]: e.target.value,
                })
              }}
              className={`input-fieldRegister`}
              placeholder="First Name"
            />
          </div>
          <div className={`fieldRegister`}>
            <input
              name="lastName"
              value={input?.lastName}
              onChange={(e) => {
                setInput({
                  ...input!,
                  [e.target.name]: e.target.value,
                });
              }}
              className={`input-fieldRegister`
              }
              placeholder="Last Name"
            />
          </div>
          <div className={`fieldRegister ${!validateEmailInput ? 'emailValidate' : ''}`}>
            <input
              name="email"
              value={input?.email}
              onChange={(e) => {
                setInput({
                  ...input!,
                  [e.target.name]: e.target.value,
                });
              }}
              type="email"
              className={`input-fieldRegister`
              }
              placeholder="Email"
            />
          </div>
          <div className={`fieldRegister`}>
            <input
              type="date"
              placeholder="birth name"
              name="birthDate"
              className={`input-fieldRegister`}
              onChange={(e) => {
                setInput({
                  ...input!,
                  [e.target.name]: e.target.value,
                });
              }}
            ></input>
          </div>
          <div className={`fieldRegister`}>
            <input
              onFocus={showDetails}
              onBlur={showDetails}
              type={passwordShow}
              name="password"
              value={input?.password}
              placeholder="Insert your password here"
              onChange={(e) => {
                setInput({
                  ...input!,
                  [e.target.name]: e.target.value,
                });
              }}
              className={`input-fieldRegister`}
            />
            <button
              type="button"
              className={`eyeRegister`}
              onClick={showPassword}
            >
              {iconToShow}
            </button>
          </div>
          <div className={`fieldRegister ${passwordMatch ? 'password-match' : ''} ${passwordErrorMatch ? 'password-error' : ''}`}>
            <input
              type={confirmPasswordShow}
              name="confirmPassword"
              value={input?.confirmPassword}
              placeholder="Repeat your password here"
              onChange={(e) => {
                setInput({
                  ...input!,
                  [e.target.name]: e.target.value,
                });
              }}
              className={`input-fieldRegister`}
            />
            <button
              type="button"
              className={`eyeRegister`}
              onClick={showPasswordConfirm}
            >
              {iconToShowConfirm}
            </button>
          </div>
          {messageSuccess &&(
            <p>{messageSuccess}</p>
          )}
          <div className={`btnRegister`}>
            <button
              className={`buttonRegister ${!isFormValid ? "disabled-button" : ""}`}
              disabled={!isFormValid}
              type="submit"
            >
              Registration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPageComponent;