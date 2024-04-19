import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Content from "../../../models/ContentModel";
import Lesson from "../../../models/LessonModel";
import ContentService from "../../../services/ContentService";
import LessonService from "../../../services/LessonService";

const CreateAssociationContentLesson = () => {
  const [contentId, setContentId] = useState<number | any>();
  const [lessonId, setLessonId] = useState<number | any>();
  const [contents, setContents] = useState<Content[]  | any[]>();
  const [lessons, setLessons] = useState<Lesson[] | any[]>();
  const [association, setAssociation] = useState<any>();
  const [associatedSuccessfully, setAssociatedSuccessfully] = useState<boolean| null>(null);
  const [resourceAlreadyExists, setResourceAlreadyExists] = useState<boolean>();
  const [loading, setLoading] = useState<boolean | null >(null);
  const [isCallComplete, setIsCallComplete] = useState(false);

  const navigate = useNavigate();

  const refreshList = () => {
    ContentService.getContentsWithoutLessonAssociated().then((res1) => {
      setContents(res1.data.data);
    });

    LessonService.getNotAssociatedLessonsWithContent().then((res2) => {
      setLessons(res2.data.data);
    });
  }

  useEffect(() => {
    refreshList();
  }, []);

  const saveAssociation = async () => {

    try {
      setLoading(true);
      const tempAssociation = await LessonService.associateLessonContent(lessonId, contentId);
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
      <div>
        <h3 className="titleModal"> Associate Content with Lesson </h3>
        <div>
          <form>
            <div className="form-group">
              <label className="labelModal">Content</label>
              <select
                name="content"
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => {
                  setContentId(parseInt(e.target.value));
                }}
              >
                <option selected hidden disabled>Select the Content</option>
                {contents?.map((content: Content, index: any) => {
                  return (
                    <option key={index} value={content.id}>
                      {content?.content}
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
                {lessons?.map((lesson: Lesson, index: any) => {
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
                <label className="labelModal">The content was successfully associated with the lesson.</label>
              </div>
            )}

            {!loading && !associatedSuccessfully && isCallComplete && (
              <div>
                <label className="labelModal">Problems were encountered during the association!</label>
              </div>
            )}


            <div className="containerButtonModal">
              <button className="buttonCheck" onClick={saveAssociation} type="button" disabled={loading== true}>
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

export default CreateAssociationContentLesson;
