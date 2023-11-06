import { connect } from 'react-redux'
import { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaAngleDown } from 'react-icons/fa6';

const Side = ({post, name, author, ...props }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);
  const [timeAgo, setTimeAgo] = useState('');
  const [datePosted, setDatePosted] = useState('')

  useEffect(()=>{

    setDatePosted(post && post.date)
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
  },[datePosted, post])

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
  return ( 
      <>

          {post && 
            <div className='' id="menu">
              <h2 className='m-3'>{post.title}</h2>
              <h4 className='m-3'>{post.thumb_dimensions}</h4>
              {post.related_tags.map((tag) => (
                <li className="nav-item">                  
                  <Link to={`/tag/${tag.tag_slug}`}>
                    <span className="m-1 my-tag p-1">{tag.tag}</span>
                  </Link>
                </li>
              ))}
              <hr/>
                <div className='pb-2' onClick={e=> handelDropDown()} >
                  <a className='drop-list-title'>related pics <FaAngleDown style={{fontSize: '14px'}}/></a>
                </div>
                <div id="dropdown-related" style={{display: "block"}}>
                  {post.related_pics.map((post) => (
                    <Link className="" to={`/pic/${post.id}`}>
                      <img className='m-1' style={{width: "70px", height: "70px"}} src={post.thumb}/>
                    </Link>
                  ))}
                </div>
              <hr/>
              <div className='pb-2' onClick={e=> handelAuthorInfo()} >
                  <a className='drop-list-title'>author info <FaAngleDown style={{fontSize: '14px'}}/></a>
                </div>
                <div id="dropdown-author-info" style={{display: "block"}}>
                  <Row style={{textAlign: "end"}}>
                      <Col lg={8} sm={8} xs={7} style={{padding: "0px"}}>
                        <h5>{post.author_name}</h5>
                        <small>{timeAgo}</small>
                      </Col>
                      <Col lg={1} sm={1} xs={1} style={{display: ""}}>
                        <img style={{width: "50px", height: "50px", borderRadius: "1%"}} src={`${apiUrl}/${post.author_image}`} />
                      </Col>
                  </Row>
                </div>
              <hr/>
            </div>
          }
      </>

  );
}


export default Side
