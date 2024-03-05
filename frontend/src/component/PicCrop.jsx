import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';


const PicCrop = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Your form submission logic here (e.g., sending a request to your Django backend)
    props.onHide
    // After submission is complete, reset isSubmitting
    setIsSubmitting(false);
  };


  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {isSubmitting && <h1>Loading...</h1>} {/* Display spinner when submitting */}
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

