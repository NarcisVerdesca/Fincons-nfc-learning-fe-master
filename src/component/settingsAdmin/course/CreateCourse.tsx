import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../../../services/CourseService";
import Course from "../../../models/CourseModel";
import "./CreateCourse.css";
import { template } from "@babel/core";

const CreateCourse = () => {
  const [course, setCourse] = useState<Course>({} as Course);
  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [backgroundImageErrorMessage, setBackgroundImageErrorMessage] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);
  const [backgroundImageError, setBackgroundImageError] = useState(false);
  const [descriptionErrorMessage, setDescriptionErrorMessage] = useState("");
  const [createDisabled, setCreateDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [savedSuccessfully, setSaveSuccessfully] = useState<boolean>();
  const [resourceAlreadyExists, setResourceAlreadyExists] = useState<boolean>();
  const [loading, setLoading] = useState(false);
  const [isCallComplete, setIsCallComplete] = useState(false);
  const [savedCourse, setSavedCourse] = useState<any>();







  const navigate = useNavigate();

  const saveCourse = async () => {
    try {
      setLoading(true);
      if (!course.name || !course.description || !course.backgroundImage) {
        setErrorMessage("Name, Description, and Background Image fields are required.");
        return;
      } else if (course.name && course.description && course.backgroundImage) {
        const tempSavedCourse = await CourseService.createCourse(course);
        setSavedCourse(tempSavedCourse);
      }
      setIsCallComplete(true);
    } catch (error: any) {
      console.error("Errore durante il salvataggio del quiz:", error);
      setSavedCourse(error.response);
      setIsCallComplete(true);
    } finally {
      setLoading(false);
    }

      




  };

  useEffect(() => {
    if (savedCourse && isCallComplete) {
      if (savedCourse.status === 200) {
        setSaveSuccessfully(true);
        setResourceAlreadyExists(false);
      } else if (savedCourse.status === 409) {
        setSaveSuccessfully(false);
        setResourceAlreadyExists(true);
      }
    }
  }, [savedCourse, isCallComplete]);


  const backToSettings = () => {
    navigate("/settings_admin");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const inputValue = value;
    const inputLength = inputValue.length;

    if (name === "name" && (inputLength < 1 || inputLength > 255)) {
      setNameError(true);
      setNameErrorMessage("Name must be between 1 and 255 characters");
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }

    setCourse({ ...course, [name]: inputValue });
    setCreateDisabled(
      nameError || descriptionError || backgroundImageError || inputLength === 0
    );
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const inputValue = value.trim();
    const inputLength = inputValue.length;

    if (name === "description" && (inputLength < 1 || inputLength > 5000)) {
      setDescriptionError(true);
      setDescriptionErrorMessage(
        "Description must be between 1 and 5000 characters"
      );
    } else {
      setDescriptionError(false);
      setDescriptionErrorMessage("");
    }

    setCourse({ ...course, [name]: inputValue });
    setCreateDisabled(
      nameError || descriptionError || backgroundImageError || inputLength === 0
    );
  };

  const handleBackgroundImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const inputValue = value.trim();
    const inputLength = inputValue.length;

    if (name === "backgroundImage" && (inputLength < 1 || inputLength > 5000)) {
      setBackgroundImageError(true);
      setBackgroundImageErrorMessage(
        "backgroundImage must be between 1 and 5000 characters"
      );
    } else {
      setBackgroundImageError(false);
      setBackgroundImageErrorMessage("");
    }

    setCourse({ ...course, [name]: inputValue });
    setCreateDisabled(
      nameError || descriptionError || backgroundImageError || inputLength === 0
    );
  };

  return (
    <div>
      <h3 className="titleModal">Create Course</h3>
      <div className="mb-3">
        <form>
          <div className="form-group">
            <label htmlFor="name" className="labelModal">
              Name
            </label>
            <input
              type="string"
              placeholder="Name"
              name="name"
              className={`form-control ${nameError ? "border-red-500" : ""}`}
              value={course?.name || ""}
              onChange={(e) => handleNameChange(e)}
            />
            {nameErrorMessage && (
              <p className="text-muted">{nameErrorMessage}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="description" className="labelModal">
              Description
            </label>
            <input
              type="string"
              placeholder="Description"
              name="description"
              className={`form-control ${descriptionError ? "border-red-500" : ""
                }`}
              value={course?.description || ""}
              onChange={(e) => handleDescriptionChange(e)}
            />
            {descriptionErrorMessage && (
              <p className="text-muted">{descriptionErrorMessage}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="backgroundImage" className="labelModal">
              Background Image
            </label>
            <input
              type="string"
              placeholder="Background Image"
              name="backgroundImage"
              className={`form-control ${backgroundImageError ? "border-red-500" : ""
                }`}
              value={course?.backgroundImage || ""}
              onChange={(e) => handleBackgroundImageChange(e)}
            ></input>
            {backgroundImageErrorMessage && (
              <p className="text-muted">{backgroundImageErrorMessage}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="imageResource" className="labelModal">
              Image Resource
            </label>
            <input
              type="string"
              placeholder="Image Resource"
              name="imageResource"
              className="form-control"
              value={course?.imageResource || ""}
              onChange={(e) => {
                setCourse({
                  ...course!,
                  [e.target.name]: e.target.value,
                });
              }}
            ></input>
          </div>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}


          {loading &&
            <div>
              <label className="labelModal">Saving in progress...</label>
            </div>}

          {!loading && savedSuccessfully && (
            <div>
              <label className="labelModal">Course saved correctly!</label>
            </div>
          )}

          {!loading && !savedSuccessfully && resourceAlreadyExists && (
            <div>
              <label className="labelModal">The course already exists!</label>
            </div>
          )}





          <div className="containerButtonModal">
            <button
              type="button"
              className="buttonCheck"
              disabled={createDisabled}
              onClick={saveCourse}
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
  );
};

export default CreateCourse;
