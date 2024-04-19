import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import CreateCourse from '../course/CreateCourse';
import './StyleModals.css';

const ButtonCreateCourse = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <button
                className={`buttonDefault buttonModal`}
                onClick={handleShow}
                style={{ margin: "0.5em" }}>
                <span className={`frontDefault front`}>Course <i className="bi bi-plus-circle"></i></span>
            </button>

            <Modal show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                >
                <Modal.Body>
                    <CreateCourse />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ButtonCreateCourse;