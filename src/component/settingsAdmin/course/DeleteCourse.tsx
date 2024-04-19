import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../../../services/CourseService";
import Course from "../../../models/CourseModel";
import "./UpdateCourse.css";

const DeleteCourse = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [course, setCourse] = useState<Course>();
  const [loading, setLoading] = useState(false);
  const [isCallComplete, setIsCallComplete] = useState(false);
  const [deletionMessage, setDeletionMessage] = useState<string>("");



  const navigate = useNavigate();

  const refreshList = () => {
    CourseService.getCourses().then((res) => {
      setCourses(res.data);
    });
  }

  useEffect(() => {
    refreshList();
  }, []);

  useEffect(() => {
    if (selectedCourseId !== null) {
      CourseService.getCourseById(selectedCourseId!).then((res) => {
        setCourse(res.data);
      });
    }
  }, [selectedCourseId]);


  const DeleteCourse = async () => {
    try {
      setLoading(true);
      const tempDeletedCourse = await CourseService.deleteCourse(selectedCourseId!);
      setIsCallComplete(true);
      setDeletionMessage("Course deleted successfully! ");
      refreshList();
    } catch (error: any) {
      console.error("Errore durante eliminazione corso:", error);
      setIsCallComplete(true);
      setDeletionMessage("Problems were encountered during deletion! ");
      refreshList();
    } finally {
      setLoading(false);
    }
  };

  const backToSettings = () => {
    navigate("/settings_admin");
  };

  return (
    <div>
      <div>
        <h3 className="titleModal">Delete Course</h3>
        <div>
          <form>
            <div className="form-group">
              <label className="labelModal">Course</label>
              <select
                name="course"
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => {
                  setSelectedCourseId(Number(e.target.value));
                }}
              >
                <option selected hidden disabled>Select the Course to Delete</option>
                {courses.map((course) => {
                  return (
                    <option key={course.id} value={course.id}>
                      {course.name}
                    </option>
                  );
                })}
              </select>
            </div>
            {course && (
              <>
                <div>
                  <label className="labelModal">Name</label>
                  <p>{course.name}</p>
                </div>
                <div>
                  <label className="labelModal">Description</label>
                  <p>{course.description}</p>
                </div>
                <div>
                  <label className="labelModal">Background Image</label>
                  <p>{course.backgroundImage}</p>
                </div>
                <div>
                  <label className="labelModal">Image Resource</label>
                  <p>{course.imageResource}</p>
                </div>

                {loading && <div>Delete in progress...</div>}

                {isCallComplete && (
                  <div>
                    <label className="labelModal">{deletionMessage}</label>
                  </div>
                )}

                <div className="containerButtonModal">
                  <button className="buttonCheck" onClick={DeleteCourse} type="button">
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
      </div>
    </div>
  );
};

export default DeleteCourse;
