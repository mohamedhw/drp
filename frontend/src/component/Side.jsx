import { connect } from 'react-redux'
import { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
    console.log(timeDifference)
    console.log(timeAgo)

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

    return ( 
      <>
        {post && 
          <div className='' id="menu">
            <h2 className='m-3'>{post.title}</h2>
            <h4 className='m-3'>{post.thumb_dimensions}</h4>
            {post.related_tags.map((tag) => (
              <Link to={`/tag/${tag.tag_slug}`}>
                <span className="m-1 my-tag p-1">{tag.tag}</span>
              </Link>
            ))}
            <hr/>
            <div className='my-3'>
              {post.related_pics.map((post) => (
                <Link to={`/pic/${post.id}`}>
                  <img className='m-1' style={{width: "70px", height: "70px"}} src={post.thumb}/>
                </Link>
              ))}
            </div>
            <hr/>
            <Row>
              <Col lg={7}>
                <h5>{post.author_name}</h5>
                <small>{timeAgo}</small>
              </Col>
              <Col lg={1}>
                <img style={{width: "50px", height: "50px", borderRadius: "50%"}} src={`${apiUrl}/${post.author_image}`} />
              </Col>
            </Row>
            <hr/>
          </div>
        }
      </>
      // <>
      //     <Button variant="primary" onClick={toggleShow} className="me-2">
      //       {name}
      //     </Button>
      //     <Offcanvas show={show} onHide={handleClose} {...props}>
      //       <Offcanvas.Header closeButton>
      //         <Offcanvas.Title>Offcanvas</Offcanvas.Title>
      //       </Offcanvas.Header>
      //       <Offcanvas.Body>
      //          {post && 
      //            <div className='' id="menu">
      //              {post.related_tags.map((tag) => (
      //                <Link to={`/tag/${tag.tag_slug}`}>
      //                  <span class="m-1 my-tag p-1"># {tag.tag}</span>
      //                </Link>
      //              ))}
      //            </div>
      //          }
      //       </Offcanvas.Body>
      //     </Offcanvas>
      // </>
  );
}


export default Side
