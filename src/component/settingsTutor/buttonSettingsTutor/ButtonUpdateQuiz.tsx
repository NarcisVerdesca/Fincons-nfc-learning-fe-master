import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import UpdateQuiz from "../updateQuizTutor/UpdateQuizTutor";
import './StyleModalsTutor.css';

const ButtonUpdateQuiz = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <button
        className={`buttonDefault buttonModal`}
        onClick={handleShow}
        style={{ margin: "0.5em" }}>
        <span className={`frontDefault front`}>Quiz <i className="bi bi-arrow-repeat"></i></span>
      </button>

      <Modal show={show} onHide={handleClose} keyboard={false}>
        <Modal.Body>
          <UpdateQuiz />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ButtonUpdateQuiz;
