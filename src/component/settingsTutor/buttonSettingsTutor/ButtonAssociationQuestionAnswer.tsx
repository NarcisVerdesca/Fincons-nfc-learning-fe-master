import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import AssociationQuestionAnswer from '../associationQuestionAnswer/AssociationQuestionAnswer';
import './StyleModalsTutor.css';

const ButtonAssociationQuestionAnswer = () => {
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
                <span className={`frontDefault front`}>Question to Answer <i className="bi bi-arrows-angle-contract"></i></span>
            </button>

            <Modal show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                >
                <Modal.Body>
                    <AssociationQuestionAnswer />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ButtonAssociationQuestionAnswer;