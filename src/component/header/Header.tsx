import { useEffect, useState } from 'react';
import imgLogo from '../../assets/logoHeader.png';
import './Header.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import LoginRegistrationService from '../../services/LoginRegistrationService';
import ButtonProfile from '../profile/ButtonProfile';

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove("jwt-token");
        navigate("/authentication");
        window.location.reload(); // Reload the page to ensure that the old token is removed
    };

    const goToCourses = () => {
        navigate("/courses")
    }
    const goToHomePage = () => {
        navigate("/home")
    }
    const goToPageDedicatedCourses = () => {
        navigate("/page_dedicated_courses")
    }
    const goToSettingsTutor = () => {
        navigate("/settings_tutor")
    }
    const goToSettingsAdmin = () => {
        navigate("/settings_admin")
    }
    const goToSettingsStudent = () => {
        navigate("/settings_student")
    }

    const [adminNavBar, setAdminNavBar] = useState<boolean>(false);
    const [tutorNavBar, setTutorNavBar] = useState<boolean>(false);
    const [studentNavBar, setStudentNavBar] = useState<boolean>(false);

    useEffect(() => {
        LoginRegistrationService.getUserDetails().then((res) => {
            if (res.data.roles[0].name === "ROLE_ADMIN") {
                setAdminNavBar(true);
            } else if (res.data.roles[0].name === "ROLE_TUTOR") {
                setTutorNavBar(true);
            } else if (res.data.roles[0].name === "ROLE_STUDENT") {
                setStudentNavBar(true);
            }
        });

    });

    return (
        <div className={`bodyHeader`}>
            <div className={`firstComponentHeader`}>
                <div className={`containerImageHeader`}>
                    <img src={imgLogo} alt="logo" className={`imageHeader`}/>
                </div>
                <div className={`containerTitleHeader`}>
                    <h4 className={`titleHeader`}>NFC E-Learning web site</h4>
                </div>
                <div className={`navbarHeader`}>
                    <div className={`containerNavBarHeader`}>
                        <div className={`containerButtonNavBar`}>
                            <button className={`buttonNavBar`} onClick={goToHomePage}>
                                <p className={`nameButton`}>Home Page</p>
                            </button>
                        </div>
                        <div className={`containerButtonNavBar`}>
                            <button className={`buttonNavBar`} onClick={goToCourses}>
                                <p className={`nameButton`}>Courses</p>
                            </button>
                        </div>
                        <div className={`containerButtonNavBar`}>
                            <button className={`buttonNavBar`} onClick={goToPageDedicatedCourses}>
                                <p className={`nameButton`}>My courses</p>
                            </button>
                        </div>
                        {tutorNavBar && (
                            <div className={`containerButtonNavBar`}>
                                <button className={`buttonNavBar`} onClick={goToSettingsTutor}>
                                    <p className={`nameButton`}>Settings</p>
                                </button>
                            </div>
                        )}
                        {adminNavBar && (
                            <div className={`containerButtonNavBar`}>
                                <button className={`buttonNavBar`} onClick={goToSettingsAdmin}>
                                    <p className={`nameButton`}>Settings</p>
                                </button>
                            </div>
                        )}
                        {studentNavBar && (
                            <div className={`containerButtonNavBar`}>
                                <button className={`buttonNavBar`} onClick={goToSettingsStudent}>
                                    <p className={`nameButton`}>Settings</p>
                                </button>
                            </div>
                        )}
                        <div className={`containerButtonNavBar`}>
                            <button className={`buttonNavBar`} onClick={handleLogout}>
                                <p className={`nameButton`}>Logout</p>
                            </button>
                        </div>
                        <div className={`containerButtonNavBar`}>
                            <p className={`nameButton`}><ButtonProfile /></p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Header;