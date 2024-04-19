import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Quiz from "../../../models/QuizModel";
import Lesson from "../../../models/LessonModel";
import QuizService from "../../../services/QuizService";
import LessonService from "../../../services/LessonService";
import QuizLessonModel from "../../../models/QuizLessonModel";

const CreateAssociationQuizLesson = () => {
  const [quizLesson, setQuizLesson] = useState<QuizLessonModel | any>();
  const [quizId, setQuizId] = useState<number | any>();
  const [lessonId, setLessonId] = useState<number | any>();
  const [lesson, setLesson] = useState<QuizLessonModel | any>();
  const [quiz, setQuiz] = useState<any>();
  const [association, setAssociation] = useState<any>();
  const [associatedSuccessfully, setAssociatedSuccessfully] = useState<boolean | null>(null);
  const [resourceAlreadyExists, setResourceAlreadyExists] = useState<boolean>();
  const [loading, setLoading] = useState<boolean | null>(null);
  const [isCallComplete, setIsCallComplete] = useState(false);



  const navigate = useNavigate();


  const refreshList = () => {
    QuizService.getQuizzesWithoutAssociationWithLesson().then((res1) => {
      setQuiz(res1.data.data);
    });

    LessonService.getNotAssociatedLessonsWithQuiz().then((res2) => {
      setLesson(res2.data.data);
    });

  };

  useEffect(() => {
    refreshList();
  }, []);


  const saveQuizLesson = async () => {
    try {
      setLoading(true);
      const tempAssociation = await QuizService.associateQuizToLesson(quizId, lessonId);
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



  const backToSettings = () => {
    navigate("/settings_tutor");
  };

  return (
    <div>
      <h3 className="titleModal"> Associate Quiz with Lesson </h3>
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
          <label className="labelModal">Lesson</label>
          <select
            name="lesson"
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => {
              setLessonId(parseInt(e.target.value));
            }}
          >
            <option selected hidden disabled>Select the Lesson</option>
            {lesson?.map((lesson: Lesson, index: any) => {
              return (
                <option key={index} value={lesson?.id}>
                  {lesson?.title}
                </option>
              );
            })}
          </select>
        </div>


        {loading && <div>Saving in progress...</div>}

        {!loading && associatedSuccessfully && isCallComplete && (
          <div>
            <label className="labelModal">The quiz was successfully associated with the lesson.</label>
          </div>
        )}

        {!loading && !associatedSuccessfully && isCallComplete && (
          <div>
            <label className="labelModal">Problems were encountered during the association!</label>
          </div>
        )}


        <div className="containerButtonModal">
          <button className="buttonCheck" onClick={saveQuizLesson} type="button" disabled={loading==true}>
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

export default CreateAssociationQuizLesson;
