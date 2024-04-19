import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import UpdateLesson from '../lesson/UpdateLesson';
import './StyleModals.css';

const ButtonUpdateLesson = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <button
                className={`buttonDefault buttonModal`}
                onClick={handleShow}
                style={{ margin: "0.5em" }}>
                <span className={`frontDefault front`}>Lesson <i className="bi bi-arrow-repeat"></i></span>
            </button>

            <Modal show={show}
                onHide={handleClose}
                keyboard={false}
                scrolable>
                <Modal.Body>
                    <UpdateLesson />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ButtonUpdateLesson;