import axios from "axios";
import Cookies from "js-cookie";
import UserDetailsModel from "../models/UserDetailsModel";
import User from "../models/UserModel";
import LoginUserModel from "../models/LoginUserModel";

const REGISTRATION_LOGIN_BASE_URI =
  "http://localhost:8080/nfc-learning";
const VERSION_URI = REGISTRATION_LOGIN_BASE_URI + "/v1";
const REGISTRATION_STUDENT_URI = VERSION_URI + "/auth/student/register";
const REGISTRATION_TUTOR_URI = VERSION_URI + "/auth/tutor/register";
const LOGIN_URI = VERSION_URI + "/auth/login";
const USER_DETAILS_URI = VERSION_URI + "/email";
const UPDATE_USER_DETAILS = VERSION_URI + "/update-user"

const registrationStudentService = async (user: User) => {
  return await axios.post(REGISTRATION_STUDENT_URI, user);
}

const registrationTutorService = async (user: User) => {
  const token = Cookies.get("jwt-token")

  try {
    const response = await axios.post(REGISTRATION_TUTOR_URI, user,{headers: { Authorization: `Bearer ${token}` }});
    return response;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
}

const updateUserData = async (updatedUserDetails: UserDetailsModel) => {
  const token = Cookies.get("jwt-token")

  return await axios.put(
    UPDATE_USER_DETAILS,
    {
      firstName: updatedUserDetails.firstName,
      lastName: updatedUserDetails.lastName,
      email: updatedUserDetails.email,
      password: updatedUserDetails.password
    },
    {
      params: { email: updatedUserDetails.email },
      headers: { Authorization: `Bearer ${token}` }
    }
  )
}

const loginService = async (loginInput: LoginUserModel) => {
  const response = await axios.post(
    LOGIN_URI,
    loginInput
  );
  return response;
}

const getUserDetails = async () => {
  const token = Cookies.get("jwt-token")

  const response = await axios.get(USER_DETAILS_URI, {

    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
}

const LoginRegistrationService = {
  getUserDetails,
  loginService,
  registrationStudentService,
  registrationTutorService,
  updateUserData
};

export default LoginRegistrationService;