import Content from "./ContentModel";
import Course from "./CourseModel";
import Quiz from "./QuizModel";

interface Lesson {
    id?: number,
    title: string,
    backgroundImage: string,
    courses?: Course[],
    quiz?: Quiz,
    content?: Content,
    createDate?: Date,
    lastModified?: Date,
    createdBy?: string,
    lastModifiedBy?: string,
}

export default Lesson;