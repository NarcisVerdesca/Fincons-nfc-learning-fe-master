import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseLessonService from "../../../services/CourseLessonService";
import Course from "../../../models/CourseModel";
import Lesson from "../../../models/LessonModel";
import CourseService from "../../../services/CourseService";
import LessonService from "../../../services/LessonService";
import CourseLessonModel from "../../../models/CourseLessonModel";

const CreateAssociationCourseLesson = () => {
  const [courseLesson, setCourseLesson] = useState<CourseLessonModel | any>();
  const [courseId, setCourseId] = useState<CourseLessonModel | any>();
  const [course, setCourse] = useState<any>();
  const [lesson, setLesson] = useState<any>();
  const [association, setAssociation] = useState<any>();
  const [associatedSuccessfully, setAssociatedSuccessfully] = useState<boolean| null>(null);
  const [resourceAlreadyExists, setResourceAlreadyExists] = useState<boolean>();
  const [loading, setLoading] = useState<boolean | null >(null);
  const [isCallComplete, setIsCallComplete] = useState(false);

  const navigate = useNavigate();

  const refreshList = () => {
    CourseService.getCourses().then((res1) => {
      setCourse(res1.data);
    });

    LessonService.getNotAssociatedLessonsWithCourse().then((res2) => {
      setLesson(res2.data);
    });

  }

  useEffect(() => {
    refreshList();
  }, []);

  const saveCourseLesson = async () => {
    console.log(courseId);
    console.log(courseLesson);

    try {
      setLoading(true);
      const tempAssociation = await CourseLessonService.createCourseLesson(courseId.course, courseLesson.lesson);
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
        <h3 className="titleModal"> Associate Course with Lesson </h3>
        <div>
          <form>
            <div className="form-group">
              <label className="labelModal">Course</label>
              <select
                name="course"
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => {
                  console.log(e.target.value);
                  setCourseId({
                    [e.target.name]: e.target.value,
                  });
                }}
              >
                <option selected hidden disabled>Select the Course</option>
                {course?.map((courses: Course, index: any) => {
                  return (
                    <option key={index} value={courses.id}>
                      {courses?.name}
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
                  console.log(e.target.value);
                  setCourseLesson({
                    [e.target.name]: e.target.value,
                  });
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
                <label className="labelModal">The course was successfully associated with the lesson.</label>
              </div>
            )}

            {!loading && !associatedSuccessfully && isCallComplete && (
              <div>
                <label className="labelModal">Problems were encountered during the association!</label>
              </div>
            )}



            <div className="containerButtonModal">
              <button className="buttonCheck" onClick={saveCourseLesson} type="button" disabled= {loading==true}>
                <span className="frontCheck">
                  <i className="bi bi-check2"></i>
                </span>
              </button>
              <button
                className="buttonReturn"
                onClick={backToSettings}
              >
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

export default CreateAssociationCourseLesson;
