import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import AssociationQuizLesson from '../associationQuizLesson/AssociationQuizLesson';
import './StyleModalsTutor.css';

const ButtonAssociationQuizLesson = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <button
                className={`buttonDefault buttonModal`}
                onClick={handleShow}
                style={{ margin: "0.5em" }}
            >
                <span className={`frontDefault front`}>Quiz to Lesson <i className="bi bi-arrows-angle-contract"></i></span>
            </button>

            <Modal show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                >
                <Modal.Body>
                    <AssociationQuizLesson />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ButtonAssociationQuizLesson;