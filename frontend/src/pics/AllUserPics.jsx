import { connect } from 'react-redux'
import { useState, useEffect } from 'react';
import { authorpics } from "../redux/action/pics"
import { useParams } from "react-router-dom"
import InfiniteScroll from 'react-infinite-scroll-component';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom"

const AllUserPics = ({ currentPage }) => {
    const apiUrl = import.meta.env.VITE_API_URL;

    const { username } = useParams();
    const [items, setItems] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const fetchMoreData = () => {
        setTimeout(() => {
            const nextPage = page + 1;
            fetch(`${apiUrl}/api-user-posts/${username}/?page=${page}`)
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
        }, 100);
    };
    useEffect(() => {
        fetchMoreData();
    }, [currentPage])

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

                            <Link to={`/pic/${item.id}`} className='article-2' onClick={e => handelClick()}>
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
    author_username: state.pics.authorName,
    pics_: state.pics.authorPics,
    author_image: state.pics.authorImage,
    pics: state.pics.authorPics.results,
    currentPage: state.pages.currentPage,
    next: state.pics.authorPics.next,
    previous: state.pics.authorPics.previous,
})
export default connect(mapStateToProps, { authorpics })(AllUserPics)
