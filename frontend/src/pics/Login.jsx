import Container from 'react-bootstrap/esm/Container';
import CSRFToken from '../component/CSRFToken'
import Modal from 'react-bootstrap/Modal';
import {login} from '../redux/action/auth'
import {connect} from 'react-redux'
import {useState, useEffect} from 'react';
import { Link, useNavigate } from "react-router-dom";



const Login = (props) => {
    const { isAuthenticated, login, onHide } = props;
    const [username, setUsername]=useState()
    const [password, setPassword]=useState()
    const navigate = useNavigate()
    // const refresh = () => window.location.reload(true)
    const csrfToken = CSRFToken();
    console.log(csrfToken)
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(username)
        console.log(password)
        login(username, password)
    }
    const handleClose = () => {
        // Call the onHide prop to close the modal
        props.onHide();
    }
    // if(isAuthenticated){
    //     navigate("/")
    // }
    return(
        <Container>
                <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={handleClose}
                >
                {/* <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Modal heading
                    </Modal.Title>
                </Modal.Header> */}
                <Modal.Body className="custom-modal">

                    <h2>Login</h2>
                    <form class="site-form" onSubmit={e=>handleSubmit(e)} method="post">
                        <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken} />
                        <div className='m-lg-5 m-2 p-lg-2 pt-3 form-group'>
                            <input type='text' className="form-control p-2" placeholder="username" onChange={ e => setUsername(e.target.value)}/>
                        </div>
                        <div className='m-lg-5 m-2 p-lg-2 pt-3 form-group'>
                            <input type='password' className="form-control p-2" placeholder="password" onChange={ e => setPassword(e.target.value)}/>
                        </div>
                        <div className=' mt-5 m-1'>
                            <input class="btn btn-outline-success btn-s px-4" onClick={props.onHide} type="submit" value="Login" />
                            <Link to="" ><small className='p-2 p-lg-5' style={{}}>forgot your password?</small></Link>
                        </div>
                    </form>
                </Modal.Body>
                {/* <Modal.Footer className="custom-modal">
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer> */}
            </Modal>
        </Container>
    )
}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated 
})

export default connect(mapStateToProps, {login})(Login);