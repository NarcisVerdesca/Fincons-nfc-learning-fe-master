import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Lesson from "../../../models/LessonModel";
import LessonService from "../../../services/LessonService";
import "./CreateLesson.css";

const CreateLesson = () => {
  const [lesson, setLesson] = useState<Lesson>();
  const [titleError, setTitleError] = useState(false);
  const [titleErrorMessage, setTitleErrorMessage] = useState("");
  const [createDisabled, setCreateDisabled] = useState(true);
  const [savedSuccessfully, setSaveSuccessfully] = useState<boolean>();
  const [resourceAlreadyExists, setResourceAlreadyExists] = useState<boolean>();
  const [loading, setLoading] = useState(false);
  const [isCallComplete, setIsCallComplete] = useState(false);
  const [savedLesson, setSavedLesson] = useState<any>();
  const navigate = useNavigate();

  const saveLesson = async () => {
    if (titleError) {
      return;
    }

    try {
      setLoading(true);
      const tempSavedLesson = await LessonService.createLesson(lesson!);
      setSavedLesson(tempSavedLesson);
      setIsCallComplete(true);
    } catch (error: any) {
      console.error("Errore durante il salvataggio del quiz:", error);
      setSavedLesson(error.response);
      setIsCallComplete(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (savedLesson && isCallComplete) {
      if (savedLesson.status === 200) {
        setSaveSuccessfully(true);
        setResourceAlreadyExists(false);
      } else if (savedLesson.status === 409) {
        setSaveSuccessfully(false);
        setResourceAlreadyExists(true);
      }
    }
  }, [savedLesson, isCallComplete]);


  const backToSettings = () => {
    navigate("/settings_admin");
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setError: React.Dispatch<React.SetStateAction<boolean>>,
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const { name, value } = event.target;
    const inputValue = value;
    const inputLength = inputValue.length;

    if (name === "title" && (inputLength < 1 || inputLength > 255)) {
      setError(true);
      setErrorMessage("Title must be between 1 and 255 characters");
    } else {
      setError(false);
      setErrorMessage("");
    }

    setLesson({
      ...lesson!,
      [name]: inputValue,
    });

    setCreateDisabled(inputLength === 0 || titleError);
  };

  return (
    <div>
      <div>
        <h3 className="titleModal"> Create Lesson </h3>
        <div>
          <form>
            <div>
              <label className="labelModal">Title</label>
              <input
                type="string"
                placeholder="Title"
                name="title"
                className={`form-control ${titleError ? "border-red-500" : ""}`}
                value={lesson?.title}
                onChange={(e) =>
                  handleInputChange(e, setTitleError, setTitleErrorMessage)
                }
              ></input>
              {titleErrorMessage && (
                <p className="text-muted">{titleErrorMessage}</p>
              )}
            </div>
            <div>
              <label className="labelModal">Background Image</label>
              <input
                type="string"
                placeholder="Background Image"
                name="backgroundImage"
                className="form-control"
                value={lesson?.backgroundImage}
                onChange={(e) => {
                  setLesson({
                    ...lesson!,
                    [e.target.name]: e.target.value,
                  });
                }}
              ></input>
            </div>

            {loading &&
              <div>
                <label className="labelModal">Saving in progress...</label>
              </div>}

            {!loading && savedSuccessfully && (
              <div>
                <label className="labelModal">Lesson saved correctly!</label>
              </div>
            )}

            {!loading && !savedSuccessfully && resourceAlreadyExists && (
              <div>
                <label className="labelModal">The lesson already exists!</label>
              </div>
            )}



            <div className="containerButtonModal">
              <button
                className="buttonCheck"
                disabled={createDisabled}
                onClick={saveLesson}
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateLesson;
