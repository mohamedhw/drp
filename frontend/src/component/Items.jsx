import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom"
import { connect } from 'react-redux'


const Items = ({loading, pics_g, setShow, setZoom_}) => {

    const handelClick = () => {
        if (setShow){
            setZoom_("showcase-norm")
            setShow(false)
        }
    }

    if (loading) {
        return <>Loading...</>;
    }

    return (
        <div style={{margin: "auto"}}>
            <Row style={{margin: "auto", width: "100%"}}>
                {pics_g.map((post) => (
                    <Col key={post.id} xs={12} sm={5} md={5} lg={3} xl={3} xxl={3} className='p-0 mt-3 mx-sm-3 mx-md-4 mx-0 mt-lg-2 mx-lg-0 p-lg-1'>

                        <Link  to={`/pic/${post.id}`} className='article-2' onClick={e => handelClick()}>
                            <Card className='pic-l' style={{minWidth: "200px", minHight: "100px", maxHeight: "300px", maxWidth: "500px"}}>
                                <Card.Img variant="top" src={post.thumb} style={{overflow: "hidden"}}/>
                            </Card>
                        </Link>
                    </Col>
                
                ))}
            </Row>
        </div>
    )
}



const mapStateToProps = state => ({
    loading: state.pics.loading
})

export default connect(mapStateToProps, {}) (Items)
