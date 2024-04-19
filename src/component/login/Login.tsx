import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import LoginUserModel from "../../models/LoginUserModel";
import LoginRegistrationService from "../../services/LoginRegistrationService";
import 'react-bootstrap-icons';
import './Login.css';


const Login = () => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const [passwordShow, setPasswordShow] = useState("password");
  const [iconToShow, setIconToShow] = useState(
    <svg width="16" height="16" fill="black" className="bi bi-eye-slash-fill" viewBox="0 0 16 16">
      <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
      <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
    </svg>
  );
  const navigate = useNavigate();
  const [input, setInput] = useState<LoginUserModel>({
    email: "",
    password: "",
  });


  useEffect(() => {
    if (Cookies.get("jwt-token") !== undefined) {
      navigate("/home")
    }
  }, [])

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

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await LoginRegistrationService.loginService(input);
      if (response.status === 200) {
        Cookies.set("jwt-token", response.data.accessToken);
        navigate("/spinner");
      } else {
        setErrorMessage("Errore nel login. Controlla le tue credenziali e riprova.");
      }
    } catch (error) {
      setErrorMessage("Errore nel login. Controlla le tue credenziali e riprova.");
    }
  };

  return (
    <div className={`containerLogin`}>
      <div className={`cardLogin`}>
        <form onSubmit={(e) => handleLogin(e)} className={`formLogin`}>
          <div className={`titleLogin`}>
            <h3>
              Login
            </h3>
          </div>
          <p style={{ color: "red", display: errorMessage ? "block" : "none" }}>{errorMessage}</p>
          <div className={`fieldLogin`}>
            <svg viewBox="0 0 16 16" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg" className={"input-iconLogin"}>
              <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
            </svg>
            <input
              type="email"
              name="email"
              value={input.email}
              onChange={(e) => {
                setInput({
                  ...input,
                  [e.target.name]: e.target.value,
                });
              }}
              className={`input-fieldLogin`}
              placeholder="Email"
            />
          </div>
          <div className={`fieldLogin`}>
            <svg viewBox="0 0 16 16" fill="currentColor" height="16" width="16" className={`input-iconLogin`}>
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
            </svg>
            <input
              type={passwordShow}
              name="password"
              value={input.password}
              onChange={(e) => {
                setInput({
                  ...input,
                  [e.target.name]: e.target.value,
                });
              }}
              className={`input-fieldLogin`}
              placeholder="Password"
            />
            <button
              type="button"
              className={`eyeLogin`}
              onClick={showPassword}
            >
              {iconToShow}
            </button>
          </div>
          <div className={`btnLogin`}>
            <div className={`buttonLoginSubContainer`}>
              <button
                type="submit"
                className={`buttonLogin`}
              >
                Sign in
              </button>
            </div>
            {/*<button className={`buttonLogin`}>
              Did you forget your password?
            </button>*/}
          </div>

        </form>
      </div>
    </div>
  );
};

export default Login;