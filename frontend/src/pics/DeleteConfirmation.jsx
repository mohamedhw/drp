import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { delete_pic } from '../redux/action/pics'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function Delete({ show, setShow, delete_pic, data }) {
    const navigate = useNavigate(); // Get the history object

    const handleClose = () => {
        setShow(false);
        delete_pic(data.id)
        navigate('/');
    }

    return (
        <>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Body><h3>are you sure you want to delete this pic?</h3></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        cancel
                    </Button>
                    <Button variant="danger" onClick={handleClose}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

const mapStateToProps = state => ({
    data: state.pics.detail
})
export default connect(mapStateToProps, { delete_pic })(Delete)
