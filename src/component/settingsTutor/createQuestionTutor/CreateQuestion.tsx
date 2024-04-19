import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Question from "../../../models/QuestionModel";
import QuestionService from "../../../services/QuestionService";

const CreateQuestion = () => {
  const [question, setQuestion] = useState<Question>();
  const [textError, setTextError] = useState(false);
  const [textErrorMessage, setTextErrorMessage] = useState("");
  const [savedQuestion, setSavedQuestion] = useState<any>();
  const [savedSuccessfully, setSaveSuccessfully] = useState<boolean>();
  const [resourceAlreadyExists, setResourceAlreadyExists] = useState<boolean>();
  const [loading, setLoading] = useState(false);
  const [isCallComplete, setIsCallComplete] = useState(false);


  const navigate = useNavigate();

  const saveQuestion = async () => {
    try {
      setLoading(true);
      const tempSavedQuestion = await QuestionService.createQuestion(question!);
      setSavedQuestion(tempSavedQuestion);
      setIsCallComplete(true);
    } catch (error: any) {
      console.error("Errore durante il salvataggio della domanda:", error);
      setSavedQuestion(error.response);
      setIsCallComplete(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Use effect saved answer:" + savedQuestion);

    if (savedQuestion && isCallComplete) {
      if (savedQuestion.status === 200) {
        setSaveSuccessfully(true);
        setResourceAlreadyExists(false);
      } else if (savedQuestion.status === 409) {
        setSaveSuccessfully(false);
        setResourceAlreadyExists(true);
      }
    }
  }, [savedQuestion, isCallComplete]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setError: React.Dispatch<React.SetStateAction<boolean>>,
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const inputValue = event.target.value;
    const inputLength = inputValue.length;

    if (inputLength < 1 || inputLength > 255) {
      setError(true);
      setErrorMessage("The question must be between 1 and 255 characters");
    } else {
      setError(false);
      setErrorMessage("");
    }

    setQuestion({
      ...question!,
      textQuestion: inputValue,
    });
  };

  const backToSettings = () => {
    navigate("/settings_tutor");
  };

  return (
    <div>
      <div>
        <h3 className="titleModal"> Create Question </h3>
        <div>
          <form>
            <div>
              <label htmlFor="text" className="labelModal">
                Text
              </label>
              <input
                type="string"
                placeholder="Text"
                name="text"
                className="form-control"
                value={question?.textQuestion}
                onChange={(e) =>
                  handleInputChange(e, setTextError, setTextErrorMessage)
                }
              ></input>
              {textErrorMessage && (
                <p className="text-muted">{textErrorMessage}</p>
              )}
            </div>

            <div>
              <label htmlFor="number" className="labelModal">
                Value of Question
              </label>
              <input
                type="number"
                name="value"
                min="1"
                max="100"
                className="form-control"
                value={question?.valueOfQuestion}
                onChange={(e) => {
                  setQuestion((prevQuestion) => ({
                    ...prevQuestion!,
                    valueOfQuestion: parseInt(e.target.value),
                  }));
                }}
              ></input>
            </div>

            {loading && <div>Saving in progress...</div>}

            {!loading && savedSuccessfully && (
              <div>
                <label className="labelModal">Question saved correctly!</label>
              </div>
            )}

            {!loading && !savedSuccessfully && resourceAlreadyExists && (
              <div>
                <label className="labelModal">The question already exists!</label>
              </div>
            )}




            <div className="containerButtonModal">
              <button
                type="button"
                className="buttonCheck"
                onClick={saveQuestion}
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateQuestion;
