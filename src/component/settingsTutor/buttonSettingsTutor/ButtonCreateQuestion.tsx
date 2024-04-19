import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import CreateQuestion from '../createQuestionTutor/CreateQuestion';
import './StyleModalsTutor.css';

const ButtonCreateQuestion = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <button
                className={`buttonDefault buttonModal`}
                onClick={handleShow}
                style={{ margin: "0.5em" }}>
                <span className={`frontDefault front`}>Question <i className="bi bi-plus-circle"></i></span>
            </button>

            <Modal show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                >
                <Modal.Body>
                    <CreateQuestion />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ButtonCreateQuestion;