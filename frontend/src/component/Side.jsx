import { connect } from 'react-redux'
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaAngleDown } from 'react-icons/fa6';
import {setAuthor} from '../redux/action/pics'
import { useNavigate } from 'react-router-dom';
import { FaBookmark, FaHeart } from "react-icons/fa6";
import { save, like } from '../redux/action/pics';

const Side = ({isAuthenticated, save, like, post, setAuthor, name, author, ...props }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);
  const [timeAgo, setTimeAgo] = useState('');
  const [datePosted, setDatePosted] = useState('')
  const navigate = useNavigate()
  const [saveToggle, setSaveToggle] = useState(1);

  const [isSaved, setIsSaved] = useState( post && post?.user_has_saved || false);

  const handelAuthorPage = (username_, image_) => {
    setAuthor(username_, image_)
  }
  
  useEffect(()=>{

    setDatePosted(post?.date);
    const timeDifference = new Date() - new Date(datePosted);
    
    
    // Define the time units for formatting
    const seconds = 1000;
    const minutes = seconds * 60;
    const hours = minutes * 60;
    const days = hours * 24;
    const years = days * 365;
    
    if (timeDifference < minutes) {
      setTimeAgo(Math.floor(timeDifference / seconds) + ' seconds ago');
    } else if (timeDifference < hours) {
      setTimeAgo(Math.floor(timeDifference / minutes) + ' minutes ago');
    } else if (timeDifference < days) {
      setTimeAgo(Math.floor(timeDifference / hours) + ' hours ago');
    } else if (timeDifference < years) {
      setTimeAgo(Math.floor(timeDifference / days) + ' days ago');
    } else {
      setTimeAgo(Math.floor(timeDifference / years) + ' years ago');
    }
  },[datePosted, post, save, saveToggle])

  const handelDropDown = () => {
      const related = document.getElementById("dropdown-related");
      if(related.style.display === "block"){
        related.style.display = "none";
      }else{
        related.style.display = "block";
      }
    }
    
  const handelAuthorInfo = () => {
    const authorInfo = document.getElementById("dropdown-author-info");
    if(authorInfo.style.display === "block"){
      authorInfo.style.display = "none";
    }else{
      authorInfo.style.display = "block";
    }
  }

  const handelActionBtn = () => {
    const authorInfo = document.getElementById("dropdown-action-btn");
    if(authorInfo.style.display === "block"){
      authorInfo.style.display = "none";
    }else{
      authorInfo.style.display = "block";
    }
  }

  const handelTags = () => {
    const authorInfo = document.getElementById("dropdown-tags");
    if(authorInfo.style.display === "block"){
      authorInfo.style.display = "none";
    }else{
      authorInfo.style.display = "block";
    }
  }

  let tagView = <></>
  const tags = post && post.related_tags
  const likes_count = post && post.like_count
  if(post && tags.length === 0){
      tagView= (<></>)
  }else{
      tagView = (
          <>
            {post &&
            <div>
                <hr/>
                <div className='pb-2 mx-3 mt-3' style={{textAlign: "left"}}>
                    <a className='drop-list-title' onClick={e=> handelTags()}>tags<FaAngleDown style={{fontSize: '14px'}}/></a>
                </div>
                <div id="dropdown-tags" style={{display: "block", paddingTop: "5px"}}>
                    {post.related_tags.map((tag) => (
                    <Link to={`/tag/${tag.tag_slug}`}>
                        <span className="m-1 my-tag p-1 px-3">{tag.tag}</span>
                    </Link>
                    ))}
                </div>
            </div>
            }
        </>
            )
  }

  let saveButton = <></>

  const handelSave = (e) => {
    save(e)
    setSaveToggle(saveToggle+1)
        setIsSaved((prev) => !prev); // Toggle the saved state

    const saveMark = document.getElementById("save-mark");
    console.log(saveMark.classList.value)
    if(saveMark.classList.contains("btn-i")){
      saveMark.classList.remove("btn-i")
      saveMark.classList.add("btn-i-click")
    }else{
      saveMark.classList.remove("btn-i-click")
      saveMark.classList.add("btn-i")
    }
  }
      
      if( post && post.user_has_saved === true){
        saveButton = <button className='btn btn-outline-success btn-i-click mx-2 m-3' onClick={e=>handelSave(post.id)} id="save-mark"><FaBookmark/></button>
      }else{
        saveButton = <button className='btn btn-outline-success btn-i mx-2 m-3' onClick={e=>handelSave(post.id)} id="save-mark"><FaBookmark/></button>
      }
  let likeButton = <></>
  const handelLike = (e) => {
    like(e)
    setSaveToggle(saveToggle+1)
        setIsSaved((prev) => !prev); // Toggle the saved state

    const saveMark = document.getElementById("like-mark");
    console.log(saveMark.classList.value)
    if(saveMark.classList.contains("btn-i")){
      saveMark.classList.remove("btn-i")
      saveMark.classList.add("btn-i-click")
    }else{
      saveMark.classList.remove("btn-i-click")
      saveMark.classList.add("btn-i")
    }
  }
      if(post && post.user_has_liked === true){
        likeButton = <button className='btn btn-outline-success btn-i-click mx-2 m-3' onClick={e=>handelLike(post.id)} id="like-mark"><FaHeart/><span className="m-1">{post && post.like_count}</span></button>
      }else{
        likeButton = <button className='btn btn-outline-success btn-i mx-2 m-3' onClick={e=>handelLike(post.id)} id="like-mark"><FaHeart/><span className="m-1">{post && post.like_count}</span></button>
      }

  return (
      <>

          {post && 
            <div className='' id="menu">
              <h2 className='m-3'>{post.title}</h2>
              <h4 className='m-3'>{post.image_dimensions}</h4>
              {tagView}
                
              <hr/>
                <div className='pb-2 mx-3 mt-3' style={{textAlign: "left"}}>
                  <a className='drop-list-title' onClick={e=> handelDropDown()}>related pics <FaAngleDown style={{fontSize: '14px'}}/></a>
                </div>
                <div id="dropdown-related" style={{display: "block"}}>
                  {post.related_pics.map((post) => (
                    <Link className="" to={`/pic/${post.id}`}>
                      <img className='m-1' style={{width: "70px", height: "70px"}} src={post.thumb}/>
                    </Link>
                  ))}
                </div>
              <hr style={{marginBottom: "0"}}/>
              {isAuthenticated?
                  <>
                    <div className='pb-2 mx-3 mt-3' style={{textAlign: "left"}}>
                      <a className='drop-list-title' onClick={e=> handelActionBtn()}>related pics <FaAngleDown style={{fontSize: '14px'}}/></a>
                    </div>
                    <div id="dropdown-action-btn" style={{display: "block"}}>
                        {saveButton}
                        {likeButton}
                    </div>
                      <hr style={{marginTop: "0px"}}/>
                  </>
                  :<></>
              }
              <div className='pb-2 mx-3 mt-3' style={{textAlign: "left"}}>
                <a className='drop-list-title' onClick={e=> handelAuthorInfo()} >author info <FaAngleDown style={{fontSize: '14px'}}/></a>
              </div>
              <div id="dropdown-author-info" style={{display: "block"}}>
                <Row style={{textAlign: "end"}}>
                    <Col lg={8} sm={8} xs={7} style={{padding: "0px"}}>
                      <Link to={`/userpics/${post.author_name}`}>
                        <h5 style={{color: "#00dba0"}}>{post.author_name}</h5>
                      </Link>
                      <small>{timeAgo}</small>
                    </Col>
                    <Col lg={1} sm={1} xs={1}>
                      <Link to={`/userpics/${post.author_name}`}>
                        <img onClick={e=>handelAuthorPage(post.author_name, post.author_image)} style={{width: "50px", height: "50px", borderRadius: "1%"}} src={`${apiUrl}/${post.author_image}`} />
                      </Link>
                    </Col>
                </Row>
              </div>
              <hr/>
              <Link to={post.image}>display image full screen</Link>
            </div>
          }
      </>

  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated 
})
export default connect(mapStateToProps, {setAuthor, save, like}) (Side)
