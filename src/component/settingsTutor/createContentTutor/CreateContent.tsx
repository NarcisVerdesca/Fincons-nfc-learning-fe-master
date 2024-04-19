import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Content from "../../../models/ContentModel";
import ContentService from "../../../services/ContentService";

const CreateContent = () => {
  const [content, setContent] = useState<Content>();
  const [savedContent, setSavedContent] = useState<any>();
  const [savedSuccessfully, setSaveSuccessfully] = useState<boolean>();
  const [resourceAlreadyExists, setResourceAlreadyExists] = useState<boolean>();
  const [loading, setLoading] = useState(false);
  const [isCallComplete, setIsCallComplete] = useState(false);



  const navigate = useNavigate();

  const saveContent = async (event: FormEvent) => {
    try {
      setLoading(true);
      const tempSavedContent = await ContentService.createContent(content!);
      setSavedContent(tempSavedContent);
      setIsCallComplete(true);
    } catch (error: any) {
      console.error("Errore durante il salvataggio del quiz:", error);
      setSavedContent(error.response);
      setIsCallComplete(true);
    } finally {
      setLoading(false);
    }

  };


  useEffect(() => {
    console.log("Use effect saved answer:" + savedContent);
  
    if (savedContent && isCallComplete) {
        if (savedContent.status === 200) {
            setSaveSuccessfully(true);
            setResourceAlreadyExists(false);
        } else if (savedContent.status === 409) {
            setSaveSuccessfully(false);
            setResourceAlreadyExists(true);
        }
    }
  }, [savedContent, isCallComplete]);

  const backToSettings = () => {
    navigate("/settings_tutor");
  };

  return (
    <div>
      <div>
        <h3 className="titleModal"> Create Content </h3>
        <div>
          <form>
            <div>
              <label className="labelModal">Resource Url</label>
              <input
                type="string"
                placeholder="Url"
                name="text"
                className="form-control"
                value={content?.content}
                onChange={(e) => {
                  setContent({
                    ...content!,
                    content: e.target.value,
                  });
                  console.log(content);
                }}
              ></input>
            </div>

            {loading && <div>Saving in progress...</div>}

            {!loading && savedSuccessfully && (
              <div>
                <label className="labelModal">Content saved correctly!</label>
              </div>
            )}

            {!loading && !savedSuccessfully && resourceAlreadyExists && (
              <div>
                <label className="labelModal">The content already exists!</label>
              </div>
            )}



            <div className="containerButtonModal">
              <button className="buttonCheck" onClick={saveContent} type="button">
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
    </div>
  );
};

export default CreateContent;
