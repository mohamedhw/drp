import { connect } from 'react-redux';
import { useEffect } from 'react';
import { pics } from '../redux/action/pics'
import Pagination from '../component/Pagination';
import Items from '../component/Items';
import Loading from '../component/Loading';
import { useNavigate, useLocation } from 'react-router-dom';
import { setPage } from '../redux/action/pages';

const LatestPics = ({ pics_g, loading, pics, currentPage, count, next, previous }) => {
    const navigate = useNavigate()
    const apiUrl = import.meta.env.VITE_API_URL;

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get('page') || 1; // Default to page 1 if 'page' query parameter is not provided
    const isPageProvided = Boolean(page);



    let url = ``
    useEffect(() => {
        if (currentPage != null) {
            url = isPageProvided
                ? `${apiUrl}/api-post/?page=${currentPage}`
                : `${apiUrl}/api-post/`;
            navigate(`/latest/?page=${currentPage}`);
        } else if (currentPage === null & page > 1) {
            url = `${apiUrl}/api-post/?page=${page}`;
            navigate(`/latest/?page=${page}`);
        } else {
            url = `${apiUrl}/api-post/`;
        }

        pics(url);
    }, [currentPage, page]);

    if (loading) {
      return <div className='loading-s'><Loading /></div>;
    }
    return (
        <div style={{ margin: "0 8%" }}>
            <h1 style={{ float: "left", color: "#00bda0" }} className="mb-5">Latest Pics</h1>
            {pics_g &&
                <>
                    <Items pics_g={pics_g} loading={loading} />
                    <Pagination page={page} loading={loading} count={count} currentPage={currentPage} next={next} previous={previous} />
                </>
            }
        </div>
    )
}


const mapStateToProps = state => ({
    pics_g: state.pics.pics.results,
    loading: state.pics.pics_loading,
    currentPage: state.pages.currentPage,
    count: state.pics.pics.count,
    next: state.pics.pics.next,
    previous: state.pics.pics.previous,
})
export default connect(mapStateToProps, { pics, setPage })(LatestPics)
