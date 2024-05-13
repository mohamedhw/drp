import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import { logout } from "../redux/action/auth";
import { connect } from "react-redux";
import { setCurrentPage } from "../redux/action/pages";
import { BiSearchAlt } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import { setQ } from "../redux/action/pics";

const NavBar = ({
  setModalShowLogin,
  setModalShowRegister,
  logout,
  isAuthenticated,
  username_global,
  setCurrentPage,
  setShow,
  setQ,
}) => {



  const handelSearch = () => {
    setShow(true);
    setQ(null);
  };


  return (
    <div className="nav-s">
      <Navbar expand="lg" className="navbar-dark p-0 pt-2">
        <Container>
          <Navbar.Brand className="logo">
            <a href="/" >
              <h3>DRP</h3>
            </a>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto mx-5">
              <Form inline>
                <Row></Row>
              </Form>
            </Nav>
            <Nav>
              <Nav.Link>
                <Button
                  className="btn btn-outline-success btn-s"
                  onClick={handelSearch}
                >
                  <BiSearchAlt />
                </Button>
              </Nav.Link>
              <Nav.Link>
                <Link to="/tags">
                  <Button onClick={()=>setCurrentPage(1)} className="btn btn-outline-success btn-s">
                    tags
                  </Button>
                </Link>
              </Nav.Link>
              {isAuthenticated ? (
                <>
                  <Nav.Link>
                    <Link to={`/userpics/${username_global}`}>
                      <Button className="btn btn-outline-success btn-s">
                        <BsFillPersonFill />
                      </Button>
                    </Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link to="/">
                      <Button
                        className="btn btn-outline-success btn-s"
                        onClick={logout}
                      >
                        Logout
                      </Button>
                    </Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link to="/create">
                      <Button className="btn btn-outline-success btn-s">
                        upload
                      </Button>
                    </Link>
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link>
                    <Button
                      className="btn btn-outline-success btn-s"
                      onClick={() => setModalShowLogin(true)}
                    >
                      Login
                    </Button>
                  </Nav.Link>
                  <Nav.Link>
                    <Button
                      className="btn btn-outline-success btn-s"
                      onClick={() => setModalShowRegister(true)}
                    >
                      Register
                    </Button>
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  username_global: state.profile.username,
});

export default connect(mapStateToProps, {
  logout,
  setCurrentPage,
  setQ,
})(NavBar);
