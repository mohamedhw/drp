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





const NavBar = ({setQ}) => {

    return (
        <Navbar expand="lg" className="navbar-dark pt-3">
            <Container>
                <Navbar.Brand className='logo'><Link to="/">DRP</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto mx-5">
                    <Form inline>
                        <Row>
                        <Col xs="auto">
                            <Form.Control
                            type="text"
                            name='q'
                            placeholder="Search"
                            className=" mr-sm-2 search-input"
                            onChange={e=>setQ(e.target.value)}
                            />
                        </Col>
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
                        <Nav.Link href="#home"><Button className='btn btn-outline-success btn-s'>Home</Button></Nav.Link>
                        <Nav.Link href="#link"><Button className='btn btn-outline-success btn-s'>Link</Button></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>  
    )
}

export default NavBar