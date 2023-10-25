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
            register(username, password, password2)
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
                        <div className='m-4 p-2 form-group'>
                            <input type='text' className="form-control" placeholder="username" onChange={ e => setUsername(e.target.value)}/>
                        </div>
                        <div className='m-4 p-2 form-group'>
                            <input type='password' className="form-control" placeholder="password" onChange={ e => setPassword(e.target.value)}/>
                        </div>                
                        <div className='m-4 p-2 form-group'>
                            <input type='password' className="form-control" placeholder="confirm password" onChange={ e => setPassword2(e.target.value)}/>
                        </div>
                        <input class="btn btn-outline-success btn-s px-4 mt-4 m-1" onClick={onHide} type="submit" value="Register" />
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
