import { useState } from 'react';
import { useParams, Link } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Side = ({post, name, ...props }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);


    return (
      <>
        {post && 
          <div className='' id="menu">
            <h2 className='m-3'>{post.title}</h2>
            <h2 className='m-3'>{post.thumb_dimensions}</h2>
            {post.related_tags.map((tag) => (
              <Link to={`/tag/${tag.tag_slug}`}>
                <span class="m-1 my-tag p-1"># {tag.tag}</span>
              </Link>
            ))}
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
