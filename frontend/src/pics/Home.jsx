import { connect } from 'react-redux'
import { Link } from "react-router-dom"
import { useState, useEffect } from 'react';
import { pics, topPics, randomPics } from '../redux/action/pics'
import Container from 'react-bootstrap/Container';
import FilterBar from '../component/FilterBar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

const Home = ({ pics, topPics, randomPics, pics_g, random_g, top_g }) => {
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        pics(`${apiUrl}/api-post/?page=1`);
        topPics(`${apiUrl}/api-top-pics/?page=1`);
        randomPics(`${apiUrl}/api-random-pics/?page=1`);
    }, []);

    const pics_top = top_g && top_g.slice(0, 4);
    const pics_lates = pics_g && pics_g.slice(0, 4);
    const pics_random = random_g && random_g.slice(0, 4);


    return (
        <>
            <FilterBar />
            {/* {loading? <h1>Loading...</h1>: <></>} */}
            <Container>
                <>
                    <Row className='p-4'>
                        {pics_top &&
                            pics_top.map((post) => (
                                <Col key={post.id} xs={12} sm={5} md={5} lg={3} xl={3} xxl={3} className='p-3 mt-3 mx-sm-3 mx-md-4 mx-0 mt-lg-2 mx-lg-0 p-lg-1'>
                                    <Link to={`/pic/${post.id}`} className='article-2' onClick={e => handelClick()}>
                                        <Card className='pic-l' style={{ minWidth: "200px", minHight: "100px", maxHeight: "300px", maxWidth: "500px" }}>
                                            <Card.Img variant="top" src={post.thumb} style={{ overflow: "hidden" }} loading='lazy' />
                                        </Card>
                                    </Link>
                                </Col>
                            ))
                        }
                        <hr />
                        {pics_lates &&
                            pics_lates.map((post) => (
                                <Col key={post.id} xs={12} sm={5} md={5} lg={3} xl={3} xxl={3} className='p-0 mt-3 mx-sm-3 mx-md-4 mx-0 mt-lg-5 mx-lg-0 p-lg-1'>
                                    <Link to={`/pic/${post.id}`} className='article-2' onClick={e => handelClick()}>
                                        <Card className='pic-l' style={{ minWidth: "200px", minHight: "100px", maxHeight: "300px", maxWidth: "500px" }}>
                                            <Card.Img variant="top" src={post.thumb} style={{ overflow: "hidden" }} loading='lazy' />
                                        </Card>
                                    </Link>
                                </Col>
                            ))
                        }
                        <hr />
                        {pics_random &&
                            pics_random.map((post) => (
                                <Col key={post.id} xs={12} sm={5} md={5} lg={3} xl={3} xxl={3} className='p-0 mt-3 mx-sm-3 mx-md-4 mx-0 mt-lg-5 mx-lg-0 p-lg-1'>
                                    <Link to={`/pic/${post.id}`} className='article-2' onClick={e => handelClick()}>
                                        <Card className='pic-l' style={{ minWidth: "200px", minHight: "100px", maxHeight: "300px", maxWidth: "500px" }}>
                                            <Card.Img variant="top" src={post.thumb} style={{ overflow: "hidden" }} loading='lazy' />
                                        </Card>
                                    </Link>
                                </Col>
                            ))
                        }
                    </Row>
                </>
            </Container>
        </>
    )
}


const mapStateToProps = state => ({
    pics_g: state.pics.pics.results,
    top_g: state.pics.top.results,
    random_g: state.pics.random.results
})
export default connect(mapStateToProps, { pics, topPics, randomPics })(Home)
