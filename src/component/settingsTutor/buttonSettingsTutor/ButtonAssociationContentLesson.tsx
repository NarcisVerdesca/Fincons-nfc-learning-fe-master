import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import CreateAssociationContentLesson from '../associationContentLesson/AssociationContentLesson';
import './StyleModalsTutor.css';

const ButtonAssociationContentLesson = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <button
                className={`buttonDefault buttonModal`}
                onClick={handleShow}
                style={{ margin: "0.5em" }}>
                <span className={`frontDefault front`}>Content to Lesson <i className="bi bi-arrows-angle-contract"></i></span>
            </button>

            <Modal show={show}
                onHide={handleClose}
                keyboard={false}>
                <Modal.Body>
                    <CreateAssociationContentLesson />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ButtonAssociationContentLesson;