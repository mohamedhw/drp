import { profile, profile_update, user_update } from '../redux/action/profile'
import { useState, useEffect } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import { connect } from 'react-redux'
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';



const Profile = ({ profile, profile_update, user_update, username_global, image_global, email_global, setShow, setCoverPic}) => {

    const [username, setUsername] = useState(username_global)
    const [email, setEmail] = useState(email_global)
    const [image, setImage] = useState()
    const [test, setTest] = useState(1)
    
    const handelSubmit = (e) => {
        e.preventDefault();
        let form_data = new FormData();
        form_data.append('image', image);
        user_update(username, email)
        profile_update(form_data)
        profile()
    }

    useEffect(() => {
        profile()
    }, [test]);
    
    const handelCover = (e) => {
        setShow(true);
        setCoverPic(e.target.files[0])
    }

    return (
        <div className='mt-5'>
            <Container>
                <Row>
                    <Col lg={5} md={6} sm={8} xs={12}>
                        <img style={{width: "230px", height: "230px"}} src={`${image_global}`} alt='Profile Image' />
                    </Col>
                    <Col lg={7} md={6} sm={8} xs={12} className='pt-1'>
                        <div>
                            <ul className='profile-info' >
                                <li>username:  <span style={{color:"#fff"}}>{username_global}</span></li>
                                <li>email:  <span style={{color:"#fff"}}>{email_global}</span></li>
                            </ul>
                        </div>
                    </Col>
                </Row>
                <Container>
                    <Nav className="mx-lg-auto d-flex justify-content-center">
                        <Link to={`/userpics/${username_global}`}><Button className='btn btn-outline-success btn-s px-lg-5 mx-1 mx-lg-1'>my pics</Button></Link>
                        <Link to='/saved'><Button className='btn btn-outline-success btn-s px-lg-5 mx-1 mx-lg-1'>saved</Button></Link>
                        <Button className='btn btn-outline-success btn-s px-lg-5 mx-1 mx-lg-1'>update</Button>
                    </Nav>
                </Container>
            </Container>
            <hr style={{margin: '0'}}/>
            <Container>
                <input className="form-control" type='file' onChange={e => handelCover(e)} placeholder='cover'/>
                <form onSubmit={handelSubmit}>
                    <div className='form-group m-lg-4 m-2 p-lg-1 pt-3'>
                        <input className='form-control' type='text' placeholder={`${username_global}`} name='username' onChange={e => setUsername(e.target.value) } />
                    </div>
                    <div className='form-group m-lg-4 m-2 p-lg-1 pt-3'>
                        <input className='form-control' type='email' placeholder={`${email_global}`} name='email' onChange={e => setEmail(e.target.value) } />
                    </div>
                    <div className='form-group m-lg-4 m-2 p-lg-1 pt-3'>
                        <input className='form-control' type='file' placeholder={`${username_global}`} name='image' onChange={e => setImage(e.target.files[0]) } />
                    </div>

                    <button onClick={e=> setTest(test+1)} type="submit" className='btn btn-outline-success btn-s px-4 mt-3'>Update</button>
                </form>
            </Container>


        </div>
    )
}


const mapStateToProps = state => ({
    username_global: state.profile.username,
    image_global: state.profile.image,
    email_global: state.profile.email,
    user_global: state.profile.user,
    pics_: state.pics.authorPics,
})

export default connect(mapStateToProps, { profile, profile_update, user_update }) (Profile);
