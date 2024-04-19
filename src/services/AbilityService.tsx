import axios from "axios";
import Cookies from "js-cookie";
import Ability from "../models/AbilityModel";

const ABILITY_API_BASE_URL = "http://localhost:8080/nfc-learning";
const VERSION_URI = ABILITY_API_BASE_URL + "/v1";
const ABILITY_URI = VERSION_URI + "/ability";
const GET_ALL_URI = ABILITY_URI + "/list";
const GET_BY_ID = ABILITY_URI + "/find-by-id";
const CREATE_ABILITY = ABILITY_URI + "/create";
const UPDATE_ABILITY = ABILITY_URI + "/update";
const DELETE_ABILITY = ABILITY_URI + "/delete";

const getAbilities = async () => {
    const token = Cookies.get("jwt-token");
    try {
        const response = await axios.get(GET_ALL_URI, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        console.error("Error getting abilities:", error);
        throw error;
    }
};

const getAbilityById = async (abilityId: number | undefined) => {
    const token = Cookies.get("jwt-token");
    try {
        const response = await axios.get(GET_BY_ID + "/" + abilityId, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        console.error("Error getting ability by ID:", error);
        throw error;
    }
};

const createAbility = async (ability: Ability) => {
    const token = Cookies.get("jwt-token");
    try {
        const response = await axios.post(CREATE_ABILITY, ability, { headers: { Authorization: `Bearer ${token}` } });
        return response;
    } catch (error) {
        console.error("Error creating ability:", error);
        throw error;
    }
};

const updateAbility = async (abilityId: number, updatedAbility: Ability) => {
    const token = Cookies.get("jwt-token");
    try {
        const response = await axios.put(
            UPDATE_ABILITY + "/" + abilityId,
            {
                name: updatedAbility.name
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response;
    } catch (error) {
        console.error("Error updating ability:", error);
        throw error;
    }
};

const deleteAbility = async (abilityId: number) => {
    const token = Cookies.get("jwt-token");
    try {
        const response = await axios.put(
            DELETE_ABILITY,
            {},
            {
                params: {
                    id: abilityId
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return response.data;
    } catch (error) {
        console.error("Error deleting course:", error);
        throw error;
    }
};

const AbilityService = {
    getAbilities,
    getAbilityById,
    createAbility,
    updateAbility,
    deleteAbility
};

export default AbilityService;