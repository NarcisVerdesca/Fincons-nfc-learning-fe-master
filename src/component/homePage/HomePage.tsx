import "./HomePage.css";
import Header from "../header/Header";
import Footer from "../footer/Footer";

const HomePage = () => {
  return (
    <>
      <Header />
      <div className={`bodyHomePage container`}>
        <div className={`containerLegend`}>
          <div className={`containerTitleLegend`}>
            <h2 className={`titleLegend`}>Welcome to our E-Learning web site</h2>
          </div>
          <div className={`containerButtonLegend`}>
            <a href="#whoWeAre">
              <button className={`buttonLegend`}>Who we are ?</button>
            </a>
            <a href="#whatIsIt">
              <button className={`buttonLegend`}>What is it ?</button>
            </a>
            <a href="#whatWeOffer">
              <button className={`buttonLegend`}>What we offer ?</button>
            </a>
          </div>
        </div>
        <div className={`containerSectionHome`} id="whoWeAre">
          <div className={`textSectionHome`}>
            <div className={`containerDescription`}>
              <p className={`descriptionSection`}>
                <p className={`titleSection`}>Who we are ?</p>
                <p>
                  The NFC Team has consistently championed innovative training methods to provide a comprehensive and effective learning experience. We are interns at Fincons Group, and our platform is structured into multiple levels to deliver useful and impactful content.{" "}
                  <br></br>
                  Innovation has moved and continues to move across all learning
                  areas with the aim of looking at possible technological
                  innovations including:
                </p>
                <h4 className={`descriptionTitleSection `}>
                  E-Learning platforms.
                </h4>
              </p>
            </div>
          </div>
          <div className={`containerImgWhoWeAre`}></div>
        </div>
        <div className={`containerSectionHome`} id="whatIsIt">
          <div className={`containerImgWhatIsIt`}></div>
          <div className={`textSectionHome`}>
            <p className={`descriptionSection`}>
              <p className={`titleSection`}>What is it ?</p>
              <div className={`containerDescriptionWhatIsIt`}>
                <h4 className={`descriptionTitleSection `}>
                  To explane it simply
                </h4>
                <p >
                  E-learning is rapidly expanding and, in many cases,
                  has replaced traditional training methods. However,
                  before delving into this world, it's crucial to ask a
                  fundamental question: what exactly is e-learning?
                  In essence, e-learning refers to distance learning. The term itself was coined in the late 1990s,
                  describing it as:
                </p>
                <h5 className={`descriptionTitleSection `}>
                  “the way network technology designs, distributes, selects,
                  administers and expands training”
                </h5>
                <br></br>
                <p>
                  Essentially, e-learning utilizes digital devices to enhance traditional learning systems.
                  Today, e-learning has evolved into various forms and dimensions, extending beyond the boundaries
                  of traditional training methods. Its effectiveness is widely recognized, and the potential for
                  continuously improving and accessible content is constantly expanding.
                </p>
              </div>
            </p>
          </div>
        </div>
        <div className={`containerSectionHome`} id="whatWeOffer">
          <div className={`textSectionHome`}>
              <p className={`descriptionSection`}>
                <p className={`titleSection`}>What we offer ?</p>
            <div className={`containerDescription`}>
              <h4 className={`descriptionTitleSection`}>
                A single platform to manage and monitor your training courses!
              </h4>
              <p >
                A user-friendly website. Designed for those without prior e-learning experience.
                Spend your time on what truly matters.<br></br> Our e-learning system offers the following key features:
                <br></br>- Accessibility via the Internet, enabling participation in distance courses; <br></br>-
                Learning paths comprised of textual and video-based multimedia content;<br></br>-
                Quizzes to assess learning progress.
              </p>
            </div>
          </p>
        </div>
        <div className={`containerImgWhatWeOffer`}></div>
      </div>
    </div >
      <Footer />
    </>
  );
};

export default HomePage;
