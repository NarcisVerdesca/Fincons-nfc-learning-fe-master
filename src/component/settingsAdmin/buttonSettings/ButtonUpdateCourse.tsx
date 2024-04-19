import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import UpdateCourse from '../course/UpdateCourse';
import './StyleModals.css';

const ButtonUpdateCourse = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <button
                className={`buttonDefault buttonModal`}
                onClick={handleShow}
                style={{ margin: "0.5em" }}>
                <span className={`frontDefault front`}>Course <i className="bi bi-arrow-repeat"></i></span>
            </button>

            <Modal show={show}
                onHide={handleClose}
                keyboard={false}
                >
                <Modal.Body>
                    <UpdateCourse />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ButtonUpdateCourse;