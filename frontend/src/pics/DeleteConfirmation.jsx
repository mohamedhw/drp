import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { delete_pic } from '../redux/action/pics'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { pics } from '../redux/action/pics';

function Delete({ show, setShow, delete_pic, pics, data }) {
    const navigate = useNavigate(); // Get the history object
    const apiUrl = import.meta.env.VITE_API_URL;

    const handleDelete = () => {
        setShow(false);
        delete_pic(data.id)
        pics(`${apiUrl}/api-post/`)
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
                    <Button variant="danger" onClick={handleDelete}>
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
export default connect(mapStateToProps, { delete_pic, pics })(Delete)
