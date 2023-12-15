import { connect } from "react-redux"
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { user_data } from '../redux/action/profile';
import { useEffect, useState }from 'react'
import ReactCrop from 'react-image-crop'

const ProfileHead = ({loading, isAuthenticated, user_data, user_username, user_image, image, username, username_global, image_global, email_global, count, test}) => {
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        user_data(username);
    }, [username]);

    const [crop, setCrop] = useState({ aspect: 16 / 9 }); // Set the desired aspect ratio
    const [completedCrop, setCompletedCrop] = useState(null);

    const onCropChange = (crop) => {
    setCrop(crop);
    };

    const onCropCompleteHandler = (crop) => {
    setCompletedCrop(crop);
    onCropComplete(crop);
    };

    if (loading) {
        return <>Loading...</>;
    }
    
    return (
        <>
        {isAuthenticated && username_global===username?
        <div style={{backgroundImage: "~/wallhaven-1jr5gg.jpg"}}>
                <Row>
                    <Col lg={5} md={6} sm={8} xs={12}>
                        {/*   <ReactCrop
                                  // src={`${apiUrl}/${image_global}`}
                                  crop={crop}
                                  onChange={onCropChange}
                                  onComplete={onCropCompleteHandler}
                             >
                                <img src={`${apiUrl}/${image_global}`} />
                            </ReactCrop>
                        */}
                        <img style={{width: "230px", height: "230px"}} src={`${apiUrl}/${image_global}`} alt='Profile Image' />
                    </Col>
                    <Col lg={7} md={6} sm={8} xs={12} className='pt-1'>
                        <div className="">
                            <ul className='profile-info' >
                                <li>username:  <span style={{color:"#fff"}}>{username_global}</span></li>
                                <li>email:  <span style={{color:"#fff"}}>{email_global}</span></li>
                                <li>{test}: <span style={{color:"#fff"}}>{count}</span></li>
                            </ul>
                        </div>
                    </Col>
                </Row>
                <Container>
                    <Nav className="mx-lg-auto d-flex justify-content-center">
                        <Link to={`/userpics/${username_global}`}><Button className='btn btn-outline-success btn-s px-lg-5 mx-1 mx-lg-1'>my pics</Button></Link>
                        <Link to='/saved'><Button className='btn btn-outline-success btn-s px-lg-5 mx-1 mx-lg-1'>saved</Button></Link>
                        <Link to='/profile'><Button className='btn btn-outline-success btn-s px-lg-5 mx-1 mx-lg-1'>update</Button></Link>
                    </Nav>
                </Container>
        </div>
                :
        <div style={{backgroundImage: "url(../../w1.jpg)", backgroundSize: "cover"}}>
                <Row>
                    <Col lg={5} md={6} sm={8} xs={12}>
                        <img style={{width: "230px", height: "230px"}} src={`${apiUrl}/${user_image}`} alt='Profile Image' />
                    </Col>
                    <Col lg={7} md={6} sm={8} xs={12} className='pt-1'>
                        <div>
                            <ul className='profile-info' >
                                <li><h2><span style={{}}>{username}</span></h2></li>
                            </ul>
                        </div>
                    </Col>
                </Row>
        </div>
        }
        </>
    )
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    username_global: state.profile.username,
    image_global: state.profile.image,
    email_global: state.profile.email,
    user_global: state.profile.user,
    user_username: state.profile.user_username,
    user_image: state.profile.user_image,
    loading: state.pics.loading,
})

export default connect(mapStateToProps, {user_data})(ProfileHead);
