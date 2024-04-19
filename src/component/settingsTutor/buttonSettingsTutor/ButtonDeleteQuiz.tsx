import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteQuizTutor from '../deleteQuizTutor/DeleteQuizTutor';
import './StyleModalsTutor.css';



const ButtonDeleteQuiz = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <button
                className={`buttonDefault buttonModal`}
                onClick={handleShow}
                style={{ margin: "0.5em" }}>
                <span className={`frontDefault front`}>Quiz <i className="bi bi-trash3"></i></span>
            </button>

            <Modal show={show}
                onHide={handleClose}
                keyboard={false}>
                <Modal.Body>
                    <DeleteQuizTutor />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ButtonDeleteQuiz;