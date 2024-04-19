import { useEffect, useState } from "react";
import CourseModel from "../../models/CourseModel";
import { useNavigate, useParams } from "react-router-dom";
import CourseService from "../../services/CourseService";
import "./PageCourse.css";
import Header from "../header/Header";
import LessonModel from "../../models/LessonModel";
import Footer from "../footer/Footer";
interface Props {
  courseId: number;
  setCourseId: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const PageCourse = (props: Props) => {
  const [course, setCourse] = useState<CourseModel>();
  const [lessonList, setLessonList] = useState<LessonModel[]>([]);
  const navigate = useNavigate();
  const { idCourse } = useParams();
  const idCourse_page = parseInt(idCourse!);

  useEffect(() => {
    CourseService.getCourseById(idCourse_page!).then((res) => {
      setCourse(res.data);
      props.setCourseId(idCourse_page);
      setLessonList(res.data.courseLessons);
    });
  }, [idCourse_page]);

  const gotToPage = (idPage: any) => {
    navigate("/lesson_page/" + idPage);

  };
  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Header />
      <div className={`containerPageCourse`}>
        <div className={`containerButtonBack`}>
          <button className={`buttonBack`} onClick={goBack}>
            <i className="bi bi-arrow-left"></i>
          </button>
        </div>
        <div className={`containerContextCourse`}>
          <div className={`imageCardCourse`}>
            <img
              src={course?.backgroundImage}
              alt=""
              className={`imageStyleCourse`}
            />
          </div>
          <div className={`containerTextCourse`}>
            <h1 className={`coursTitle`}>{course?.name}</h1>
            <p className={`textCourse`}>{course?.description}</p>
          </div>
        </div>
        <div className={`containerTitleResources`}>
          <div className={`titleResources`}>
            <h1>Lessons</h1>
          </div>
        </div>
        <div className={`containerResources`}>
          {lessonList?.map((lessons: any) => (
            <div className={`cardLessonPageCorse`}>
              <button
                className={`buttonLessonCourse`}
                onClick={
                  () => 
                  gotToPage(lessons.lesson.id)
                }
                
              >
                {lessons.lesson.title}
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};
export default PageCourse;
