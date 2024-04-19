import Ability from "./AbilityModel";
import Lesson from "./LessonModel";

interface Course {
  id?: number;
  name?: string;
  description?: string;
  backgroundImage?: string;
  imageResource?: string,
  lessons?: Lesson[];
  abilities?: Ability[];
  createDate?: Date;
  lastModified?: Date;
  createdBy?: string;
  lastModifiedBy?: string;
}

export default Course;
