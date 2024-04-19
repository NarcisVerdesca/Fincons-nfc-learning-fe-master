import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import UpdateContentTutor from "../updateContentTutor/UpdateContentTutor";
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
        <span className={`frontDefault front`}>Content <i className="bi bi-arrow-repeat"></i></span>
      </button>

      <Modal show={show} onHide={handleClose} keyboard={false}>
        <Modal.Body>
          <UpdateContentTutor />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ButtonUpdateQuestion;
