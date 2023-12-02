import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { delete_pic } from '../redux/action/pics'
import {connect} from 'react-redux'

function Delete({show, setShow, delete_pic, data}) {
    const handleClose = () => {
        setShow(false);
        delete_pic(data.id)
    }
  return (
    <>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body><h3>are you sure you want to delete this pic?</h3></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
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
export default connect(mapStateToProps, {delete_pic}) (Delete)
