import axios from "axios";
import Cookies from "js-cookie";
import Course from "../models/CourseModel";
import AbilityCourse from "../models/AbilityCourse";

const ABILITY_COURSE_API_BASE_URL = "http://localhost:8080/nfc-learning";
const VERSION_URI = ABILITY_COURSE_API_BASE_URL + "/v1";
const ABILITY_COURSE_URI = VERSION_URI + "/ability-course";
const GET_ALL_URI = ABILITY_COURSE_URI + "/list";
const GET_BY_ID = ABILITY_COURSE_URI + "/find-by-id";
const CREATE_ABILITY_COURSE = ABILITY_COURSE_URI + "/add";
const UPDATE_ABILITY_COURSE = ABILITY_COURSE_URI + "/update";
const DELETE_ABILITY_COURSE = ABILITY_COURSE_URI + "/delete";


const getAbilityCourses = async () => {
    const token = Cookies.get("jwt-token");
    try {
        const response = await axios.get(
            GET_ALL_URI,
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

const getAbilityCourseById = async (abilityCourseId: number) => {

    const token = Cookies.get("jwt-token");
    try {
        const response = await axios.get(
            GET_BY_ID + "/" + abilityCourseId,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error getting course by ID:", error);
        throw error;
    }
};

const createAbilityCourse = async (abilityId: number, courseId: number) => {

    const token = Cookies.get("jwt-token");
    try {
        const response = await axios.post(
            CREATE_ABILITY_COURSE,
            {
                ability: {
                    id: abilityId
                },
                course: {
                    id: courseId
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response;
    } catch (error) {
        console.error("Error creating course:", error);
        throw error;
    }
};

const updateAbilityCourse = async (courseId: number, updatedCourse: Course) => {

    const token = Cookies.get("jwt-token");
    try {
        const response = await axios.put(
            UPDATE_ABILITY_COURSE + "/" + courseId,
            {
                name: updatedCourse.name,
                description: updatedCourse.description,
                backgroundImage: updatedCourse.backgroundImage,
                imageResource: updatedCourse.imageResource
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error updating course:", error);
        throw error;
    }
};

const deleteAbilityCourse = async (courseId: number) => {

    const token = Cookies.get("jwt-token");
    try {
        const response = await axios.put(
            DELETE_ABILITY_COURSE,
            {},
            {
                params: {
                    id: courseId
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error deleting course:", error);
        throw error;
    }
};

const AbilityCourseService = {
    getAbilityCourses,
    getAbilityCourseById,
    createAbilityCourse,
    updateAbilityCourse,
    deleteAbilityCourse
};

export default AbilityCourseService;