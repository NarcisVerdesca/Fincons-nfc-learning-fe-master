import axios from "axios";
import Cookies from "js-cookie";
import Question from "../models/QuestionModel";

const API_BASE_URL =
  "http://localhost:8080/nfc-learning";
const VERSION_URI = API_BASE_URL + "/v1";
const QUESTION_URI = VERSION_URI + "/question";
const CREATE_QUESTION = QUESTION_URI + "/create";
const UPDATE_QUESTION = QUESTION_URI + "/update";
const DELETE_QUESTION = QUESTION_URI + "/delete";
const GET_ALL_URI = QUESTION_URI + "/list";

const GET_ALL_URI_NO_ASSOCIATED_QUIZ = QUESTION_URI + "/list-no-association-quiz";
const GET_ALL_URI_NO_ASSOCIATED_ANSWER = QUESTION_URI + "/list-no-association-answer";
const GET_BY_ID = QUESTION_URI + "/find-by-id";



const getQuestions = async () => {
  const token = Cookies.get("jwt-token");
  try {
    const response = await axios.get(GET_ALL_URI, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.error("Error getting question:", error);
    throw error;
  }
};

const getQuestionsWithoutAssociationWithQuiz = async () => {
  const token = Cookies.get("jwt-token");
  try {
    const response = await axios.get(GET_ALL_URI_NO_ASSOCIATED_QUIZ, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.error("Error getting lessons:", error);
    throw error;
  }
};

const getQuestionsWithoutAssociationWithAnswer = async () => {
  const token = Cookies.get("jwt-token");
  try {
    const response = await axios.get(GET_ALL_URI_NO_ASSOCIATED_ANSWER, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.error("Error getting Questions:", error);
    throw error;
  }
};

const createQuestion = async (question: Question) => {
  const token = Cookies.get("jwt-token");
  try {
    const response = await axios.post(CREATE_QUESTION, question, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response;
  } catch (error) {
    console.error("Error during create of question:", error);
    throw error;
  }
};

const deleteQuestion = async (questionId: number) => {
  const token = Cookies.get("jwt-token");
  const url = `${DELETE_QUESTION}?idQuestion=${questionId}`;

  try {
    const response = await axios.put(url, {}, {
          headers: {Authorization: `Bearer ${token}`}
      });
    return response;
  } catch (error) {
    console.error("Error deleting question:", error);
    throw error;
  }
};

const updateQuestion = async (questionId: number, question: Question) => {
  const token = Cookies.get("jwt-token");
  const url = `${UPDATE_QUESTION}?idQuestion=${questionId}`;
  try {
    const response = await axios.put(url, question, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response;
  } catch (error) {
    console.error("Error during update of the question:", error);
    throw error;
  }
};

const getQuestionById = async (questionId: number | undefined) => {
  const token = Cookies.get("jwt-token");
  const url = `${GET_BY_ID}?idQuestion=${questionId}`;

  try {
    const response = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } })
    return response;
  } catch (error) {
    console.error("Error getting question:", error);
    throw error;
  }
};

const QuestionService = {
  getQuestions,
  getQuestionsWithoutAssociationWithQuiz,
  updateQuestion,
  deleteQuestion,
  getQuestionsWithoutAssociationWithAnswer,
  createQuestion,
  getQuestionById,
}

export default QuestionService;