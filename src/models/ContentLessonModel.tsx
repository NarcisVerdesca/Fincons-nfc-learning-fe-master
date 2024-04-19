import Content from "./ContentModel";
import Lesson from "./LessonModel";

interface CourseLesson {
  id?: number;
  content?: Content,
  lesson?: Lesson
}

export default CourseLesson;
