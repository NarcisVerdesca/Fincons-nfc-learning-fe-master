import axios from "axios";
import Cookies from "js-cookie";
import Course from "../models/CourseModel";
import AbilityCourse from "../models/AbilityCourse";

const ABILITY_COURSE_API_BASE_URL = "http://localhost:8080/nfc-learning";
const VERSION_URI = ABILITY_COURSE_API_BASE_URL + "/v1";
const CHARTS_URI = VERSION_URI + "/audit-for-admin";
const GET_LIST_URI = CHARTS_URI + "/list";
const GET_COUNT_COURSE_URI = CHARTS_URI + "/course";
const GET_COUNT_QUIZ_URI = CHARTS_URI + "/quiz";


const getAllAudit= async () => {
    const token = Cookies.get("jwt-token");
    try {
        const response = await axios.get(
            GET_LIST_URI,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error getting courses:", error);
        throw error;
    }
};


const getCountCourse= async () => {
    const token = Cookies.get("jwt-token");
    try {
        const response = await axios.get(
            GET_COUNT_COURSE_URI,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error getting courses:", error);
        throw error;
    }
};


const getCountQuiz= async () => {
    const token = Cookies.get("jwt-token");
    try {
        const response = await axios.get(
            GET_COUNT_QUIZ_URI,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error getting courses:", error);
        throw error;
    }
};



const ChartsService = {
    getAllAudit,
    getCountCourse,
    getCountQuiz
};

export default ChartsService;