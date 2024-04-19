import Header from "../header/Header";
import associateAbilityImage from "../../assets/AssociateAbility.png";
import Footer from "../footer/Footer";
import AssociationAbilityUser from "./user_ability/AssociationUserAbility";

const SettingsTutor = () => {
    return (
        <>
            <Header />
            <div className={`containerSettingsTutor`}>
                <div className={`sectionContainer`}>
                    <div className={`cardOptions`}>
                        <div className={`containerOptions`}>
                            <div className={`cardFront`}>
                                <p className={`textSettings`}>Associate ability</p>
                                <div className={`containerImageSettings`}>
                                    <img src={associateAbilityImage} alt="Associate" className={`imageSettings`} />
                                </div>
                            </div>
                            <div className={`cardBack`}>
                                <div className={`optionSettings`}>
                                    <AssociationAbilityUser />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <Footer />
        </>
    );
};
export default SettingsTutor;
