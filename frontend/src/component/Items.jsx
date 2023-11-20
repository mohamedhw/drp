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
                <Col key={post.id} xs={12} md={6} lg={3} xl={3} xxl={3} className='p-1 pic-t'>
                    <Link  to={`/pic/${post.id}`} className='article-2' onClick={e => handelClick()}>
                        <Card className='pic-l' style={{width: "300px", hight: "200px"}}>
                            <Card.Img variant="top" src={post.thumb} style={{overflow: "hidden"}}/>
                        </Card>
                    </Link>
                </Col>
            
            ))}
        </Row>
    )
}

export default Items
