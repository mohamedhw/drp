import { connect } from "react-redux"
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { user_data } from '../redux/action/profile';
import { useEffect, useState }from 'react'
import Loading from "./Loading";


const ProfileHead = ({loading, isAuthenticated, user_data, user_username, user_image, user_cover, image, username, username_global, image_global, email_global, count, test}) => {
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        user_data(username);
    }, [username]);


    if (loading) {
        return <Loading />;
    }
   console.log(user_cover) 
    return (
        <Row style={{width: "100%"}}>
        {isAuthenticated && username_global===username?
        <div >
                <Row style={{backgroundImage: `url(${apiUrl}/${user_cover})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center center", width: "100%", minHeight: "240px", margin: "0"}}>
                    <div style={{osition: "absolute", top: "0", left: "0", right: "0", bottom: "0", margin: "auto", maxWidth: "200px", maxHeight: "200px"}}>
                        <img style={{width: "200px", height: "200px"}} src={`${apiUrl}/${image_global}`} alt='Profile Image' />
                    </div>
                    <Col lg={8} md={6} sm={6} xs={6} className='pt-1'>
                        <div className="py-lg-5 py-md-5 p-1">
                            <h1 className="user-name">{username_global}</h1>
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
        <div style={{backgroundImage: `url(${apiUrl}/${user_cover})`, backgroundSize: "cover", backgroundRepeat: "no-repeat"}} >
                <Row style={{margin: "0", minHeight: "240px"}}>
                    <div style={{osition: "absolute", top: "0", left: "0", right: "0", bottom: "0", margin: "auto", maxWidth: "200px", maxHeight: "200px"}}>
                        <img style={{width: "200px", height: "200px"}} src={`${apiUrl}/${user_image}`} alt='Profile Image' />
                    </div>
                    <Col lg={8} md={6} sm={6} xs={6} className='pt-1'>
                        <div className="py-lg-5 py-md-5 p-1">
                            <h1 className="user-name">{username}</h1> 
                        </div>
                    </Col>
                </Row>
        </div>
        }
        </Row>
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
    user_cover: state.profile.user_cover,
    loading: state.pics.loading,
})

export default connect(mapStateToProps, {user_data})(ProfileHead);
