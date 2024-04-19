import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import DeleteLesson from '../lesson/DeleteLesson';
import './StyleModals.css';

const ButtonDeleteLesson = () => {
  const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <button
                className={`buttonDefault buttonModal`}
                onClick={handleShow}
                style={{ margin: "0.5em" }}>
                <span className={`frontDefault front`}>Lesson <i className="bi bi-trash3"></i></span>
            </button>

      <Modal show={show} onHide={handleClose} keyboard={false} >
        <Modal.Body>
          <DeleteLesson />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ButtonDeleteLesson;
