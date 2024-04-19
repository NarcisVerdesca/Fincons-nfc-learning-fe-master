import axios from "axios";
import Cookies from "js-cookie";

const COURSE_LESSON_API_BASE_URL =
    "http://localhost:8080/nfc-learning";
const VERSION_URI = COURSE_LESSON_API_BASE_URL + "/v1";
const COURSE_LESSON_URI = VERSION_URI + "/course-lesson";
const GET_ALL_URI = COURSE_LESSON_URI + "/list";
const GET_BY_ID = COURSE_LESSON_URI + "/find-by-id";
const CREATE_COURSE_LESSON = COURSE_LESSON_URI + "/add";
const UPDATE_COURSE_LESSON = COURSE_LESSON_URI + "/update";
const DELETE_COURSE_LESSON = COURSE_LESSON_URI + "/delete";

const getCourseLessons = async () => {
    const token = Cookies.get("jwt-token");

    try {
        const response = await axios.get(GET_ALL_URI, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error getting courses:", error);
        throw error;
    }
};

const createCourseLesson = async (courseId: number, lessonId: number) => {
    const token = Cookies.get("jwt-token");

    try {
        const response = await axios.post(
            CREATE_COURSE_LESSON,
            {
                course: {
                    id: courseId
                },
                lesson: {
                    id: lessonId
                }
            },
            {
                headers: { 
                    Authorization: `Bearer ${token}` 
                },
            }
        );
        return response;
    } catch (error) {
        console.error("Error getting courses:", error);
        throw error;
    }

}

const CourseLessonService = {
    getCourseLessons,
    createCourseLesson
};

export default CourseLessonService;