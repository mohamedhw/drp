import { profile, profile_update, user_update } from '../redux/action/profile'
import { useState, useEffect } from 'react';
import { connect } from 'react-redux'



const Profile = ({ profile, profile_update, user_update, username_global, image_global}) => {

    const [username, setUsername] = useState(username_global)
    const [image, setImage] = useState()
    
    useEffect(() => {
        profile()
    }, [image, username]);

    const handelSubmit = (e) => {
        e.preventDefault();
        let form_data = new FormData();
        form_data.append('image', image);
        profile_update(form_data)
        user_update(username)
    }
    return (
        <div>
            <div className="continer">
                <img style={{width: "30%"}} src={`${image_global}`} alt='Profile Image' />
                <h1>{username_global}</h1>
            </div>
            <div>
                <form onSubmit={handelSubmit}>
                    <div className='form-group m-3'>
                        <label className='control-label'>Username: </label>
                        <input className='form-control' type='text' placeholder={`${username_global}`} name='username' onChange={e => setUsername(e.target.value) } />
                    </div>
                    <div className='form-group m-3'>
                        <label className='control-label'>Image: </label>
                        <input className='form-control' type='file' placeholder={`${username_global}`} name='image' onChange={e => setImage(e.target.files[0]) } />
                    </div>

                    <button type="submit" className='btn btn-primary mt-3'>Update</button>
                </form>
            </div>

        </div>
    )
}


const mapStateToProps = state => ({
    username_global: state.profile.username,
    image_global: state.profile.image
})

export default connect(mapStateToProps, { profile, profile_update, user_update }) (Profile);