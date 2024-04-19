import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuizService from "../../../services/QuizService";
import Quiz from "../../../models/QuizModel";

const CreateQuiz = () => {
    const [quiz, setQuiz] = useState<Quiz>();
    const [savedQuiz, setSavedQuiz] = useState<any>();
    const [savedSuccessfully, setSaveSuccessfully] = useState<boolean>();
    const [resourceAlreadyExists, setResourceAlreadyExists] = useState<boolean>();
    const [loading, setLoading] = useState(false);
    const [isCallComplete, setIsCallComplete] = useState(false);
    const [textError, setTextError] = useState(false);
    const [textErrorMessage, setTextErrorMessage] = useState("");

    const navigate = useNavigate();

    const saveQuiz = async () => {
        try {
            setLoading(true);
            const tempSavedQuiz = await QuizService.createQuiz(quiz!);
            setSavedQuiz(tempSavedQuiz);
            setIsCallComplete(true);
        } catch (error: any) {
            console.error("Errore durante il salvataggio del quiz:", error);
            setSavedQuiz(error.response);
            setIsCallComplete(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (savedQuiz && isCallComplete) {
            if (savedQuiz.status === 200) {
                setSaveSuccessfully(true);
                setResourceAlreadyExists(false);
            } else if (savedQuiz.status === 409) {
                setSaveSuccessfully(false);
                setResourceAlreadyExists(true);
            }
        }
    }, [savedQuiz, isCallComplete]);

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        setError: React.Dispatch<React.SetStateAction<boolean>>,
        setErrorMessage: React.Dispatch<React.SetStateAction<string>>
    ) => {
        const inputValue = event.target.value;
        const inputLength = inputValue.length;

        if (inputLength < 1 || inputLength > 255) {
            setError(true);
            setErrorMessage("The quiz must be between 1 and 255 characters");
        } else {
            setError(false);
            setErrorMessage("");
        }

        setQuiz({
            ...quiz!,
            title: inputValue,
        });
    };

    const backToSettings = () => {
        navigate("/settings_tutor");
    };

    return (
        <div>
            <h3 className="titleModal"> Create Quiz </h3>
            <form>
                <div>
                    <label htmlFor="title" className="labelModal">
                        Name
                    </label>
                    <input
                        type="text"
                        placeholder="Name of quiz"
                        name="title"
                        className="form-control"
                        value={quiz?.title || ""}
                        onChange={(e) => {
                            handleInputChange(e, setTextError, setTextErrorMessage)
                        }}
                    />
                    {textErrorMessage && (
                        <p className="text-muted">{textErrorMessage}</p>
                    )}
                </div>

                {loading &&
                    <div>
                        <label className="labelModal">Saving in progress...</label>
                    </div>}

                {!loading && savedSuccessfully && (
                    <div>
                        <label className="labelModal">Quiz saved correctly!</label>
                    </div>
                )}

                {!loading && !savedSuccessfully && resourceAlreadyExists && (
                    <div>
                        <label className="labelModal">The quiz already exists!</label>
                    </div>
                )}

                <div className="containerButtonModal">
                    <button disabled={loading || !quiz?.title} type="button" className="buttonCheck" onClick={saveQuiz}>
                        <span className="frontCheck"> <i className="bi bi-check2"></i> </span>
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

export default CreateQuiz;
