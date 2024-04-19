import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteAnswerTutor from '../deleteAnswerTutor/DeleteAnswerTutor';
import './StyleModalsTutor.css';



const ButtonDeleteAnswer = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <button
                className={`buttonDefault buttonModal`}
                onClick={handleShow}
                style={{ margin: "0.5em" }}>
                <span className={`frontDefault front`}>Answer <i className="bi bi-trash3"></i></span>
            </button>

            <Modal show={show}
                onHide={handleClose}
                keyboard={false}>
                <Modal.Body>
                    <DeleteAnswerTutor />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ButtonDeleteAnswer;