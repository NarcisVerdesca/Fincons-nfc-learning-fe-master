import { useEffect, useState } from "react";
import CourseModel from "../../models/CourseModel";
import { useNavigate, useParams } from "react-router-dom";
import CourseService from "../../services/CourseService";
import "./PageCoursePresentation.css";
import Header from "../header/Header";
import LessonModel from "../../models/LessonModel";
import Footer from "../footer/Footer";


const PageCoursePresentation = () => {
  const [course, setCourse] = useState<CourseModel>();
  const [lessonList, setLessonList] = useState<LessonModel[]>([]);
  const navigate = useNavigate();
  const { idCourse } = useParams();
  const idCourse_page = parseInt(idCourse!);

  useEffect(() => {
    CourseService.getCourseById(idCourse_page).then((res) => {
      setCourse(res.data);
      setLessonList(res.data.lessons);
    });
  }, [idCourse]);

  const goBack = () => {
    navigate(-1);
  };

  const formattedDateLastModified = course?.lastModified ? new Date(course?.lastModified).toLocaleString('it-IT', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }) : '/';
  const formattedDateCreate = course?.createDate ? new Date(course?.createDate).toLocaleString('it-IT', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }) : '/';

  return (
    <>
      <Header />
      <div className={`containerPageCoursePresentation`}>
        <div className={`containerButtonBack`}>
          <button className={`buttonBack`} onClick={goBack}>
            <i className="bi bi-arrow-left"></i>
          </button>
        </div>
        <div className={`containerContextCoursePresentation`}>
          <div className={`imageCardCoursePresentation`}>
            <img
              src={course?.backgroundImage}
              alt=""
              className={`imageStyleCoursePresentation`}
            />
            <label className={`labelInfo`}>Created by: {course?.createdBy}</label>
            <label className={`labelInfo`}>Created on: {formattedDateCreate}</label>
            
            {course?.lastModified===null ? (
              <label className={`labelInfo`}>Modified by: {course?.createdBy}</label>
            ):(
              <label className={`labelInfo`}>Modified by: {course?.lastModifiedBy}</label>
            )}

           {course?.lastModifiedBy===null ? (
               <label className={`labelInfo`}>Modified on: {formattedDateCreate}</label>
            ):(
              <label className={`labelInfo`}>Modified on: {formattedDateLastModified}</label>
            )}


           
           
          </div>
          <div className={`containerTextCoursePresentation`}>
            <h1 className={`coursTitle`}>{course?.name}</h1>
            <p className={`textCoursePresentation`}>{course?.description}</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PageCoursePresentation;
