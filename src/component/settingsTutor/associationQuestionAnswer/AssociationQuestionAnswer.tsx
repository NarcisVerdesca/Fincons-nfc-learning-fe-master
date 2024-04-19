import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionService from "../../../services/QuestionService";
import AnswerService from "../../../services/AnswerService";
import Question from "../../../models/QuestionModel";
import Answer from "../../../models/AnswerModel";

const CreateAssociationQuestionAnswer = () => {
  const [questionId, setQuestionId] = useState<number | any>();
  const [answerId, setAnswerId] = useState<number | any>();
  const [questions, setQuestions] = useState<Question | any>();
  const [answers, setAnswers] = useState<any>();
  const [association, setAssociation] = useState<any>();
  const [associatedSuccessfully, setAssociatedSuccessfully] = useState<boolean | null>(null);
  const [resourceAlreadyExists, setResourceAlreadyExists] = useState<boolean>();
  const [loading, setLoading] = useState<boolean | null>(null);
  const [isCallComplete, setIsCallComplete] = useState(false);

  const navigate = useNavigate();

  const refreshList = () => {
    QuestionService.getQuestions().then((res1) => {
      setQuestions(res1.data.data);
    });

    AnswerService.getAnswerWithoutAssociationWithQuestion().then((res2) => {
      setAnswers(res2.data.data);
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
      }
    }
  }, [association, isCallComplete]);

  const saveQuestionAnswer = async () => {
    try {
      setLoading(true);
      const tempAssociation = await AnswerService.associateAnswerQuestion(answerId, questionId);
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
      <h3 className="titleModal"> Associate Question with Answer </h3>
      <form>
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
            {questions?.map((question: Question, index: any) => {
              return (
                <option key={index} value={question.id}>
                  {question?.textQuestion}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label className="labelModal">Answer</label>
          <select
            name="answer"
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => {
              setAnswerId(parseInt(e.target.value));
            }}
          >
            <option selected hidden disabled>Select the Answer</option>
            {answers?.map((answer: Answer, index: any) => {
              return (
                <option key={index} value={answer?.id}>
                  {answer?.text + "[" + answer?.correct + "]"}{" "}
                </option>
              );
            })}
          </select>
        </div>
        {loading && <div>Saving in progress...</div>}

        {!loading && associatedSuccessfully && isCallComplete && (
          <div>
            <label className="labelModal">The question was successfully associated with the answer.</label>
          </div>
        )}

        {!loading && !associatedSuccessfully && isCallComplete && (
          <div>
            <label className="labelModal">Problems were encountered during the association!</label>
          </div>
        )}


        <div className="containerButtonModal">
          <button className="buttonCheck" onClick={saveQuestionAnswer} type="button" disabled={loading==true}>
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

export default CreateAssociationQuestionAnswer;
