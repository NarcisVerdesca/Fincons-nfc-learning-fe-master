import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Answer from "../../../models/AnswerModel";
import AnswerService from "../../../services/AnswerService";

const CreateAnswer = () => {
    const [answer, setAnswer] = useState<Answer>();
    const [savedAnswer, setSavedAnswer] = useState<any>();
    const [savedSuccessfully, setSaveSuccessfully] = useState<boolean>();
    const [resourceAlreadyExists, setResourceAlreadyExists] = useState<boolean>();
    const [loading, setLoading] = useState(false);
    const [isCallComplete, setIsCallComplete] = useState(false);



  const navigate = useNavigate();

  const saveAnswer = async () => {
    try {
      setLoading(true);
      const tempSavedAnswer = await AnswerService.createAnswer(answer!);
      setSavedAnswer(tempSavedAnswer);
      setIsCallComplete(true);
  } catch (error: any) {
      console.error("Errore durante il salvataggio del quiz:", error);
      setSavedAnswer(error.response);
      setIsCallComplete(true);
  } finally {
      setLoading(false);
  }
 };


 useEffect(() => {
  console.log("Use effect saved answer:" + savedAnswer);

  if (savedAnswer && isCallComplete) {
      if (savedAnswer.status === 200) {
          setSaveSuccessfully(true);
          setResourceAlreadyExists(false);
      } else if (savedAnswer.status === 409) {
          setSaveSuccessfully(false);
          setResourceAlreadyExists(true);
      }
  }
}, [savedAnswer, isCallComplete]);

  const backToSettings = () => {
    navigate("/settings_tutor");
  };

  return (
    <div>
      <div>
        <h3 className="titleModal"> Create Answer </h3>
        <div>
          <form>
            <div>
              <label className="labelModal">Text</label>
              <input
                type="string"
                placeholder="Text"
                name="text"
                className="form-control"
                value={answer?.text}
                onChange={(e) => {
                  setAnswer({
                    ...answer!,
                    text: e.target.value,
                  });
                }}
              ></input>
            </div>

            <div>
              <label className="labelModal">Is correct answer?</label>{" "}
              <input
                type="checkbox"
                name="isCorrect"
                checked={answer?.correct}
                onChange={(e) => {
                  setAnswer({
                    ...answer!,
                    correct: e.target.checked,
                  });
                }}
              ></input>
            </div>

            {loading && <div>Saving in progress...</div>}

                {!loading && savedSuccessfully && (
                    <div>
                        <label className="labelModal">Answer saved correctly!</label>
                    </div>
                )}

                {!loading && !savedSuccessfully && resourceAlreadyExists && (
                    <div>
                        <label className="labelModal">The answer already exists!</label>
                    </div>
                )}

            <div className="containerButtonModal">
              <button className="buttonCheck" disabled={loading || !answer?.text} onClick={saveAnswer}>
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
      </div>
    </div>
  );
};

export default CreateAnswer;
