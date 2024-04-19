import Ability from "./AbilityModel";
import Course from "./CourseModel";

interface AbilityCourse {
  name: string;
  id?: number;
  ability?: Ability[];
  course?: Course[];
}

export default AbilityCourse;
