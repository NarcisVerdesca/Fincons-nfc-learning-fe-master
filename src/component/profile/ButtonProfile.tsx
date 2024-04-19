import { Button, Modal } from "react-bootstrap";
import Profile from "./Profile";
import { useState } from "react";

const ButtonProfile = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="light" onClick={handleShow} style={{ margin: "0.5em"}}>
        <i className="bi bi-person-fill"></i>
      </Button>

      <Modal show={show} onHide={handleClose} keyboard={false}>
        <Modal.Body>
          <Profile/>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ButtonProfile;
