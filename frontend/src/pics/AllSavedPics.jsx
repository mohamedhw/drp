import { connect } from 'react-redux'
import { useState, useEffect } from 'react';
import { authorPics } from "../redux/action/pics"
import Container from 'react-bootstrap/Container';
import { useParams } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom"

const AllSavedPics = ({ username_g, image_g, setCurrentPage, currentPage, pics, pics_, next, previous }) => {
    const apiUrl = import.meta.env.VITE_API_URL;

    const [items, setItems] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const fetchMoreData = () => {

        setTimeout(() => {
            const nextPage = page + 1;

            fetch(`${apiUrl}/api-saved-pics/?page=${page}`)
                .then(response => response.json())
                .then(newData => {
                    setItems([...items, ...newData.results]);
                    setPage(nextPage);
                    setHasMore(newData.next !== null);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    setHasMore(false);
                });
        }, 1500);
    };
    useEffect(() => {
        fetchMoreData();
    }, [])

    return (

        <div style={{ margin: "auto", width: "100%", textAlign: "center" }}>
            <InfiniteScroll
                dataLength={items.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<p className="mt-5 loading-more-result">Loading...</p>}
                endMessage={<p className="mt-5 loading-more-result">No more items</p>}
            >
                <Row style={{ margin: "auto", width: "100%", justifyContent: "center" }}>
                    {items.map((item) => (
                        <Col key={item.id} xs={12} sm={5} md={5} lg={3} xl={3} xxl={2} className='mt-4 mt-sm-4 mx-sm-2 mt-md-3 mx-md-1 mt-lg-4 mx-lg-3 p-lg-1'>

                            <Link to={`/pic/${item.id}`} className='article-2' onClick={() => handelClick()}>
                                <Card className='pic-l' style={{ minWidth: "200px", minHight: "100px", maxHeight: "300px", maxWidth: "500px" }}>
                                    <Card.Img className="lazyload" variant="top" src={item.thumb} style={{ overflow: "hidden" }} loading='lazy' />
                                </Card>
                            </Link>
                        </Col>

                    ))}
                </Row>
            </InfiniteScroll>
        </div>
    )
}


const mapStateToProps = state => ({
    username_g: state.profile.username,
    image_g: state.profile.image,
    pics_: state.pics.savedPics,
    pics: state.pics.savedPics.results,
    currentPage: state.pages.currentPage,
    next: state.pics.authorPics.next,
    previous: state.pics.authorPics.previous,
})
export default connect(mapStateToProps, { authorPics })(AllSavedPics)
