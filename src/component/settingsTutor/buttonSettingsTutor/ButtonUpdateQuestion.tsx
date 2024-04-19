import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import UpdateQuestion from "../updateQuestionTutor/UpdateQuestionTutor";
import './StyleModalsTutor.css';

const ButtonUpdateQuestion = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <button
        className={`buttonDefault buttonModal`}
        onClick={handleShow}
        style={{ margin: "0.5em" }}>
        <span className={`frontDefault front`}>Question <i className="bi bi-arrow-repeat"></i></span>
      </button>

      <Modal show={show} onHide={handleClose} keyboard={false}>
        <Modal.Body>
          <UpdateQuestion />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ButtonUpdateQuestion;
