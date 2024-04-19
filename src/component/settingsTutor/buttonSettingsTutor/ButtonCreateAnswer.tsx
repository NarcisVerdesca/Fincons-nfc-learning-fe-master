import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import CreateAnswer from '../createAnswerTutor/CreateAnswer';
import './StyleModalsTutor.css';

const ButtonCreateAnswer = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <button
                className={`buttonDefault buttonModal`}
                onClick={handleShow}
                style={{ margin: "0.5em" }}>
                <span className={`frontDefault front`}>Answer <i className="bi bi-plus-circle"></i></span>
            </button>

            <Modal show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                >
                <Modal.Body>
                    <CreateAnswer />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ButtonCreateAnswer;