import axios from "axios";
import Cookies from "js-cookie";
import Answer from "../models/AnswerModel";

const API_BASE_URL =
  "http://localhost:8080/nfc-learning";
const VERSION_URI = API_BASE_URL + "/v1";
const ANSWER_URI = VERSION_URI + "/answer";
const CREATE_QUESTION_URI = ANSWER_URI + "/create";
const DELETE_ANSWER_URI = ANSWER_URI + "/delete";
const GET_ALL_URI = ANSWER_URI + "/list";
const GET_ALL_URI_NO_ASSOCIATED_QUESTION = ANSWER_URI + "/list-no-association-question";
const UPDATE_ANSWER_URI = ANSWER_URI + "/update";
const ASSOCIATE_ANSWER_QUESTION_URI = ANSWER_URI + "/associatequestion";

const GET_BY_ID_URI = ANSWER_URI + "/find-by-id";




const getAnswers = async () => {
  const token = Cookies.get("jwt-token");
  try {
    const response = await axios.get(GET_ALL_URI, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.error("Error getting lessons:", error);
    throw error;
  }
};

const getAnswerWithoutAssociationWithQuestion = async () => {
  const token = Cookies.get("jwt-token");
  try {
    const response = await axios.get(GET_ALL_URI_NO_ASSOCIATED_QUESTION, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.error("Error getting lessons:", error);
    throw error;
  }
};

const createAnswer = async (quiz: Answer) => {
  const token = Cookies.get("jwt-token");
  try {
    const response = await axios.post(CREATE_QUESTION_URI, quiz, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response;
  } catch (error) {
    console.error("Error getting lessons:", error);
    throw error;
  }
};

const deleteAnswer = async (answerId: number) => {
  const token = Cookies.get("jwt-token");
  const url = `${DELETE_ANSWER_URI}?idAnswer=${answerId}`;

  try {
    const response = await axios.put(url, {}, {
          headers: {Authorization: `Bearer ${token}`}
      });
    return response;
  } catch (error) {
    console.error("Error deleting answer:", error);
    throw error;
  }
};

const updateAnswer = async (answerId: number, answer: Answer) => {
  const token = Cookies.get("jwt-token");
  const url = `${UPDATE_ANSWER_URI}?idAnswer=${answerId}`;
  try {
    const response = await axios.put(url, answer, {headers: { Authorization: `Bearer ${token}` }});
    return response;
  } catch (error) {
    console.error("Error during update of the answer:", error);
    throw error;
  }
};

const getAnswerById = async (answerId: number | undefined) => {
  const token = Cookies.get("jwt-token");
  const url = `${GET_BY_ID_URI}?idAnswer=${answerId}`;
  try {
    const response = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } })
    return response;
  } catch (error) {
    console.error("Error getting answer:", error);
    throw error;
  }
};

const associateAnswerQuestion = async (answerId: number, questionId: number) => {
  const token = Cookies.get("jwt-token");
  const url = `${ASSOCIATE_ANSWER_QUESTION_URI}?idAnswer=${answerId}&idQuestion=${questionId}`;
  try {
    const response = await axios.put(url, {}, { headers: { Authorization: `Bearer ${token}` } });
    return response;
  } catch (error) {
    console.error("Error associate the answer to the question:", error);
    throw error;
  }
};

const AnswerService = {
  getAnswers,
  getAnswerWithoutAssociationWithQuestion,
  createAnswer,
  deleteAnswer,
  updateAnswer,
  getAnswerById,
  associateAnswerQuestion,
}

export default AnswerService;