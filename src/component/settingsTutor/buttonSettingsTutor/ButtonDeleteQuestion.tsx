import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import DeleteQuestionTutor from '../deleteQuestionTutor/DeleteQuestionTutor';
import './StyleModalsTutor.css';

const ButtonDeleteQuestion = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <button
                className={`buttonDefault buttonModal`}
                onClick={handleShow}
                style={{ margin: "0.5em" }}>
                <span className={`frontDefault front`}>Question <i className="bi bi-trash3"></i></span>
            </button>

            <Modal show={show}
                onHide={handleClose}
                keyboard={false}>
                <Modal.Body>
                    <DeleteQuestionTutor />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ButtonDeleteQuestion;