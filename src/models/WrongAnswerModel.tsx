import Question from "./QuestionModel";

interface WrongAnswer {
    id: number,
    text: string,
    question: Question
}

export default WrongAnswer;