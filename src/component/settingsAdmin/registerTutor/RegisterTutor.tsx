import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterTutor.css";
import "bootstrap/dist/css/bootstrap.css";
import User from "../../../models/UserModel";
import LoginRegistrationService from "../../../services/LoginRegistrationService";

const RegisterTutor = () => {
  const [input, setInput] = useState<User>();
  const [passwordShow, setPasswordShow] = useState("password");
  const [iconToShow, setIconToShow] = useState(
    <svg
      width="16"
      height="16"
      fill="black"
      className="bi bi-eye-slash-fill"
      viewBox="0 0 16 16"
    >
      <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
      <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
    </svg>
  );
  const navigate = useNavigate();
  const [passwordDetails, setPasswordDetails] = useState(true);
  const [firstNameError, setFirstNameError] = useState(false);
  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState("");
  const [lastNameError, setLastNameError] = useState(false);
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [birthDateError, setBirthDateError] = useState(false);
  const [birthDateErrorMessage, setBirthDateErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [createDisabled, setCreateDisabled] = useState(true);
  const [savedSuccessfully, setSaveSuccessfully] = useState<boolean>();
  const [resourceAlreadyExists, setResourceAlreadyExists] = useState<boolean>();
  const [loading, setLoading] = useState(false);
  const [isCallComplete, setIsCallComplete] = useState(false);
  const [savedTutor, setSavedTutor] = useState<any>();



  const showPassword = () => {
    if (passwordShow === "password") {
      setPasswordShow("text");
      setIconToShow(
        <svg
          width="16"
          height="16"
          fill="black"
          className="bi bi-eye-fill"
          viewBox="0 0 16 16"
        >
          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
          <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5a7.5 7.5 0 0 1-2.427-5.29a.5.5 0 0 0-.577-.025A8.967 8.967 0 0 0 0 8a8.967 8.967 0 0 0 4.485 4.5a.5.5 0 0 0 .577.025a7.5 7.5 0 0 1-2.427-5.29z" />
        </svg>
      );
    } else {
      setPasswordShow("password");
      setIconToShow(
        <svg
          width="16"
          height="16"
          fill="black"
          className="bi bi-eye-slash-fill"
          viewBox="0 0 16 16"
        >
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

  const handleClose = () => {
    navigate("/settings_admin");
  };

  const handleRegistrationTutor = async () => {

    try {
      setLoading(true);
      const tempSavedTutor = await LoginRegistrationService.registrationTutorService(input!);

      setSavedTutor(tempSavedTutor);
      setIsCallComplete(true);
    } catch (error: any) {
      console.error("Errore durante il salvataggio del quiz:", error);
      setSavedTutor(error.response);
      setIsCallComplete(true);
    } finally {
      setLoading(false);
    }

  };

  useEffect(() => {
    if (savedTutor && isCallComplete) {
      if (savedTutor.status === 201) {
        setSaveSuccessfully(true);
        setResourceAlreadyExists(false);
      } else if (savedTutor.status === 400 && savedTutor.data=== "Invalid or existing email") {
        setSaveSuccessfully(false);
        setResourceAlreadyExists(true);
      }
    }
  }, [savedTutor, isCallComplete]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setError: React.Dispatch<React.SetStateAction<boolean>>,
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const { name, value } = event.target;
    const inputValue = value;
    const inputLength = inputValue.length;

    if (
      name === "firstName" &&
      (inputValue.length < 1 || inputValue.length > 255)
    ) {
      setError(true);
      setErrorMessage("First Name must be between 1 and 255 characters");
    } else {
      setError(false);
      setErrorMessage("");
    }

    if (
      name === "lastName" &&
      (inputValue.length < 1 || inputValue.length > 255)
    ) {
      setError(true);
      setErrorMessage("Last Name must be between 1 and 255 characters");
    } else {
      setError(false);
      setErrorMessage("");
    }

    if (
      name === "email" &&
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(inputValue)
    ) {
      setError(true);
      setErrorMessage("Invalid email format");
    } else {
      setError(false);
      setErrorMessage("");
    }

    if (
      name === "birthDate" &&
      new Date(inputValue).getTime() > new Date().getTime()
    ) {
      setError(true);
      setErrorMessage("Birth Date must be in the past");
    } else {
      setError(false);
      setErrorMessage("");
    }

    if (
      name === "password" &&
      (inputValue.length < 8 || inputValue.length > 255)
    ) {
      setError(true);
      setErrorMessage("Password must be between 8 and 255 characters");
    } else {
      setError(false);
      setErrorMessage("");
    }

    setInput({
      ...input!,
      [name]: inputValue,
    });

    setCreateDisabled(
      (inputLength === 0 && firstNameError) ||
      (lastNameError && emailError && passwordError && birthDateError)
    );
  };

  return (
    <div>
      <div>
        <form className={`formRegister`}>
          <div>
            <h3 className="titleModal">Register tutor</h3>
          </div>
          <div>
            <label className="labelModal">Name</label>
            <input
              name="firstName"
              value={input?.firstName}
              className={`form-control ${firstNameError ? "border-red-500" : ""
                }`}
              onChange={(e) =>
                handleInputChange(
                  e,
                  setFirstNameError,
                  setFirstNameErrorMessage
                )
              }
              placeholder="Name"
            />
            {firstNameError && (
              <p className="text-muted">{firstNameErrorMessage}</p>
            )}
          </div>
          <div>
            <label className="labelModal">Surname</label>
            <input
              name="lastName"
              value={input?.lastName}
              onChange={(e) =>
                handleInputChange(e, setLastNameError, setLastNameErrorMessage)
              }
              className={`form-control ${lastNameError ? "border-red-500" : ""
                }`}
              placeholder="Surname"
            />
            {lastNameError && (
              <p className="text-muted">{lastNameErrorMessage}</p>
            )}
          </div>
          <div>
            <label className="labelModal">Email</label>
            <input
              name="email"
              value={input?.email}
              onChange={(e) =>
                handleInputChange(e, setEmailError, setEmailErrorMessage)
              }
              type="email"
              className={`form-control ${emailError ? "border-red-500" : ""}`}
              placeholder="Email"
            />
            {emailError && <p className="text-muted">{emailErrorMessage}</p>}
          </div>
          <label className="labelModal">Password</label>
          <div className={`d-flex`}>
            <input
              onFocus={showDetails}
              onBlur={showDetails}
              type={passwordShow}
              className={`form-control ${passwordError ? "border-red-500" : ""
                }`}
              name="password"
              value={input?.password}
              placeholder="Insert your password here"
              onChange={(e) =>
                handleInputChange(e, setPasswordError, setPasswordErrorMessage)
              }
            />
            <button
              type="button"
              className={`eyeRegister`}
              onClick={showPassword}
            >
              {iconToShow}
            </button>
          </div>
          {passwordError && (
            <p className="text-muted">{passwordErrorMessage}</p>
          )}
          <div>
            <label className="labelModal">Birthdate</label>
            <input
              type="date"
              placeholder="Birthdate"
              name="birthDate"
              className={`form-control ${birthDateError ? "border-red-500" : ""
                }`}
              onChange={(e) =>
                handleInputChange(
                  e,
                  setBirthDateError,
                  setBirthDateErrorMessage
                )
              }
            ></input>
            {birthDateError && (
              <p className="text-muted">{birthDateErrorMessage}</p>
            )}
          </div>

          {loading &&
            <div>
              <label className="labelModal">Saving in progress...</label>
            </div>}

          {!loading && savedSuccessfully && (
            <div>
              <label className="labelModal">Tutor registered correctly!</label>
            </div>
          )}

          {!loading && !savedSuccessfully && resourceAlreadyExists && (
            <div>
              <label className="labelModal">The tutor already exists!</label>
            </div>
          )}




          <div className="containerButtonModal">
            <button
              className="buttonCheck"
              onClick={handleRegistrationTutor}
              disabled={createDisabled}
              type="button"
            >
              <span className="frontCheck">
                <i className="bi bi-check2"></i>
              </span>
            </button>

            <button className="buttonReturn" onClick={handleClose}>
              <span className="frontReturn">
                <i className="bi bi-arrow-left"></i>
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default RegisterTutor;
