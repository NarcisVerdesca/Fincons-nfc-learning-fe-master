import Quiz from "./QuizModel";
import Lesson from "./LessonModel";

interface QuizLesson {
  id?: number;
  quiz?: Quiz,
  lesson?: Lesson
}

export default QuizLesson;
