import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import CreateQuiz from '../createQuizTutor/CreateQuiz';
import './StyleModalsTutor.css';

const ButtonCreateQuiz = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <button
                className={`buttonDefault buttonModal`}
                onClick={handleShow}
                style={{ margin: "0.5em" }}>
                <span className={`frontDefault front`}>Quiz <i className="bi bi-plus-circle"></i></span>
            </button>

            <Modal show={show}
                onHide={handleClose}
                keyboard={false}
                >
                <Modal.Body>
                    <CreateQuiz />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ButtonCreateQuiz;