import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuizService from "../../../services/QuizService";
import Quiz from "../../../models/QuizModel";

const DeleteQuizTutor = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [selectedQuizId, setSelectedQuizId] = useState<number | null>(null);
  const [quiz, setQuiz] = useState<Quiz>();
  const [deletedQuiz, setDeletedQuiz] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [isCallComplete, setIsCallComplete] = useState(false);
  const [deletionMessage, setDeletionMessage] = useState<string>("");

  const navigate = useNavigate();

  const refreshList = () => {
    QuizService.getQuizzes().then((res) => {
      setQuizzes(res.data.data);
    });
  };

  useEffect(() => {
    refreshList();
  }, []);

  useEffect(() => {
    if (selectedQuizId !== null) {
      QuizService.getQuizById(selectedQuizId).then((res) => {
        setQuiz(res.data.data);
      });
    }
  }, [selectedQuizId]);

  const deleteQuiz = async () => {
    try {
      setLoading(true);
      const tempDeletedQuiz = await QuizService.deleteQuiz(selectedQuizId!);
      setDeletedQuiz(tempDeletedQuiz);
      setIsCallComplete(true);
      setDeletionMessage("Quiz deleted successfully! ");
      refreshList();
    } catch (error: any) {
      console.error("Errore durante eliminazione quiz:", error);
      setDeletedQuiz(error.response);
      setIsCallComplete(true);
      setDeletionMessage("Problems were encountered during deletion! ");
      refreshList();
    } finally {
      setLoading(false);
    }
  };

  const backToSettings = () => {
    navigate("/settings_tutor");
  };

  return (
    <div>
      <div>
        <h3 className="titleModal">Delete Quiz</h3>
        <div>
          <form>
            <div className="form-group">
              <label className="labelModal">Quiz</label>
              <select
                name="quiz"
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => {
                  setSelectedQuizId(Number(e.target.value));
                }}
              >
                <option selected hidden disabled>
                  Select the Quiz to delete
                </option>
                {quizzes.map((quiz) => {
                  return (
                    <option key={quiz.id} value={quiz.id}>
                      {quiz.title}
                    </option>
                  );
                })}
              </select>
            </div>
            {loading && <div>Delete in progress...</div>}

            {isCallComplete && (
              <div>
                <label className="labelModal">{deletionMessage}</label>
              </div>
            )}

            {quiz && (
              <div className="containerButtonModal">
                <button
                  className="buttonCheck"
                  onClick={deleteQuiz}
                  type="button"
                >
                  <span className="frontCheck">
                    <i className="bi bi-check2"></i>
                  </span>
                </button>
                <button className="buttonReturn" onClick={backToSettings}>
                  <span className="frontReturn">
                    <i className="bi bi-arrow-left"></i>
                  </span>
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
export default DeleteQuizTutor;
