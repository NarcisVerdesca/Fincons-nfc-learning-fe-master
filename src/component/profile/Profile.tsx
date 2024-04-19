import { useEffect, useState } from "react";
import LoginRegistrationService from "../../services/LoginRegistrationService";
import User from "../../models/UserModel";
import "./Profile.css";
import Ability from "../../models/AbilityModel";
import ButtonShowQuizForStudent from "../settingsStudent/buttonSettingsStudent/ButtonShowQuizForStudent";
import AbilityUserService from "../../services/AbilityUserService";

const Profile = () => {

  const [user, setUser] = useState<User>();
  const [abilities, setAbilities] = useState<Ability[]>([]);
  const [isStudent, setIsStudent] = useState(false);

  useEffect(() => {
    LoginRegistrationService.getUserDetails().then((res) => {
      setUser(res.data);
      setIsStudent(res.data?.roles[0].name === 'ROLE_STUDENT');
    });
  }, []);

  useEffect(() => {
    AbilityUserService.getAbilityUserOfOneUser().then((res) =>{
      setAbilities(res.data)
    })
  }, [])

  return (
    <div className={`componentPageProfile`}>
      <div>
        <h3 className={`titleHeaderProfile`}>User Details:</h3>
      </div>
      <div className={`containerUserProfile`}>
        <table className="table">
          <tbody>
            <tr>
              <th scope="row"></th>
              <td className={`detail`}>Name:</td>
              <td>{user?.firstName || 'N/A'}</td>
            </tr>
            <tr>
              <th scope="row"></th>
              <td className={`detail`}>Surname:</td>
              <td>{user?.lastName || 'N/A'}</td>
            </tr>
            <tr>
              <th scope="row"></th>
              <td className={`detail`}>Email:</td>
              <td>{user?.email || 'N/A'}</td>
            </tr>
            <tr>
              <th scope="row"></th>
              <td className={`detail`}>Birthdate:</td>
              <td>{user?.birthDate?.toString() || 'N/A'}</td>
            </tr>
            <tr>
              <th scope="row"></th>
              <td className={`detail`}>Ability:</td>
              <td>
                {abilities?.map((ability: any) => (
                  <div>{ability.ability.name != null || undefined ? ability.ability.name : 'N/A'}</div>
                ))}{" "}
              </td>
            </tr>
            {isStudent && (
              <tr>
                <th scope="row"></th>
                <td className={`detail`}>Performed quizzes:</td>
                <div>
                  <ButtonShowQuizForStudent />
                </div>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
