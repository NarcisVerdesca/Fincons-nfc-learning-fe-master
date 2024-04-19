import Course from "./CourseModel";
import Lesson from "./LessonModel";

interface CourseLesson {
  id?: number;
  course?: Course,
  lesson?: Lesson
}

export default CourseLesson;
