import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AbilityService from "../../../services/AbilityService";
import Ability from "../../../models/AbilityModel";
import User from "../../../models/UserModel";
import LoginRegistrationService from "../../../services/LoginRegistrationService";
import AbilityUserService from "../../../services/AbilityUserService";

const AssociationAbilityUser = () => {
  const [user, setUser] = useState<User>();
  const [ability, setAbility] = useState<any>();
  const [abilityId, setAbilityId] = useState<any>();
  const navigate = useNavigate();

  useEffect(() => {
    LoginRegistrationService.getUserDetails().then((res) => {
      setUser(res.data);
    });
  }, []);

  useEffect(() => {
    AbilityService.getAbilities().then((res) => {
      setAbility(res.data);
    });
  }, []);

  const saveCourseLesson = () => {
    AbilityUserService.createAbilityUser(abilityId.ability);
    navigate("/settings_tutor");
  };

  const backToSettingsCourseLesson = () => {
    navigate("/settings_tutor");
  };

  return (
    <div>
      <div>
        <h3 className="titleModal"> Associate User with Ability </h3>
        <div>
          <form>
            <div className="form-group">
              <label className="labelModal">User:</label>{" "}
              <div>
                <text>
                  {user?.firstName} {user?.lastName}
                </text>
              </div>
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
                <option selected  hidden disabled>Select the Ability</option>
                {ability?.map((ability: Ability, index: any) => {
                  return (
                    <option key={index} value={ability.id}>
                      {ability.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="containerButtonModal">
              <button className="buttonCheck" onClick={saveCourseLesson}>
                <span className="frontCheck">
                  <i className="bi bi-check2"></i>
                </span>
              </button>
              <button
                className="buttonReturn"
                type= "button"
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

export default AssociationAbilityUser;
