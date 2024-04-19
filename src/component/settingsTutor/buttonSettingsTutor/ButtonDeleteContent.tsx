import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteContentTutor from '../deleteContentTutor/DeleteContentTutor';
import './StyleModalsTutor.css';



const ButtonDeleteContent = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <button
                className={`buttonDefault buttonModal`}
                onClick={handleShow}
                style={{ margin: "0.5em" }}>
                <span className={`frontDefault front`}>Content <i className="bi bi-trash3"></i></span>
            </button>

            <Modal show={show}
                onHide={handleClose}
                keyboard={false}>
                <Modal.Body>
                    <DeleteContentTutor />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ButtonDeleteContent;