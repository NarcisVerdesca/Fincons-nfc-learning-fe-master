import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import UpdateAbility from "../ability/UpdateAbility";
import './StyleModals.css';

const ButtonUpdateAbility = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <button
        className={`buttonDefault buttonModal`}
        onClick={handleShow}
        style={{ margin: "0.5em" }}>
        <span className={`frontDefault front`}>Ability <i className="bi bi-arrow-repeat"></i></span>
      </button>

      <Modal show={show} onHide={handleClose} keyboard={false} >
        <Modal.Body>
          <UpdateAbility />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ButtonUpdateAbility;
