import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuizService from "../../../services/QuizService";
import Quiz from "../../../models/QuizModel";

const UpdateQuiz = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [selectedQuizId, setSelectedQuizId] = useState<number | null>(null);
  const [quiz, setQuiz] = useState<Quiz>();
  const [titleError, setTitleError] = useState(false);
  const [titleErrorMessage, setTitleErrorMessage] = useState("");
  const [updatedQuiz, setUpdatedQuiz] = useState<any>();
  const [updatedSuccessfully, setUpdatedSuccessfully] = useState<boolean>();
  const [resourceAlreadyExists, setResourceAlreadyExists] = useState<boolean>();
  const [loading, setLoading] = useState(false);
  const [isCallComplete, setIsCallComplete] = useState(false);







  const navigate = useNavigate();

  const refreshList = () =>{
         QuizService.getQuizzes().then((res)=> {
          setQuizzes(res.data.data);
         })
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
  

  const updateQuiz = async () => {
    if (titleError) {
      return;
    }

    try {
      setLoading(true);
      const tempUpdatedQuiz = await QuizService.updateQuiz(selectedQuizId!, quiz!);
      setUpdatedQuiz(tempUpdatedQuiz);
      console.log("UpdatedQuiz: " + tempUpdatedQuiz)
      setIsCallComplete(true);
      refreshList();
    } catch (error: any) {
      console.error("Errore durante l'aggiornamento del quiz:", error);
      setUpdatedQuiz(error.response);
      setIsCallComplete(true);
      refreshList();
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    console.log("Use effect saved quiz:" + updatedQuiz);

    if (updatedQuiz && isCallComplete) {
      if (updatedQuiz.status === 200) {
        setUpdatedSuccessfully(true);
        setResourceAlreadyExists(false);
      } else if (updatedQuiz.status === 409) {
        setUpdatedSuccessfully(false);
        setResourceAlreadyExists(true);
      }
    }
  }, [updatedQuiz, isCallComplete]);

  const backToSettings = () => {
    navigate("/settings_tutor");
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setError: React.Dispatch<React.SetStateAction<boolean>>,
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const inputValue = event.target.value;
    const inputLength = inputValue.length;

    if (inputLength < 1 || inputLength > 255) {
      setError(true);
      setErrorMessage("Title must be between 1 and 255 characters");
    } else {
      setError(false);
      setErrorMessage("");
    }

    console.log(inputValue);

    setQuiz({
      ...quiz!,
      title: inputValue,
    });
  };

  return (
    <div>
      <h3 className="titleModal">Rename Quiz</h3>
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
            <option selected disabled hidden>Select the Quiz to rename</option>
            {quizzes.map((quiz) => {
              return (
                <option key={quiz.id} value={quiz.id}>
                  {quiz.title}
                </option>
              );
            })}
          </select>
        </div>
        {quiz && (
          <>
            <div>
              <label className="labelModal">Title</label>
              <input
                type="text"
                name="title"
                className={`form-control ${titleError ? "border-red-500" : ""}`}
                value={quiz?.title}
                onChange={(e) =>
                  handleInputChange(e, setTitleError, setTitleErrorMessage)
                }
              ></input>
              {titleErrorMessage && (
                <p className="text-muted">{titleErrorMessage}</p>
              )}
            </div>

            {loading && <div>Saving in progress...</div>}

            {!loading && updatedSuccessfully && (
              <div>
                <label className="labelModal">Quiz updated correctly!</label>
              </div>
            )}

            {!loading && !updatedSuccessfully && resourceAlreadyExists && (
              <div>
                <label className="labelModal">The quiz already exists!</label>
              </div>
            )}



            <div className="containerButtonModal">
              <button className="buttonCheck" onClick={updateQuiz} disabled={titleError} type="button"  >
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
export default UpdateQuiz;
