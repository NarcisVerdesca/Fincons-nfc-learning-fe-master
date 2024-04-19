import Quiz from "./QuizModel";
import AnswerModel from "./AnswerModel";

interface Question {
    id: number,
    textQuestion: string,
    answers: AnswerModel[];
    quiz: Quiz,
    valueOfQuestion: number
}

export default Question;