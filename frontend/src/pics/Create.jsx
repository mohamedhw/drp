import { useEffect, useState } from "react"
import axios from 'axios';
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux"
import Container from "react-bootstrap/esm/Container";
// import {create} from '../redux/action'
import {tags, tag_suggestion} from "../redux/action/pics"
import Form from 'react-bootstrap/Form';
import { IoIosCloseCircle } from "react-icons/io";
import Badge from 'react-bootstrap/Badge';


const Create=({user_g, tags_g, tags, tag_suggestion, tag_suggestions})=>{
    const user = user_g
    const apiUrl = import.meta.env.VITE_API_URL;

    const [title, setTitle]=useState()
    const [body, setBody]=useState()
    const [image, setImage] = useState(null)
    const [tag, setTag] = useState([])
    const [handleErr, setErr] = useState(null)
    const navigate = useNavigate()
    const tagList = tags_g && tags_g.map((item) => (item.tag))
    const [suggestions, setSuggestions] = useState();
    const [qs, setQs] = useState([])




    useEffect(()=>{
        tag_suggestion(qs)
        
    }, [qs])


    // const handleSuggestionClick = (tag) => {
    //     setTag(tag);
    //     setSuggestions([]); // Clear suggestions
    // };
    //
    // const handleInputChange = () => {
    //     for(let tag_ of tagList){
    //         // console.log("lower", tag_.toLowerCase())
    //         // console.log("tag", tag && tag_.startsWith("l"))
    //         if(tag && tag_.toLowerCase().startsWith(tag.toLowerCase())){
    //             // const listItem = document.getElementById() 
    //             console.log("tag", tag_)
    //         };
    //     }
    // };
    const handleSubmit=(e)=>{
        e.preventDefault();
        let form_data = new FormData();
        form_data.append('author', user);
        form_data.append('title', title);
        form_data.append('body', body);
        form_data.append('image', image);
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
      // const handleInputChange = (e) => {
      //   const inputValue = e.target.value;
      //
      //   // Check if the input contains a space
      //   if (inputValue.includes(' ')) {
      //     // Reset suggestions when a space is detected
      //     
      //       // Find the index of the first space
      //       const spaceIndex = inputValue.indexOf(' ');
      //
      //       // Extract the portion after the space (if any)
      //       const valueAfterSpace = spaceIndex !== -1 ? inputValue.substring(spaceIndex + 1) : inputValue;
      //       setQs(valueAfterSpace);
      //   } else {
      //     setQs(inputValue);
      //   }
      //
      // };
    const removeTags = (e) => {
        setTag(tag.filter((_,index) => index != e))
    }

    const addTag = (e) => {
        setQs(e.target.value)
      if (e.key === "Enter" && e.target.value != "") {
        setTag([...tag, e.target.value]);
        e.target.value = "";
      }
    };

    console.log(tag)
    return (
        <Container>
            {handleErr && {handleErr}}
            <Form className='mt-5' onSubmit={handleSubmit} >
                <Form.Group className="mb-5">
                    <input className="form-control" type='text' placeholder='title' onChange={e=>{setTitle(e.target.value)}}/>
                </Form.Group>
                <Form.Group className="mb-5">
                    <textarea className="form-control" placeholder='body' onChange={e=>{setBody(e.target.value)}}/>
                </Form.Group>
                <Form.Group className="mb-5">
                    <input type='file' className="form-control" accept="image/png, image/jpeg" onChange={e=>{setImage(e.target.files[0])}}/>
                </Form.Group>
                <Form.Group className="mb-5 p-1 tags-input form-control">
                    <ul>
                        {tag && tag.map((tag_, index) => (
                            <li key={index}>
                                <Badge pill bg="success" className="tag-bg">
                                    {tag_}
                                    <IoIosCloseCircle onClick={() => removeTags(index)} className="close-ic" />
                                </Badge>
                            </li>
                        ))}
                    </ul>
                    <input data-role="tagsinput" className="form-control" list="tag-list" type='text' placeholder='tag' onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }} onKeyUp={addTag} />
                    {tag_suggestions && 
                        <datalist id="tag-list" className="mt-5 m-3">
                            {tag_suggestions.map((item) => (
                                <option key={item.tag_slug} value={item.tag}>
                                </option>
                            ))}
                        </datalist>
                    }
                </Form.Group>

                <input class="btn btn-outline-success btn-s px-4" type="submit" value="Post" />
                
            </Form>
        </Container>
    )
}


const mapStateToProps = (state) => ({
    user_g: state.profile.user,
    tags_g: state.pics.tags,
    tag_suggestions: state.pics.tag_suggestion.results
})

export default connect(mapStateToProps, {tags, tag_suggestion}) (Create);
