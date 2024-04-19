import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Charts from '../charts/charts';
import './StyleModals.css';

const ButtonCharts = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <button
                className={`buttonDefault buttonModal`}
                onClick={handleShow}
                style={{ margin: "0.5em" }}>
                <span className={`frontDefault front`}>Chart <i className="bi bi-plus-circle"></i></span>
            </button>

            <Modal show={show}
                onHide={handleClose}
                keyboard={false}
                >
                <Modal.Body>
                    <Charts />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ButtonCharts;