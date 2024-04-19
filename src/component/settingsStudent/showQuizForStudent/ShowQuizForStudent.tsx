import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuizResultsModel from "../../../models/QuizResultsModel";
import QuizResultsService from "../../../services/QuizResultsService";

const ShowQuizForStudent = () => {
    const [quizResults, setQuizResults] = useState<QuizResultsModel[]>([]);

    useEffect(() => {
        QuizResultsService.getQuizResultsForSingleStudent().then((res) => {
            setQuizResults(res.data);
        });
    }, []);

    const getScoreColor = (score: number) => {
        if (score > 50) {
            return "text-success";
        } else if (score < 50) {
            return "text-danger";
        } else {
            return "text-warning";
        }
    };



    return (
        <div style={{ overflowX: "auto" }}>
        <h3 className="display-4 text-danger text-center">Quiz Results</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col" className="display-6 text-center ">Id</th>
                        <th scope="col" className="display-6 text-center">First</th>
                        <th scope="col" className="display-6 text-center">Last</th>
                        <th scope="col" className="display-6 text-center">Email</th>
                        <th scope="col" className="display-6 text-center">Quiz</th>
                        <th scope="col" className="display-6 text-center">Score</th>
                        <th scope="col" className="display-6 text-center">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {quizResults.map((quizResult) => {
                        return (
                            <tr key={quizResult.id}>
                                <th scope="row"> {quizResult.id}</th>
                                <td className="text-center font-weight-bold">{quizResult.user.firstName}</td>
                                <td className="text-center font-weight-bold">{quizResult.user.lastName}</td>
                                <td className="text-center fw-light">{quizResult.user.email}</td>
                                <td className="text-center fw-light">{quizResult.quiz.title}</td>
                                <td className={`text-center font-weight-bold ${getScoreColor(quizResult.totalScore)}`}>{quizResult.totalScore}%</td>
                                <td className="text-center fw-light">{quizResult.whenDone ? JSON.stringify(quizResult.whenDone) : "N/A"}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
    </div>
    );
};

export default ShowQuizForStudent;
