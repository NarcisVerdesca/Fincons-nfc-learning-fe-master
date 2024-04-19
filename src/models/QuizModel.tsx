import Lesson from "./LessonModel";
import Question from "./QuestionModel";

interface Quiz {
    id: number,
    title: string,
    questions: Question[],
    lesson: Lesson,
    createDate?: Date;
    lastModified?: Date;
    createdBy?: string;
    lastModifiedBy?: string;
}

export default Quiz;