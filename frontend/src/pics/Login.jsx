import Container from 'react-bootstrap/esm/Container';
import CSRFToken from '../component/CSRFToken'
import Modal from 'react-bootstrap/Modal';
import { login } from '../redux/action/auth'
import { connect } from 'react-redux'
import { useState } from 'react';
import { profile } from "../redux/action/profile";
import { toast } from 'react-toastify';

const Login = (props) => {

    const { isAuthenticated, login, onHide, profile } = props;
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const csrfToken = CSRFToken();

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!username) {
            toast("please enter your username", { type: "error" });
            return;
        } else if (!password) {
            toast("please enter your password", { type: "error" });
            return;
        } else if (password.length < 8) {
            toast("password incorrect", { type: "error" });
            return;
        }

        login(username, password)
    }
    const handleClose = () => {
        // Call the onHide prop to close the modal
        onHide();
    }
    if (isAuthenticated) {
        onHide();
        profile();
    }

    return (
        <Container>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={handleClose}
            >
                <Modal.Body className="custom-modal">

                    <h2>Login</h2>
                    <form className="site-form" onSubmit={e => handleSubmit(e)} method="post">
                        <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken} />
                        <div className='m-lg-5 m-2 p-lg-2 pt-3 form-group'>
                            <input type='text' className="form-control p-2" placeholder="username" onChange={e => setUsername(e.target.value)} />
                        </div>
                        <div className='m-lg-5 m-2 p-lg-2 pt-3 form-group'>
                            <input type='password' className="form-control p-2" placeholder="password" onChange={e => setPassword(e.target.value)} />
                        </div>
                        <div className='mt-5 m-1'>
                            <button className="btn btn-outline-success btn-s px-4" type="submit" >Login</button>
                            <span className='m-lg-5 m-md-2 m-sm-1'></span>
                            <div className='p-1' style={{ display: 'inline-block', verticalAlign: "bottom"}}>
                                <a href="/reset_password/"><b>forgot your password?</b></a>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </Container>
    )
}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login, profile })(Login);
