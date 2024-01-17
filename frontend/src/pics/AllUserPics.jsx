import {connect} from 'react-redux'
import { useState, useEffect } from 'react';
import {authorpics} from "../redux/action/pics"
import Container from 'react-bootstrap/Container';
import Pagination from '../component/Pagination';
import Items from '../component/Items';
import { useParams } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import { setPage, setCurrentPage } from '../redux/action/pages'; // Import your new actions
import InfiniteScroll from 'react-infinite-scroll-component';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom"

const AllUserPics = ({pics, authorpics, setCurrentPage, currentPage, pics_, next, previous}) => {
    const navigate = useNavigate()
    const apiUrl = import.meta.env.VITE_API_URL;
    const [loading, setLoading] = useState(true)

    const { username, s } = useParams();
    const isPageProvided = Boolean(s);
    let url = ``
    const [userpics, setUserPics] = useState()
    const [items, setItems] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const fetchMoreData = () => {

        setTimeout(() => {
            const nextPage = page + 1;
            // Adjust the API endpoint to include the page parameter
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

    return(
        <Container className='my-5'>
            <InfiniteScroll
                className="my-5"
                dataLength={items.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<h4 className="my-5">Loading...</h4>}
                endMessage={<p className='mt-lg-5 no-result'>No more pics</p>}
                scrollThreshold={0.9}
            >
            <Row style={{ maxWidth: '1308px', minHeight: "700px"}}>
                {items.map((item, index) => (
                    // <div key={index}>{/* Render your image component here */}</div>
                    <Col key={item.id} xs={12} md={6} lg={3} xl={3} xxl={3} className='pic-t mt-3'>
                        <Link  to={`/pic/${item.id}`} className='article-2' onClick={e => handelClick()}>
                            <Card className='pic-l' style={{height: "100%"}}>
                                <Card.Img variant="top" src={item.thumb} style={{height: "100% !important"}}/>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
            </InfiniteScroll>

        </Container>
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
export default connect(mapStateToProps, {authorpics}) (AllUserPics)
