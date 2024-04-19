import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Quiz from "../../../models/QuizModel";
import QuizService from "../../../services/QuizService";
import QuestionService from "../../../services/QuestionService";
import QuestionModel from "../../../models/QuestionModel";

const CreateAssociationQuizQuestion = () => {
  const [quizId, setQuizId] = useState<number | any>();
  const [questionId, setQuestionId] = useState<number | any>();
  const [questions, setQuestions] = useState<QuestionModel | any>();
  const [quiz, setQuiz] = useState<any>();
  const [errorMessage, setErrorMessage] = useState(null);
  const [association, setAssociation] = useState<any>();
  const [associatedSuccessfully, setAssociatedSuccessfully] = useState<boolean | null>(null);
  const [resourceAlreadyExists, setResourceAlreadyExists] = useState<boolean>();
  const [loading, setLoading] = useState<boolean | null>(null);
  const [isCallComplete, setIsCallComplete] = useState(false);
  const navigate = useNavigate();

  const refreshList = () => {
    QuizService.getQuizzes().then((res1) => {
      setQuiz(res1.data.data);
    });

    QuestionService.getQuestionsWithoutAssociationWithQuiz().then((res2) => {
      setQuestions(res2.data.data);
    });

  }

  useEffect(() => {
    refreshList();
  }, []);

  useEffect(() => {
    console.log("Use effect association:" + association);

    if (association && isCallComplete) {
      if (association.status === 200) {
        setAssociatedSuccessfully(true);
        setResourceAlreadyExists(false);
      } else if (association.status === 409) {
        setAssociatedSuccessfully(false);
        setResourceAlreadyExists(true);
        setErrorMessage(association.data.message);
      }
    }
  }, [association, isCallComplete]);

  const saveQuizQuestion = async () => {
    console.log("id quiz:" + quizId);
    console.log("id quiz:" + questionId);
    try {
      setLoading(true);
      const tempAssociation = await QuizService.associateQuizToQuestion(quizId, questionId);
      setAssociation(tempAssociation);
      console.log("Association: " + tempAssociation)
      setIsCallComplete(true);
      refreshList();
    } catch (error: any) {
      console.error("Errore durante l'associazione corso-lezione:", error);
      setAssociation(error.response);
      setIsCallComplete(true);
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
      <h3 className="titleModal"> Associate Quiz with Question </h3>
      <form>
        <div className="form-group">
          <label className="labelModal">Quiz</label>
          <select
            name="quiz"
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => {
              setQuizId(parseInt(e.target.value));
            }}
          >
            <option selected hidden disabled>Select the Quiz</option>
            {quiz?.map((quizzes: Quiz, index: any) => {
              return (
                <option key={index} value={quizzes.id}>
                  {quizzes?.title}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label className="labelModal">Question</label>
          <select
            name="question"
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => {
              setQuestionId(parseInt(e.target.value));
            }}
          >
            <option selected hidden disabled>Select the Question</option>
            {questions?.map((question: QuestionModel, index: any) => {
              return (
                <option key={index} value={question?.id}>
                  {question?.textQuestion}
                </option>
              );
            })}
          </select>
        </div>

        {loading && <div>Saving in progress...</div>}

        {!loading && associatedSuccessfully && isCallComplete && (
          <div>
            <label className="labelModal">The quiz was successfully associated with the question.</label>
          </div>
        )}

        {!loading && !associatedSuccessfully && isCallComplete && (
          <div>
            <label className="labelModal">Problems were encountered during the association!</label>
            {errorMessage && (
              <div><p>{errorMessage}</p></div>
            )}
          </div>
        )}

        <div className="containerButtonModal">
          <button className="buttonCheck" onClick={saveQuizQuestion} type="button" disabled={loading== true}>
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
      </form>
    </div>
  );
};

export default CreateAssociationQuizQuestion;
