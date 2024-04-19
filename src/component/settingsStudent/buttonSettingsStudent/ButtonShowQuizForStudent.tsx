import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ShowQuizForStudent from '../showQuizForStudent/ShowQuizForStudent';
import './ButtonStyleStudent.css'

const ButtonShowQuizForStudent = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <button
                className={`buttonDefaultStudent buttonModalStudent`}
                onClick={handleShow}
                style={{ margin: "0.5em" }}>
                <span className={`frontDefaultStudent frontStudent`}>Quizzes <i className="bi bi-arrow-repeat"></i></span>
            </button>

            <Modal show={show}
                onHide={handleClose}
                size='lg'
            >
            <Modal.Body >
                    <ShowQuizForStudent />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ButtonShowQuizForStudent;