import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import RegisterTutor from "../registerTutor/RegisterTutor";
import './StyleModals.css';

const ButtonRegisterTutor = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <button
        className={`buttonDefault buttonModal`}
        onClick={handleShow}
        style={{ margin: "0.5em" }}>
        <span className={`frontDefault front`}>Tutor <i className="bi bi-plus-circle"></i></span>
      </button>

      <Modal show={show} onHide={handleClose} keyboard={false}>
        <Modal.Body>
          <RegisterTutor />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ButtonRegisterTutor;
