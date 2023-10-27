import { useState } from "react"
import axios from 'axios';
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux"
import Container from "react-bootstrap/esm/Container";
// import {create} from '../redux/action'



const Create=({user_g})=>{
    const user = user_g
    const apiUrl = import.meta.env.VITE_API_URL;

    const [title, setTitle]=useState()
    const [body, setBody]=useState()
    const [image, setImage] = useState(null)
    const [tag, setTag] = useState()
    const [handleErr, setErr] = useState(null)
    const navigate = useNavigate()


    const handleSubmit=(e)=>{
        e.preventDefault();
        let form_data = new FormData();
        form_data.append('author', user);
        form_data.append('title', title);
        form_data.append('body', body);
        form_data.append('thumb', image);
        form_data.append('tag', tag);
        
        const config = {     
            headers: { 'content-type': 'multipart/form-data', 'X-CSRFToken': Cookies.get('csrftoken') }
        }
        axios.post(`${apiUrl}/api-create/`, form_data, config)
        .then(()=>{
            setErr(null);
            navigate('/')
        })
        .catch(err =>{
            setErr(err.message); 
        })
    }


    return (
        <Container>
            {handleErr && {handleErr}}
            <form className='p-3 mt-5' onSubmit={handleSubmit}>
                <div className="mb-5 p-3">
                    <input className="form-control" type='text' placeholder='title' onChange={e=>{setTitle(e.target.value)}}/>
                </div>
                <div className="mb-5 p-3">
                    <textarea className="form-control" placeholder='body' onChange={e=>{setBody(e.target.value)}}/>
                </div>
                <div className="mb-5 p-3">
                    <input type='file' className="form-control" accept="image/png, image/jpeg" onChange={e=>{setImage(e.target.files[0])}}/>
                </div>
                <div className="mb-5 p-3">
                    <input className="form-control" type='text' placeholder='tag' onChange={e=>{setTag(e.target.value)}} />
                </div>
                <input class="btn btn-outline-success btn-s px-4" type="submit" value="Post" />
            </form>
        </Container>
    )
}


const mapStateToProps = (state) => ({
    user_g: state.profile.user
})

export default connect(mapStateToProps, {}) (Create);