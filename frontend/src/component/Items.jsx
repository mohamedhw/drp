import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom"


const Items = ({pics_g, setShow}) => {
    const handelClick = () => {
        if (setShow){
            setShow(false)
        }
    }
    return (
        <Row>
            {pics_g.map((post) => (
                <Col xs={12} md={6} lg={3} xl={3} xxl={3} className='p-1 pic-t'>
                    <Link to={`/pic/${post.id}`} className='article-2' onClick={e => handelClick()}>
                        <Card className='pic-l' key={post.id} style={{height: "100%"}}>
                            <Card.Img variant="top" src={post.thumb} style={{height: "100% !important"}}/>
                        </Card>
                    </Link>
                </Col>

                // <div class="col-sm-12 col-md-12 col-lg-6 col-xl-4 p-4">
                //     <a class="article-2" href="{{instance.get_absolute_url}}">
                //     <image class="" src="{{instance.thumb.url}}"  style="max-width:100% ; max-height:300px ;min-width:100%; min-height:100%; width:100%; height:100%"></image>
                //     </a>
                // </div>
            
            ))}
        </Row>
    )
}

export default Items