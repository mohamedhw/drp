import { connect } from 'react-redux'
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Fa500Px, FaAngleDown } from 'react-icons/fa6';
import { setAuthor } from '../redux/action/pics'
import { useNavigate } from 'react-router-dom';
import { FaBookmark, FaHeart } from "react-icons/fa6";
import { save, like, delete_pic } from '../redux/action/pics';
import { RiDeleteBin7Line } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";


const Side = ({ setShowCroper, isAuthenticated, user_g, setShowDelete, save, like, post, setAuthor, name, author, ...props }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);
  const [timeAgo, setTimeAgo] = useState('');
  const [datePosted, setDatePosted] = useState('')
  const navigate = useNavigate()
  const [saveToggle, setSaveToggle] = useState(1);

  const handleShow = () => setShowDelete(true);
  const [isSaved, setIsSaved] = useState(post && post?.user_has_saved || false);

  const handelAuthorPage = (username_, image_) => {
    setAuthor(username_, image_)
  }

  useEffect(() => {

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
  }, [datePosted, post, save, saveToggle])

  const handelDropDown = () => {
    const related = document.getElementById("dropdown-related");
    if (related.style.display === "block") {
      related.style.display = "none";
    } else {
      related.style.display = "block";
    }
  }

  const handelAuthorInfo = () => {
    const authorInfo = document.getElementById("dropdown-author-info");
    if (authorInfo.style.display === "block") {
      authorInfo.style.display = "none";
    } else {
      authorInfo.style.display = "block";
    }
  }

  const handelActionBtn = () => {
    const authorInfo = document.getElementById("dropdown-action-btn");
    if (authorInfo.style.display === "block") {
      authorInfo.style.display = "none";
    } else {
      authorInfo.style.display = "block";
    }
  }

  const handelTags = () => {
    const authorInfo = document.getElementById("dropdown-tags");
    if (authorInfo.style.display === "block") {
      authorInfo.style.display = "none";
    } else {
      authorInfo.style.display = "block";
    }
  }


  let tagView = <></>
  const tags = post && post.related_tags
  const likes_count = post && post.like_count
  if (post && tags.length === 0) {
    tagView = (<></>)
  } else {
    tagView = (
      <>
        {post &&
          <div>
            <hr />
            <div className='pb-2 mx-3 mt-3' style={{ textAlign: "left" }}>
              <a className='drop-list-title' onClick={e => handelTags()}>tags<FaAngleDown style={{ fontSize: '14px' }} /></a>
            </div>
            <div id="dropdown-tags" style={{ display: "block", paddingTop: "5px" }}>
              {post.related_tags.map((tag) => (
                <Link to={`/tag/${tag.tag_slug}`} className='side-tag-link'>
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
    setSaveToggle(saveToggle + 1)
    setIsSaved((prev) => !prev); // Toggle the saved state

    const saveMark = document.getElementById("save-mark");
    console.log(saveMark.classList.value)
    if (saveMark.classList.contains("btn-i")) {
      saveMark.classList.remove("btn-i")
      saveMark.classList.add("btn-save-click")
    } else {
      saveMark.classList.remove("btn-save-click")
      saveMark.classList.add("btn-i")
    }
  }

  if (post && post.user_has_saved === true) {
    saveButton = <button className='btn btn-outline-success btn-save-click mx-2 m-2' onClick={e => handelSave(post.id)} id="save-mark"><FaBookmark /></button>
  } else {
    saveButton = <button className='btn btn-outline-success btn-i mx-2 m-2' onClick={e => handelSave(post.id)} id="save-mark"><FaBookmark /></button>
  }
  let likeButton = <></>
  const [likeCount, setLikeCount] = useState(post && post.like_count)
  const handelLike = (e) => {
    like(e)
    setSaveToggle(saveToggle + 1)
    setIsSaved((prev) => !prev); // Toggle the saved state

    const likeMark = document.getElementById("like-mark");
    if (likeMark.classList.contains("btn-i")) {
      setLikeCount(likeCount + 1)
      likeMark.classList.remove("btn-i")
      likeMark.classList.add("btn-i-click")
    } else {
      setLikeCount(likeCount - 1)
      likeMark.classList.remove("btn-i-click")
      likeMark.classList.add("btn-i")
    }
  }
  if (post && post.user_has_liked === true) {
    likeButton = <button className='btn btn-outline-success btn-i-click mx-2 m-2' onClick={e => handelLike(post.id)} id="like-mark"><FaHeart /></button>
  } else {
    likeButton = <button className='btn btn-outline-success btn-i mx-2 m-2' onClick={e => handelLike(post.id)} id="like-mark"><FaHeart /></button>
  }

  return (
    <>

      {post &&
        <div className='' id="menu">

          <h4 className='m-3'>{post.get_width}X{post.get_height}</h4>
          {tagView}

          <hr />
          <div className='pb-2 mx-3 mt-3' style={{ textAlign: "left" }}>
            <a className='drop-list-title' onClick={e => handelDropDown()}>related <FaAngleDown style={{ fontSize: '14px' }} /></a>
          </div>
          <div id="dropdown-related" style={{ display: "block" }}>
            {post.related_pics.map((post) => (
              <Link to={`/pic/${post.id}`}>
                <img className='m-1' style={{ width: "70px", height: "70px" }} src={post.thumb} />
              </Link>
            ))}
          </div>
          <hr style={{ marginBottom: "0" }} />
          {isAuthenticated ?
            <>
              <div className='pb-2 mx-3 mt-3' style={{ textAlign: "left" }}>
                <a className='drop-list-title' onClick={e => handelActionBtn()}>Actions<FaAngleDown style={{ fontSize: '14px' }} /></a>
              </div>
              <div id="dropdown-action-btn" style={{ display: "block" }}>
                {post.author == user_g &&
                  <Button className='btn btn-outline-danger m-2 btn-d' onClick={handleShow}><RiDeleteBin7Line style={{ fontsize: "30px" }} /></Button>
                }
                {saveButton}
                {likeButton}
              </div>
              <hr style={{ marginTop: "0px" }} />
            </>
            : <></>
          }
          <div className='pb-2 mx-3 mt-3' style={{ textAlign: "left" }}>
            <a className='drop-list-title' onClick={e => handelAuthorInfo()} >Info <FaAngleDown style={{ fontSize: '14px' }} /></a>
          </div>
          <div id="dropdown-author-info" style={{ display: "block" }}>
            <ul className='profile-info px-4 py-1' style={{ listStyleType: "none", padding: "0" }}>
              <li style={{ display: "flex", alignItems: "center" }}>
                author:
                <Row style={{ textAlign: "end", alignItems: "center", flex: "1", marginRight: "15px" }}>
                  <Col lg={8} sm={8} xs={7} style={{ padding: "0px" }}>
                    <Link to={`/userpics/${post.author_name}`}>
                      <h6 style={{ color: "rgb(210 144 144)", marginBottom: "0px" }}>{post.author_name}</h6>
                    </Link>
                    <small style={{ color: "#fff" }}>{timeAgo}</small>
                  </Col>
                  <Col lg={0.5} sm={1} xs={1}>
                    <Link to={`/userpics/${post.author_name}`}>
                      <img onClick={e => handelAuthorPage(post.author_name, post.author_image)} style={{ width: "45px", height: "45px", borderRadius: "1%" }} src={`${apiUrl}${post.author_image}`} />
                    </Link>
                  </Col>
                </Row>

              </li>
              <li style={{ display: "inline-block", marginRight: "10px" }} className='mt-3'>size:  <span className="px-4" style={{ color: "#fff" }}>{post.image_size} M</span></li>
              {/* <li style={{ display: "inline-block", marginRight: "10px" }} className='mt-3'>views:  <span className="px-4" style={{ color: "#fff" }}>{post.views_count}</span></li> */}
              <li style={{ display: "inline-block", marginRight: "10px" }} className='mt-3'>favorite:  <span className="px-4" style={{ color: "#fff" }}>{post.like_count}</span></li>
            </ul>
          </div>
          <hr />
          <a className='m-5' href={post.image} target="_blank"><h6 className='colored-t'>display image full screen</h6></a>
          {/* <h6 onClick={() => setShowCroper(true)}>crop the image</h6> */}
        </div>
      }
    </>

  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user_g: state.profile.user,
})

export default connect(mapStateToProps, { setAuthor, save, like })(Side)
