import { connect } from 'react-redux'
import { useEffect } from 'react';
import { topPics } from '../redux/action/pics'
import Pagination from '../component/Pagination';
import Items from '../component/Items';
import { useNavigate, useLocation } from "react-router-dom"
import { setPage } from '../redux/action/pages';

const TopPics = ({ pics_g, topPics, currentPage, count, next, previous }) => {
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
                ? `${apiUrl}/api-top-pics/?page=${currentPage}`
                : `${apiUrl}/api-top-pics/`;
            navigate(`/top/?page=${currentPage}`);
        } else if (currentPage === null & page > 1) {
            url = `${apiUrl}/api-top-pics/?page=${page}`;
            navigate(`/top/?page=${page}`);
        } else {
            url = `${apiUrl}/api-top-pics/`;
        }

        topPics(url);
    }, [currentPage, page]);

    return (

        <div style={{ margin: "0 8%" }}>
            <h1 style={{ float: "left", color: "#00bda0" }} className="mb-5">Top Pics</h1>
            {pics_g &&
                <>
                    <Items pics_g={pics_g} />
                    <Pagination page={page} count={count} currentPage={currentPage} next={next} previous={previous} />
                </>
            }
        </div>
    )
}


const mapStateToProps = state => ({
    pics_g: state.pics.top.results,
    currentPage: state.pages.currentPage,
    count: state.pics.top.count,
    next: state.pics.top.next,
    previous: state.pics.top.previous,
})
export default connect(mapStateToProps, { topPics, setPage })(TopPics)
