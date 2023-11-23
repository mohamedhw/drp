import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom"


const SliceItems = ({pics_g, setShow}) => {
    const handelClick = () => {
        if (setShow){
            setShow(false)
        }
    }
    return (
        <div style={{maxWidth: "1000px", margin: "auto"}}>
            <Row style={{padding: "0px", margin: "auto"}}>
                {pics_g.map((post) => (
                    <Col key={post.id} xs={12} sm={5} md={5} lg={3} xl={3} xxl={3} style={{margin: "auto"}} className='p-0 mt-3 mx-3.5 mt-lg-2 mx-lg-0 p-lg-1 pic-t'>
                        <Link  to={`/pic/${post.id}`} className='article-2' onClick={e => handelClick()}>
                            <Card className='pic-l' style={{minWidth: "200px", minHight: "100px", maxHeight: "200px", maxWidth: "350px", margin: "auto"}}>
                                <Card.Img variant="top" className="" src={post.thumb} style={{overflow: "hidden", minHeight: ""}}/>
                            </Card>
                        </Link>
                    </Col>
                
                ))}
            </Row>
        </div>
    )
}

export default SliceItems
