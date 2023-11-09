import Container from 'react-bootstrap/esm/Container';
import CSRFToken from '../component/CSRFToken'
import Modal from 'react-bootstrap/Modal';
import {register} from '../redux/action/auth'
import {connect} from 'react-redux'
import {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';



const Register = (props) => {
    const notify = () => toast(`Dear ${username}, please go to your email ${email} inbox and click on \
    received activation link to activate your your account.`, {
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        type: "info",
        // style:{
        //     border: '1px solid #54c7ec',
        //     color: '#54c7ec',
        //     fontWeight: 'bold',
        //     fontSize: '17px'
        // }
    });
    const { isAuthenticated, isRegistered, register, onHide, setModalShow } = props;

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
        
        register(username, email, password, password2)
        setAccountCreated(true)

    }
    useEffect(()=>{
        if (isAuthenticated){
            navigate('/profile')
        }else if (isRegistered){
            onHide()
            setModalShow(true)
            notify()
        }
    },[isRegistered])
    console.log(isAuthenticated)
    console.log(accountCreated)

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
                        <input class="btn btn-outline-success btn-s px-4 mt-4 m-1"  type="submit" value="Register" />
                        {/* <Link to="/" ><small className='p-2 p-lg-5' style={{}}>alrdy have an account?</small></Link> */}
                    </form>
                </Modal.Body>
            </Modal>
        </Container>
        
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isRegistered: state.auth.isRegistered
})

export default connect(mapStateToProps, {register})(Register);
