import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import DeleteCourse from '../course/DeleteCourse';
import './StyleModals.css';

const ButtonDeleteCourse = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <button
                className={`buttonDefault buttonModal`}
                onClick={handleShow}
                style={{ margin: "0.5em" }}>
                <span className={`frontDefault front`}>Course <i className="bi bi-trash3"></i></span>
            </button>

            <Modal show={show}
                onHide={handleClose}
                keyboard={false}
                className={`modal`}
                >
                <Modal.Body
                    className={`modalBody`}>
                    <DeleteCourse />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ButtonDeleteCourse;