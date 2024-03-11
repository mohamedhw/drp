import { connect } from 'react-redux'
import { useEffect } from 'react';
import { pics } from '../redux/action/pics'
import Pagination from '../component/Pagination';
import Items from '../component/Items';
import {useNavigate, useLocation} from "react-router-dom"
import { setPage, setCurrentPage } from '../redux/action/pages';
import FilterBar from '../component/FilterBar';

const Home = ({ pics_g, pics, setCurrentPage, currentPage, count, next, previous }) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate()
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get('page') || 1; // Default to page 1 if 'page' query parameter is not provided
    const isPageProvided = Boolean(page);



    let url = ``
    useEffect(() => {
        // setCurrentPage(page)
        if (currentPage != null) {
            url = isPageProvided
                ? `${apiUrl}/api-post/?page=${currentPage}`
                : `${apiUrl}/api-post/`;
            navigate(`/?page=${currentPage}`);
        } else if (currentPage === null & page > 1) {
            url = `${apiUrl}/api-post/?page=${page}`;
            navigate(`/?page=${page}`);
        } else {
            navigate(`/`);
            url = `${apiUrl}/api-post/`;
        }

        pics(url);
    }, [currentPage, page]);

    return (
        <div style={{ margin: "0 8%" }}>
            <FilterBar />
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
    pics_g: state.pics.pics.results,
    currentPage: state.pages.currentPage,
    count: state.pics.pics.count,
    next: state.pics.pics.next,
    previous: state.pics.pics.previous,
})

export default connect(mapStateToProps, { pics, setPage, setCurrentPage })(Home)
