import { toast } from 'react-toastify';
import { profile, profile_update, user_update } from '../redux/action/profile'
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/esm/Container';
import { connect } from 'react-redux'
import ProfileHead from "../component/ProfileHead";
import Loading from "../component/Loading";


const Profile = ({ profile, profile_update, user_update, username_g, image_g, email_g, setShow, setCoverPic, loading }) => {

    const [buttonDisabled, setButtonDisabled] = useState(false); // Add state for button disabled status
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [image, setImage] = useState()
    const [test, setTest] = useState(1)
    const acceptedFileArray = ['image/x-png', 'image/png', 'image/jpg', 'image/jpeg']
    const isImageFile = (file) => {
        return file && file.type.startsWith('image/');
    };

    const handelImage = (e) => {
        const file = e.target.files[0]
        if (file && isImageFile(file) && acceptedFileArray.includes(file.type)) {
            setImage(file)
        } else {
            document.getElementById('profileimage').value = null;
            toast('Invalid file type. Please select a valid image (png, x-png, jpg, jpeg', { type: "error" })
        }
    }


    const handelSubmit = (e) => {
      e.preventDefault();

      setButtonDisabled(true); // Disable the button when submitting
      const form_data = new FormData();
      if (image || username || email) {
        if (image) form_data.append('image', image);
        user_update(username || username_g, email || email_g);
        profile_update(form_data).then(() => {
          profile(); // Fetch updated profile data after successful update

          setButtonDisabled(false); // Disable the button when submitting
        });
      } else {
        toast('Please provide at least one field to update', { type: "error" });

        setButtonDisabled(false); // Disable the button when submitting
      }
    }


    return (
        <div className='mt-5'>
            {loading ? <Loading /> : <ProfileHead username={username_g} image={image_g} setShow={setShow} setCoverPic={setCoverPic} />}
            <Container>
                <form onSubmit={handelSubmit}>
                    <div className='form-group m-lg-4 m-2 p-lg-1 pt-3'>
                        <input className='form-control' type='text' placeholder={`${username_g}`} name='username' onChange={e => setUsername(e.target.value)} />
                    </div>
                    <div className='form-group m-lg-4 m-2 p-lg-1 pt-3'>
                        <input className='form-control' type='email' placeholder={`${email_g}`} name='email' onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className='form-group m-lg-4 m-2 p-lg-1 pt-3'>
                        <input id='profileimage' className='form-control' type='file' accept="image/*" placeholder='test' name='image' onChange={e => handelImage(e)} />
                    </div>

                    <button onClick={e => setTest(test + 1)} type="submit" className='btn btn-outline-success btn-s px-4 mt-3' disabled={buttonDisabled}>Update</button>
                </form>
            </Container>


        </div>
    )
}


const mapStateToProps = state => ({
    username_g: state.profile.username,
    image_g: state.profile.image,
    email_g: state.profile.email,
    user_global: state.profile.user,
    pics_: state.pics.authorPics,
    Loading: state.profile.loading
})

export default connect(mapStateToProps, { profile, profile_update, user_update })(Profile);
