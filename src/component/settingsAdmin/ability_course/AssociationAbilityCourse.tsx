import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Course from "../../../models/CourseModel";
import CourseService from "../../../services/CourseService";
import AbilityService from "../../../services/AbilityService";
import AbilityCourseService from "../../../services/AbilityCourseService";
import Ability from "../../../models/AbilityModel";

const CreateAssociationCourseLesson = () => {
  const [course, setCourse] = useState<any>();
  const [ability, setAbility] = useState<any>();
  const [courseId, setCourseId] = useState<any>();
  const [abilityId, setAbilityId] = useState<any>();
  const [savedSuccessfully, setSaveSuccessfully] = useState<boolean>();
  const [resourceAlreadyExists, setResourceAlreadyExists] = useState<boolean>();
  const [loading, setLoading] = useState(false);
  const [isCallComplete, setIsCallComplete] = useState(false);
  const [savedAssociation, setSavedAssociation] = useState<any>();
  
  const navigate = useNavigate();

  const refreshList = () =>{
    CourseService.getCourses().then((res) => {
      setCourse(res.data);
    });

    AbilityService.getAbilities().then((res) => {
      setAbility(res.data);
    });
  }

  useEffect(() => {
     refreshList();
  }, []);


  const saveCourseLesson = async () => {
    try {
      setLoading(true);
      const tempSavedAssociation = await  AbilityCourseService.createAbilityCourse(abilityId.ability,courseId.course);
      setSavedAssociation(tempSavedAssociation);
      setIsCallComplete(true);
    } catch (error: any) {
      console.error("Errore durante il salvataggio del quiz:", error);
      setSavedAssociation(error.response);
      setIsCallComplete(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (savedAssociation && isCallComplete) {
      if (savedAssociation.status === 200) {
        setSaveSuccessfully(true);
        setResourceAlreadyExists(false);
      } else if (savedAssociation.status === 409) {
        setSaveSuccessfully(false);
        setResourceAlreadyExists(true);
      }
    }
  }, [savedAssociation, isCallComplete]);

  const backToSettingsCourseLesson = () => {
    navigate("/settings_admin");
  };

  return (
    <div>
      <div>
        <h3 className="titleModal"> Associate Course with Ability </h3>
        <div>
          <form>
            <div className="form-group">
              <label className="labelModal">Course</label>
              <select
                name="course"
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => {
                  setCourseId({
                    [e.target.name]: e.target.value,
                  });
                }}
              >
                <option selected hidden disabled>Select the Course</option>
                {course?.map((courses: Course, index: any) => {
                  return (
                    <option key={index} value={courses.id}>
                      {courses.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group">
              <label className="labelModal">Ability</label>
              <select
                name="ability"
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => {
                  setAbilityId({
                    [e.target.name]: e.target.value,
                  });
                }}
              >
                <option selected hidden disabled>Select the Ability</option>
                {ability?.map((ability: Ability, index: any) => {
                  return (
                    <option key={index} value={ability.id}>
                      {ability.name}
                    </option>
                  );
                })}
              </select>
            </div>
            
            {loading &&
              <div>
                <label className="labelModal">Saving in progress...</label>
              </div>}

            {!loading && savedSuccessfully && (
              <div>
                <label className="labelModal">Association successfully!</label>
              </div>
            )}

            {!loading && !savedSuccessfully && resourceAlreadyExists && (
              <div>
                <label className="labelModal">The association already exists!</label>
              </div>
            )}



            <div className="containerButtonModal">
            <button className="buttonCheck" onClick={saveCourseLesson} type="button" disabled={loading}>
              <span className="frontCheck">
                <i className="bi bi-check2"></i>
              </span>
            </button>
            <button
              className="buttonReturn"
              onClick={backToSettingsCourseLesson}
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
