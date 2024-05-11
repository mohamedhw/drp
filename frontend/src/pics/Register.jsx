import CSRFToken from "../component/CSRFToken";
import Loading from "../component/Loading";
import Container from "react-bootstrap/esm/Container";
import Modal from "react-bootstrap/Modal";
import { register } from "../redux/action/auth";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = ({
  isAuthenticated,
  isRegistered,
  register,
  onHide,
  setModalShow,
  loading,
  ...props
}) => {
  const notify = () =>
    toast(
      `Dear ${username}, please go to your email ${email} inbox and click on \
    received activation link to activate your your account.`,
      {
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        type: "info",
      },
    );

  const [accountCreated, setAccountCreated] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [disable, setDisable] = useState(loading);
  const navigate = useNavigate();

  const errorMessages = {
    username: "Username is required",
    email: "Email is required",
    password: "Password is required",
    passwordLength: "Password needs to be 8 characters minimum!",
    passwordMatch: "Passwords do not match",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username) {
      toast(errorMessages.username, { type: "error" });
      setDisable(false)
      return;
    } else if (!email) {
      toast(errorMessages.email, { type: "error" });
      setDisable(false)
      return;
    } else if (!password) {
      toast(errorMessages.password, { type: "error" });
      setDisable(false)
      return;
    } else if (password.length < 8) {
      toast(errorMessages.passwordLength, { type: "error" });
      setDisable(false)
      return;
    } else if (!password2 || password !== password2) {
      toast(errorMessages.passwordMatch, { type: "error" });
      setDisable(false)
      return;
    }
    register(username, email, password, password2);
    setAccountCreated(true);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile");
    } else if (isRegistered) {
      onHide();
      setModalShow(true);
      notify();
    }
  }, [isRegistered]);


  return (
    <Container>
      <Modal
        {...props}
        onHide={!disable && onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="custom-modal">
          <h2>Register</h2>
            <form
              className="site-form"
              onSubmit={(e) => handleSubmit(e)}
              method="post"
            >
              <CSRFToken />
              <div className="m-lg-4 m-2 p-lg-2 pt-3 form-group">
                <input
                  disabled={disable}
                  type="text"
                  className="form-control p-2"
                  placeholder="username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="m-lg-4 m-2 p-lg-2 pt-3 form-group">
                <input
                  disabled={disable}
                  type="email"
                  className="form-control p-2"
                  placeholder="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="m-lg-4 m-2 p-lg-2 pt-3 form-group">
                <input
                  disabled={disable}
                  type="password"
                  className="form-control p-2"
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="m-lg-4 m-2 p-lg-2 pt-3 form-group">
                <input
                  disabled={disable}
                  type="password"
                  className="form-control p-2"
                  placeholder="confirm password"
                  onChange={(e) => setPassword2(e.target.value)}
                />
              </div>
                <input
                  className="btn btn-outline-success btn-s px-4 mt-4 m-1"
                  id="register-sub"
                  type="submit"
                  value="Register"
                  onClick={() => setDisable(true)}
                  style={{display: disable && "none"}}
                />
              {/* <Link to="/" ><small className='p-2 p-lg-5' style={{}}>alrdy have an account?</small></Link> */}
            </form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isRegistered: state.auth.isRegistered,
  loading: state.auth.register_loading,
});

export default connect(mapStateToProps, { register })(Register);
