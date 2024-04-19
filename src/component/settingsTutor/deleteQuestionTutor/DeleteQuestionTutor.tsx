import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionService from "../../../services/QuestionService";
import Question from "../../../models/QuestionModel";

const DeleteQuestionTutor = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(
    null
  );
  const [question, setQuestion] = useState<Question>();

  const [loading, setLoading] = useState(false);
  const [isCallComplete, setIsCallComplete] = useState(false);
  const [deletionMessage, setDeletionMessage] = useState<string>("");

  const navigate = useNavigate();

  const refreshList = () => {
    QuestionService.getQuestions().then((res) => {
      setQuestions(res.data.data);
    });
  };

  useEffect(() => {
    refreshList();
  }, []);

  useEffect(() => {
    if (selectedQuestionId !== null) {
      QuestionService.getQuestionById(selectedQuestionId).then((res) => {
        setQuestion(res.data.data);
      });
    }
  }, [selectedQuestionId]);

  const deleteQuestion = async () => {
    try {
      setLoading(true);
      const tempDeletedQuiz = await QuestionService.deleteQuestion(
        selectedQuestionId!
      );
      setIsCallComplete(true);
      setDeletionMessage("Question deleted successfully! ");
      refreshList();
    } catch (error: any) {
      console.error("Errore durante eliminazione question:", error);
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
        <h3 className="titleModal">Delete Question</h3>
        <div>
          <form>
            <div className="form-group">
              <label className="labelModal">Question</label>
              <select
                name="quiz"
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => {
                  setSelectedQuestionId(Number(e.target.value));
                }}
              >
                <option selected hidden disabled>
                  Select the Question to delete
                </option>
                {questions.map((question) => {
                  return (
                    <option key={question.id} value={question.id}>
                      {question.textQuestion}
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

            {question && (
              <>
                <div className="containerButtonModal">
                  <button
                    type="button"
                    className="buttonCheck"
                    onClick={deleteQuestion}
                    disabled={loading}
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
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
export default DeleteQuestionTutor;
