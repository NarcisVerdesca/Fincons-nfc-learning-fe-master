import Header from "../header/Header";
import updateImage from "../../assets/update_image.png";
import deleteImage from "../../assets/delet_img.png";
import createImage from "../../assets/add_image.png";
import associateImage from "../../assets/img_associate.png";
import viewResultsQuizImage from '../../assets/results.png'
import "./SettingsAdmin.css";
import ButtonCreateAbility from "./buttonSettings/ButtonCreateAbility";
import ButtonCreateCourse from "./buttonSettings/ButtonCreateCourse";
import ButtonCreateLesson from "./buttonSettings/ButtonCreateLesson";
import ButtonUpdateAbility from "./buttonSettings/ButtonUpdateAbility";
import ButtonUpdateCourse from "./buttonSettings/ButtonUpdateCourse";
import ButtonUpdateLesson from "./buttonSettings/ButtonUpdateLesson";
import ButtonRegisterTutor from "./buttonSettings/ButtonRegisterTutor";
import ButtonDeleteCourse from "./buttonSettings/ButtonDeleteCourse";
import ButtonDeleteLesson from "./buttonSettings/ButtonDeleteLesson";
import ButtonDeleteAbility from "./buttonSettings/ButtonDeleteAbility";
import ButtonAssociateCourseAbility from "./buttonSettings/ButtonAssociateCourseAbility";
import Footer from "../footer/Footer";
import ButtonCharts from "./buttonSettings/ButtonCharts";

const SettingsAdmin = () => {
  return (
    <>
      <Header />
      <div className={`containerSettingsAdmin`}>
        <div className={`sectionContainer`}>
          <div className={`cardOptions`}>
            <div className={`containerOptions`}>
              <div className={`cardFront`}>
                <p className={`textSettings`}>Create section</p>
                <div className={`containerImageSettings`}>
                  <img src={createImage} alt="Create" className={`imageSettings`} />
                </div>
              </div>
              <div className={`cardBack`}>
                <div className={`optionSettings`}>
                  <ButtonCreateCourse />
                  <ButtonCreateLesson />
                  <ButtonCreateAbility />
                  <ButtonRegisterTutor />
                </div>
              </div>
            </div>
          </div>
          <div className={`cardOptions`}>
            <div className={`containerOptions`}>
              <div className={`cardFront`}>
                <p className={`textSettings`}>Associate section</p>
                <div className={`containerImageSettings`}>
                  <img
                    src={associateImage}
                    alt="Associate"
                    className={`imageSettings`}
                  />
                </div>
              </div>
              <div className={`cardBack`}>
                <div className={`optionSettings`}>
                  <ButtonAssociateCourseAbility />
                </div>
              </div>
            </div>
          </div>
          <div className={`cardOptions`}>
            <div className={`containerOptions`}>
              <div className={`cardFront`}>
                <p className={`textSettings`}>Update section</p>
                <div className={`containerImageSettings`}>
                  <img src={updateImage} alt="Update" className={`imageSettings`} />
                </div>
              </div>
              <div className={`cardBack`}>
                <div className={`optionSettings`}>
                  <ButtonUpdateCourse />
                  <ButtonUpdateLesson />
                  <ButtonUpdateAbility />
                </div>
              </div>
            </div>
          </div>
          <div className={`cardOptions`}>
            <div className={`containerOptions`}>
              <div className={`cardFront`}>
                <p className={`textSettings`}>Delete section</p>
                <div className={`containerImageSettings`}>
                  <img src={deleteImage} alt="Delete" className={`imageSettings`} />
                </div>
              </div>
              <div className={`cardBack`}>
                <div className={`optionSettings`}>
                  <ButtonDeleteCourse />
                  <ButtonDeleteLesson />
                  <ButtonDeleteAbility />
                </div>
              </div>
            </div>
          </div>
          <div className={`cardOptions`}>
            <div className={`containerOptions`}>
              <div className={`cardFront`}>
                <p className={`textSettings`}>View section</p>
                <img src={viewResultsQuizImage} alt="Delete" className={`imageSettings`} />
              </div>
              <div className={`cardBack`}>
                <div className={`optionSettings`}>
                  <ButtonCharts />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SettingsAdmin;
