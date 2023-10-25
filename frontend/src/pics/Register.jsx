import Container from 'react-bootstrap/esm/Container';
import CSRFToken from '../component/CSRFToken'
import Modal from 'react-bootstrap/Modal';
import {register} from '../redux/action/auth'
import {connect} from 'react-redux'
import {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";



const Register = (props) => {

    const { isAuthenticated, register, onHide } = props;

    const [accountCreated, setAccountCreated] = useState(false)
    const [username, setUsername]=useState()
    const [email, setEmail] = useState()
    const [password, setPassword]=useState()
    const [password2, setPassword2] = useState(null)
    const navigate = useNavigate()
    
    const handleSubmit=(e)=>{
        e.preventDefault();
        // let form_data = new FormData();
        // form_data.append('username', username);
        // form_data.append('password', password);
        // form_data.append('password2', password2);
        
        if (password === password2){
            register(username, email, password, password2)
        }
        else {
            console.log("error password dont match!")
            setAccountCreated(false)
        }
    }
    if (isAuthenticated){
        return navigate('/profile')
     }else if (accountCreated){
       return navigate('/login')
    }

    return(
        
        <Container>
                <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >

                <Modal.Body className="custom-modal">

                    <h2>Register</h2>
                    <form class="site-form" onSubmit={e=>handleSubmit(e)} method="post">
                        <CSRFToken/>
                        <div className='m-lg-4 m-2 p-lg-2 pt-3 form-group'>
                            <input type='text' className="form-control p-2" placeholder="username" onChange={ e => setUsername(e.target.value)}/>
                        </div>
                        <div className='m-lg-4 m-2 p-lg-2 pt-3 form-group'>
                            <input type='email' className="form-control p-2" placeholder="email" onChange={ e => setEmail(e.target.value)}/>
                        </div>
                        <div className='m-lg-4 m-2 p-lg-2 pt-3 form-group'>
                            <input type='password' className="form-control p-2" placeholder="password" onChange={ e => setPassword(e.target.value)}/>
                        </div>                
                        <div className='m-lg-4 m-2 p-lg-2 pt-3 form-group'>
                            <input type='password' className="form-control p-2" placeholder="confirm password" onChange={ e => setPassword2(e.target.value)}/>
                        </div>
                        <input class="btn btn-outline-success btn-s px-4 mt-4 m-1" onClick={onHide} type="submit" value="Register" />
                        {/* <Link to="/" ><small className='p-2 p-lg-5' style={{}}>alrdy have an account?</small></Link> */}

                    </form>
                </Modal.Body>
            </Modal>
        </Container>
        
    )
}

// const mapStateToProps = state => ({
//     isAuthenticated: state.auth.isAuthenticated 
// })

export default connect(null, {register})(Register);
