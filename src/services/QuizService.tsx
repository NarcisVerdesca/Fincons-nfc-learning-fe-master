import axios from "axios";
import Cookies from "js-cookie";
import Quiz from "../models/QuizModel";

const API_BASE_URL =
  "http://localhost:8080/nfc-learning";
const VERSION_URI = API_BASE_URL + "/v1";
const QUIZ_URI = VERSION_URI + "/quiz";
const CREATE_QUIZ = QUIZ_URI + "/create";
const GET_ALL_URI = QUIZ_URI + "/list";
const GET_ALL_URI_NO_ASSOCIATED_LESSON = QUIZ_URI + "/list-no-association-lesson";
const GET_ALL_URI_NO_ASSOCIATED_QUESTION = QUIZ_URI + "/list-no-association-question";
const GET_BY_ID = QUIZ_URI + "/find-by-id";
const SEND_QUIZ = VERSION_URI + "/quiz-student-result/calculate-and-save";
const RESEND_QUIZ = VERSION_URI + "/quiz-student-result/quiz-redo";
const ASSOCIATE_WITH_LESSON = QUIZ_URI + "/associatelesson";
const ASSOCIATE_WITH_QUESTION = QUIZ_URI + "/associatequestion";
const CHECK_QUIZ = VERSION_URI + "/quiz-student-result/check";
const UPDATE_QUIZ_URI = QUIZ_URI + "/update";
const DELETE_QUIZ_URI = QUIZ_URI + "/delete";


const getQuizzes = async () => {
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

const getQuizzesWithoutAssociationWithLesson = async () => {
  const token = Cookies.get("jwt-token");
  try {
    const response = await axios.get(GET_ALL_URI_NO_ASSOCIATED_LESSON, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.error("Error getting lessons:", error);
    throw error;
  }
};

const getQuizzesWithoutAssociationWithQuestion = async () => {
  const token = Cookies.get("jwt-token");
  try {
    const response = await axios.get(GET_ALL_URI_NO_ASSOCIATED_QUESTION, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error getting lessons:", error);
    throw error;
  }
};

const createQuiz = async (quiz: Quiz) => {
  const token = Cookies.get("jwt-token");
  try {
    const response = await axios.post(CREATE_QUIZ, quiz, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response;
  } catch (error) {
    console.error("Error during creation of quiz:", error);
    throw error;
  }
};

const getQuizById = async (quizId: number | undefined) => {
  const token = Cookies.get("jwt-token");
  try {
    const response = await axios.get(GET_BY_ID + "/" + quizId, { headers: { Authorization: `Bearer ${token}` } })
    return response.data;
  } catch (error) {
    console.error("Error getting quiz with id:" + quizId, error);
    throw error;
  }
};

const sendQuizResult = async (quizId: number, answersMap: any) => {
  const token = Cookies.get("jwt-token");
  const url = `${SEND_QUIZ}?quizId=${quizId}`;
  try {
    const response = await axios.post(url, { answersMap }, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    console.error("Error getting lessons:", error);
    throw error;
  }

};

const reSendQuizResult = async (quizId: number, answersMap: any) => {
  const token = Cookies.get("jwt-token");
  const url = `${RESEND_QUIZ}?quizToRedo=${quizId}`;
  try {
    const response = await axios.put(url, { answersMap }, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    console.error("Error getting lessons:", error);
    throw error;
  }
};

const updateQuiz = async (quizId: number, quiz: Quiz) => {
  const token = Cookies.get("jwt-token");
  const url = `${UPDATE_QUIZ_URI}?idQuiz=${quizId}`;
  try {
    const response = await axios.put(url, quiz, { headers: { Authorization: `Bearer ${token}` } });
    return response;
  } catch (error) {
    console.error("Error during update of quiz:", error);
    throw error;
  }
};

const deleteQuiz = async (quizId: number) => {
  const token = Cookies.get("jwt-token");
  const url = `${DELETE_QUIZ_URI}?idQuiz=${quizId}`;

  try {
    const response = await axios.put(url, {}, {
          headers: {Authorization: `Bearer ${token}`}
      });
    return response.data;
  } catch (error) {
    console.error("Error deleting quiz:", error);
    throw error;
  }
};

const checkQuizResult = async (quizId: number) => {
  const token = Cookies.get("jwt-token");
  const url = `${CHECK_QUIZ}?quizId=${quizId}`;
  try {
    const response = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    console.error("Error getting lessons:", error);
    throw error;
  }
};

const associateQuizToLesson = async (quizId: number, lessonId: number) => {
  const token = Cookies.get("jwt-token");
  const url = `${ASSOCIATE_WITH_LESSON}?idQuiz=${quizId}&idLesson=${lessonId}`;
  try {
    const response = await axios.put(url, {}, { headers: { Authorization: `Bearer ${token}` } });
    return response;
  } catch (error) {
    console.error("Error getting lessons:", error);
    throw error;
  }
};

const associateQuizToQuestion = async (quizId: number, questionId: number) => {
  const token = Cookies.get("jwt-token");
  const url = `${ASSOCIATE_WITH_QUESTION}?idQuiz=${quizId}&idQuestion=${questionId}`;
  try {
    const response = await axios.put(url, {}, { headers: { Authorization: `Bearer ${token}` } });
    return response;
  } catch (error) {
    console.error("Error getting lessons:", error);
    throw error;
  }
};

const QuizService = {
  getQuizzes,
  getQuizzesWithoutAssociationWithLesson,
  getQuizzesWithoutAssociationWithQuestion,
  deleteQuiz,
  createQuiz,
  updateQuiz,
  getQuizById,
  sendQuizResult,
  reSendQuizResult,
  checkQuizResult,
  associateQuizToLesson,
  associateQuizToQuestion
}

export default QuizService;