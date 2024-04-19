import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Content from "../../../models/ContentModel";
import ContentService from "../../../services/ContentService";

const DeleteContentTutor = () => {
  const [contents, setContents] = useState<Content[]>([]);
  const [selectedContentId, setSelectedContentId] = useState<number | null>(
    null
  );
  const [content, setContent] = useState<Content>();
  const [loading, setLoading] = useState(false);
  const [isCallComplete, setIsCallComplete] = useState(false);
  const [deletionMessage, setDeletionMessage] = useState<string>("");

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

  const deleteContent = async () => {
    try {
      setLoading(true);
      const tempDeletedQuiz = await ContentService.deleteContent(
        selectedContentId!
      );
      setIsCallComplete(true);
      setDeletionMessage("Content deleted successfully! ");
      refreshList();
    } catch (error: any) {
      console.error("Errore durante eliminazione contenuto:", error);
      setIsCallComplete(true);
      setDeletionMessage("Problems were encountered during deletion! ");
      refreshList();
    } finally {
      setLoading(false);
    }
  };

  const backToSettings = () => {
    navigate("/settings_tutor");
  };

  return (
    <div>
      <div>
        <h3 className="titleModal">Delete Content</h3>
        <div>
          <form>
            <div className="form-group">
              <label className="labelModal">Content</label>
              <select
                name="quiz"
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => {
                  setSelectedContentId(Number(e.target.value));
                }}
              >
                <option selected hidden disabled>
                  Select the Content to delete
                </option>
                {contents.map((content) => {
                  return (
                    <option key={content.id} value={content.id}>
                      {content.content}
                    </option>
                  );
                })}
              </select>
            </div>

            {loading && <div>Delete in progress...</div>}

            {isCallComplete && (
              <div>
                <label className="labelModal">{deletionMessage}</label>
              </div>
            )}

            {content && (
              <>
                <div className="containerButtonModal">
                  <button
                    type="button"
                    className="buttonCheck"
                    onClick={deleteContent}
                    disabled={loading}
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
      </div>
    </div>
  );
};
export default DeleteContentTutor;
