import axios from "axios";
import Cookies from "js-cookie";
import Course from "../models/CourseModel";
import Lesson from "../models/LessonModel";

const LESSON_API_BASE_URL = "http://localhost:8080/nfc-learning";
const VERSION_URI = LESSON_API_BASE_URL + "/v1";
const LESSON_URI = VERSION_URI + "/lesson";
const GET_ALL_URI = LESSON_URI + "/list";
const GET_ALL_NOT_ASSOCIATED_WITH_QUIZ_URI = LESSON_URI + "/list-no-association-quiz";
const GET_ALL_NOT_ASSOCIATED_WITH_COURSE_URI = LESSON_URI + "/list-no-association-course";
const GET_ALL_NOT_ASSOCIATED_WITH_CONTENT_URI = LESSON_URI + "/list-no-association-content";
const GET_BY_ID = LESSON_URI + "/find-by-id";
const CREATE_LESSON = LESSON_URI + "/add";
const UPDATE_LESSON = LESSON_URI + "/update";
const ASSOCIATE_CONTENT_TO_LESSON = LESSON_URI + "/lesson-content-association";
const DELETE_LESSON = LESSON_URI + "/delete";



const getLessons = async () => {
    const token = Cookies.get("jwt-token");

    try {
        const response = await axios.get(GET_ALL_URI, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error getting lessons:", error);
        throw error;
    }
};

const getNotAssociatedLessonsWithQuiz = async () => {
    const token = Cookies.get("jwt-token");

    try {
        const response = await axios.get(GET_ALL_NOT_ASSOCIATED_WITH_QUIZ_URI, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response;
    } catch (error) {
        console.error("Error getting lessons:", error);
        throw error;
    }
};

const getNotAssociatedLessonsWithCourse = async () => {
    const token = Cookies.get("jwt-token");

    try {
        const response = await axios.get(GET_ALL_NOT_ASSOCIATED_WITH_COURSE_URI, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error getting lessons:", error);
        throw error;
    }
};

const getNotAssociatedLessonsWithContent = async () => {
    const token = Cookies.get("jwt-token");

    try {
        const response = await axios.get(GET_ALL_NOT_ASSOCIATED_WITH_CONTENT_URI, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response;
    } catch (error) {
        console.error("Error getting lessons:", error);
        throw error;
    }
};

const getLessonById = async (lessonId: number) => {
    const token = Cookies.get("jwt-token");

    try {
        const response = await axios.get(GET_BY_ID + "/" + lessonId, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        console.error("Error getting lesson by ID:", error);
        throw error;
    }
};

const createLesson = async (lesson: Lesson) => {
    const token = Cookies.get("jwt-token");

    try {
        const response = await axios.post(CREATE_LESSON, lesson, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response;
    } catch (error) {
        console.error("Error creating lesson:", error);
        throw error;
    }
};

const updateLesson = async (lessonId: number, updatedLesson: Lesson) => {
    const token = Cookies.get("jwt-token");

    try {
        const response = await axios.put(
            UPDATE_LESSON + "/" + lessonId,
            {
                title: updatedLesson.title,
                backgroundImage: updatedLesson.backgroundImage
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response;
    } catch (error) {
        console.error("Error updating lesson:", error);
        throw error;
    }
};

const associateLessonContent = async (lessonId: number, contentId: number) => {
    const token = Cookies.get("jwt-token");
    const url = `${ASSOCIATE_CONTENT_TO_LESSON}?lesson=${lessonId}&content=${contentId}`;
    try {
      const response = await axios.put(url, {}, { headers: { Authorization: `Bearer ${token}` } });
      return response;
    } catch (error) {
      console.error("Error during association lesson-content:", error);
      throw error;
    }
};

const deleteLesson = async (lessonId: number) => {
    const token = Cookies.get("jwt-token");

    try {
        const response = await axios.put(
            DELETE_LESSON,
            {},
            {
                params: {
                    id: lessonId
                },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error deleting lesson:", error);
        throw error;
    }
};

const LessonService = {
    getLessons,
    getNotAssociatedLessonsWithQuiz,
    associateLessonContent,
    getNotAssociatedLessonsWithCourse,
    getNotAssociatedLessonsWithContent,
    getLessonById,
    createLesson,
    updateLesson,
    deleteLesson
};

export default LessonService;