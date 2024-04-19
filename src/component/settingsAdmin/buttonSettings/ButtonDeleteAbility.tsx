import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import DeleteAbility from '../ability/DeleteAbility';
import './StyleModals.css';

const ButtonDeleteAbility = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <button
                className={`buttonDefault buttonModal`}
                onClick={handleShow}
                style={{ margin: "0.5em" }}>
                <span className={`frontDefault front`}>Ability <i className="bi bi-trash3"></i></span>
            </button>

            <Modal show={show}
                onHide={handleClose}
                keyboard={false}
                >
                <Modal.Body>
                    <DeleteAbility />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ButtonDeleteAbility;