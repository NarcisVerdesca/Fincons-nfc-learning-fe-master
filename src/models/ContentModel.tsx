import Lesson from "./LessonModel";

interface Content {
    id: number,
    typeContent: string,
    content: string,
    lesson: Lesson
}

export default Content;