import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom"
import { connect } from 'react-redux'
import Loading from '../component/Loading'

const Items = ({ loading, pics_g, setShow, setZoom_ }) => {

    const handelClick = () => {
        if (setShow) {
            setZoom_("showcase-norm")
            setShow(false)
        }
    }


    return (
        <div style={{ margin: "auto", width: "100%", textAlign: "center" }}>
            <Row style={{ margin: "auto", width: "100%", justifyContent: "center" }}>
                {pics_g.map((post) => (
                    <Col key={post.id} xs={12} sm={5} md={5} lg={3} xl={3} xxl={2} className='mt-4 mt-sm-4 mx-sm-2 mt-md-3 mx-md-1 mt-lg-4 mx-lg-3 p-lg-1'>

                        <Link to={`/pic/${post.id}`} className='article-2' onClick={e => handelClick()}>
                            <Card className='pic-l' style={{ minWidth: "200px", minHight: "100px", maxHeight: "300px", maxWidth: "500px" }}>
                                  { loading ? <Loading />:
                                    <>
                                      <Card.Img className="lazyload" variant="top" src={post.thumb} style={{ overflow: "hidden" }} loading='lazy' />
                                      <div className="thumb-info">
                                          <span className="">{post.get_width} X {post.get_height}</span>
                                      </div>
                                    </>
                                  }
                            </Card>
                        </Link>
                    </Col>

                ))}
            </Row>
        </div>
    )
}



const mapStateToProps = state => ({
    loading: state.pics.pics_loading
})

export default connect(mapStateToProps, {})(Items)
