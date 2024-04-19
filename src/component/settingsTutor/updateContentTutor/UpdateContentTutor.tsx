import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ContentService from "../../../services/ContentService";
import Content from "../../../models/ContentModel";

const UpdateContentTutor = () => {
  const [contents, setContents] = useState<Content[]>([]);
  const [selectedContentId, setSelectedContentId] = useState<number | null>(null);
  const [content, setContent] = useState<Content>();
  const [titleError, setTitleError] = useState(false);
  const [titleErrorMessage, setTitleErrorMessage] = useState("");
  const [updatedContent, setUpdatedContent] = useState<any>();
  const [updatedSuccessfully, setUpdatedSuccessfully] = useState<boolean>();
  const [resourceAlreadyExists, setResourceAlreadyExists] = useState<boolean>();
  const [loading, setLoading] = useState(false);
  const [isCallComplete, setIsCallComplete] = useState(false);
  const navigate = useNavigate();

  const refreshList = () => {
    ContentService.getContents().then((res) => {
      setContents(res.data.data);
    });
  };

  useEffect(() => {
    refreshList();
  }, []);

  useEffect(() => {
    if (selectedContentId !== null) {
      ContentService.getContentById(selectedContentId).then((res) => {
        setContent(res.data.data);
      });
    }
  }, [selectedContentId]);


  useEffect(() => {
    console.log("Use effect saved content:" + updatedContent);

    if (updatedContent && isCallComplete) {
      if (updatedContent.status === 200) {
        setUpdatedSuccessfully(true);
        setResourceAlreadyExists(false);
      } else if (updatedContent.status === 409) {
        setUpdatedSuccessfully(false);
        setResourceAlreadyExists(true);
      }
    }
  }, [updatedContent, isCallComplete]);

  const updateContent = async () => {
    if (titleError) {
      return;
    }

    try {
      setLoading(true);
      const tempUpdatedContent = await ContentService.updateContent(selectedContentId!, content!);
      setUpdatedContent(tempUpdatedContent);
      console.log("Updated Content: " + tempUpdatedContent)
      setIsCallComplete(true);
      refreshList();
    } catch (error: any) {
      setUpdatedContent(error.response);
      setIsCallComplete(true);
      refreshList();
    } finally {
      setLoading(false);
    }


  };

  const backToSettings = () => {
    navigate("/settings_tutor");
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setError: React.Dispatch<React.SetStateAction<boolean>>,
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const inputValue = event.target.value.trim();
    const inputLength = inputValue.length;

    if (inputLength < 1 || inputLength > 255) {
      setError(true);
      setErrorMessage("The url must be between 1 and 255 characters");
    } else {
      setError(false);
      setErrorMessage("");
    }

    setContent({
      ...content!,
      content: inputValue,
    });
  };

  return (
    <div>
      <h3 className="titleModal">Update Content</h3>
      <form>
        <div className="form-group">
          <label className="labelModal">Content</label>
          <select
            name="content"
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => {
              setSelectedContentId(Number(e.target.value));
            }}
          >
            <option selected disabled hidden>Select the Content to update</option>
            {contents.map((content) => {
              return (
                <option key={content.id} value={content.id}>
                  {content.content}
                </option>
              );
            })}
          </select>
        </div>
        {content && (
          <>
            <div>
              <label className="labelModal">Update the Content</label>
              <input
                type="text"
                placeholder={content.content}
                name="content"
                className={`form-control ${titleError ? "border-red-500" : ""}`}
                value={content.content}
                onChange={(e) =>
                  handleInputChange(e, setTitleError, setTitleErrorMessage)
                }
              ></input>
              {titleErrorMessage && (
                <p className="text-muted">{titleErrorMessage}</p>
              )}
            </div>

            {loading && <div>Saving in progress...</div>}

            {!loading && updatedSuccessfully && (
              <div>
                <label className="labelModal">Content updated correctly!</label>
              </div>
            )}

            {!loading && !updatedSuccessfully && resourceAlreadyExists && (
              <div>
                <label className="labelModal">The content already exists!</label>
              </div>
            )}




            <div className="containerButtonModal">
              <button
                type="button"
                className="buttonCheck"
                onClick={updateContent}
                disabled={titleError}
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
          </>
        )}
      </form>
    </div>
  );
};
export default UpdateContentTutor;
