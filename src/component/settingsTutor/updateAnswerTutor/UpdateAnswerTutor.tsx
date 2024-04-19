import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Answer from "../../../models/AnswerModel";
import AnswerService from "../../../services/AnswerService";

const UpdateAnswerTutor = () => {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedAnswerId, setSelectedAnswerId] = useState<number | null>(null);
  const [answer, setAnswer] = useState<Answer>();
  const [textError, setTextError] = useState(false);
  const [textErrorMessage, setTextErrorMessage] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [updatedAnswer, setUpdatedAnswer] = useState<any>();
  const [updatedSuccessfully, setUpdatedSuccessfully] = useState<boolean>();
  const [resourceAlreadyExists, setResourceAlreadyExists] = useState<boolean>();
  const [loading, setLoading] = useState(false);
  const [isCallComplete, setIsCallComplete] = useState(false);


  const navigate = useNavigate();

  const refreshList = () => {
    AnswerService.getAnswers().then((res) => {
      setAnswers(res.data.data);
    })
  };

  useEffect(() => {
   refreshList();
  }, []);

  useEffect(() => {
    if (selectedAnswerId !== null) {
      AnswerService.getAnswerById(selectedAnswerId).then((res) => {
        setAnswer(res.data.data);
      });
    }
  }, [selectedAnswerId]);

  const updateAnswer = async () => {
    if (textError) {
      return;
    }

    try {
      setLoading(true);
      const tempUpdatedAnswer = await AnswerService.updateAnswer(selectedAnswerId!, answer!);
      setUpdatedAnswer(tempUpdatedAnswer);
      console.log("Updated Answer: " + tempUpdatedAnswer)
      setIsCallComplete(true);
      refreshList();
    } catch (error: any) {
      console.error("Errore durante l'aggiornamento dell'answer:", error);
      setUpdatedAnswer(error.response);
      setIsCallComplete(true);
      refreshList();
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    console.log("Use effect saved answer:" + updatedAnswer);

    if (updatedAnswer && isCallComplete) {
      if (updatedAnswer.status === 200) {
        setUpdatedSuccessfully(true);
        setResourceAlreadyExists(false);
      } else if (updatedAnswer.status === 409) {
        setUpdatedSuccessfully(false);
        setResourceAlreadyExists(true);
      }
    }
  }, [updatedAnswer, isCallComplete]);

  const backToSettings = () => {
    navigate("/settings_tutor");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, setError: React.Dispatch<React.SetStateAction<boolean>>,setErrorMessage: React.Dispatch<React.SetStateAction<string>>) => {
    const inputValue = event.target.value;
    const inputLength = inputValue.length;

    if (inputLength < 1 || inputLength > 255) {
      setError(true);
      setErrorMessage("Text of answer must be between 1 and 255 characters");
    } else {
      setError(false);
      setErrorMessage("");
    }

    setAnswer({
      ...answer!,
      text: inputValue,
    });
  };

  return (
    <div>
      <h3 className="titleModal">Update Answer</h3>
      <form>
        <div className="form-group">
          <label className="labelModal">Answer</label>
          <select
            name="answer"
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => {
              setSelectedAnswerId(Number(e.target.value));
            }}
          >
            <option selected disabled hidden>Select the Answer to update</option>
            {answers.map((answer) => {
              return (
                <option key={answer.id} value={answer.id}>
                  {answer.text}
                </option>
              );
            })}
          </select>
        </div>
        {answer && (
          <>
            <div>
              <label className="labelModal">Text of answer</label>
              <input
                type="text"
                placeholder={answer.text}
                name="text"
                className={`form-control ${textError ? "border-red-500" : ""}`}
                value={answer.text}
                onChange={(e) =>
                  handleInputChange(e, setTextError, setTextErrorMessage)
                }
              ></input>
              {textErrorMessage && (
                <p className="text-muted">{textErrorMessage}</p>
              )}
            </div>

            <div>
              <input
                type="checkbox"
                name="isCorrect"
                checked={answer && answer.correct}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  setAnswer((prevAnswer) => ({
                    ...prevAnswer!,
                    correct: isChecked,
                  }));
                }}
              />{" "}
              <label htmlFor="isCorrect">Is Correct</label>
            </div>

            {loading && <div>Saving in progress...</div>}

            {!loading && updatedSuccessfully && (
              <div>
                <label className="labelModal">Answer updated correctly!</label>
              </div>
            )}

            {!loading && !updatedSuccessfully && resourceAlreadyExists && (
              <div>
                <label className="labelModal">The answer already exists!</label>
              </div>
            )}


            <div className="containerButtonModal">
              <button  className="buttonCheck"  onClick={updateAnswer}  disabled={textError} type="button" >
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
  );
};
export default UpdateAnswerTutor;
