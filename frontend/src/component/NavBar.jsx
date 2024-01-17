import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom"
import { logout } from "../redux/action/auth";
import { connect } from "react-redux"
import { setCurrentPage } from '../redux/action/pages'; // Import your new actions
import {BiSearchAlt} from 'react-icons/bi'
import {BsFillPersonFill} from 'react-icons/bs'
import { toast } from 'react-toastify';

const NavBar = ({setModalShowLogin, setModalShowRegister, logout, isAuthenticated, username_global, setCurrentPage, setShow}) => {
    const handelSearch = () => {
        setShow(true)
    }
    // const handelLogout = () => {
    //     logout()
        
    // }
    // const notify = () => toast("Wow so easy!", {
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "dark",
    //     // type: "def",
    //     style:{
    //         border: '1px solid #e74c3c',
    //         color: '#e74c3c',
    //         fontWeight: 'bold',
    //         fontSize: '17px'
    //     }
    // });
    return (
        <Navbar expand="lg" className="navbar-dark pt-3">
            <Container>
                <Navbar.Brand className='logo'><Link to="/" onClick={e=>(setCurrentPage(1))}>DRP</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto mx-5">
                    <Form inline>
                        <Row>
                        {/* <Col xs="auto">
                            <Form.Control
                            type="text"
                            name='q'
                            placeholder="Search"
                            className=" mr-sm-2 search-input"
                            onChange={e=>handelSearch(e)}
                            />
                        </Col> */}
                        {/* <Col xs="auto">
                            <Button type="submit">Submit</Button>
                        </Col> */}
                        </Row>
                    </Form>
                    {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                        Another action
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">
                        Separated link
                        </NavDropdown.Item>
                    </NavDropdown> */}
                    </Nav>
                    <Nav>
                    {/* <button onClick={notify}>Notify!</button> */}
                        {/* <Nav.Link><Link to='/' ><Button className='btn btn-outline-success btn-s'>Home</Button></Link></Nav.Link> */}

                        <Nav.Link><Button className='btn btn-outline-success btn-s' onClick={handelSearch}><BiSearchAlt/></Button></Nav.Link>
                        <Nav.Link><Link to='/tags' ><Button className='btn btn-outline-success btn-s'>tags</Button></Link></Nav.Link>
                        {isAuthenticated?
                        <>
                            <Nav.Link><Link to={`/userpics/${username_global}`}><Button className='btn btn-outline-success btn-s' ><BsFillPersonFill/></Button></Link></Nav.Link>
                            <Nav.Link><Link to='/'><Button className='btn btn-outline-success btn-s' onClick={logout}>Logout</Button></Link></Nav.Link>
                            <Nav.Link><Link to='/create' ><Button className='btn btn-outline-success btn-s'>upload</Button></Link></Nav.Link>
                        </>
                        :
                        <>
                            <Nav.Link><Button className='btn btn-outline-success btn-s' onClick={() => setModalShowLogin(true)}>Login</Button></Nav.Link>
                            <Nav.Link><Button className='btn btn-outline-success btn-s' onClick={() => setModalShowRegister(true)}>Register</Button></Nav.Link>
                        </>
                        }
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>  
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    username_global: state.profile.username,
})

export default connect(mapStateToProps, { logout, setCurrentPage })(NavBar);
