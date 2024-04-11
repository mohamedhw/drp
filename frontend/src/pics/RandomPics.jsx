import { connect } from 'react-redux'
import { useEffect } from 'react';
import { randomPics } from '../redux/action/pics'
import Pagination from '../component/Pagination';
import Items from '../component/Items';
import { useNavigate, useLocation } from 'react-router-dom';
import { setPage } from '../redux/action/pages';

const RandomPics = ({ pics_g, randomPics,  currentPage, count, next, previous }) => {
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
                ? `${apiUrl}/api-random-pics/?page=${currentPage}`
                : `${apiUrl}/api-random-pics/`;
            navigate(`/random/?page=${currentPage}`);
        } else if (currentPage === null & page > 1) {
            url = `${apiUrl}/api-random-pics/?page=${page}`;
            navigate(`/random/?page=${page}`);
        } else {
            url = `${apiUrl}/api-random-pics/`;
        }

        randomPics(url);
    }, [currentPage, page]);

    return (
        <div style={{ margin: "0 8%" }}>
            <h1 style={{ float: "left", color: "#00bda0" }} className="mb-5">Random Pics</h1>
            {pics_g &&
                <>
                    <Items pics_g={pics_g} />
                    <Pagination page={page} />
                </>
            }
        </div>
    )
}


const mapStateToProps = state => ({
    pics_g: state.pics.pics.results,
    currentPage: state.pages.currentPage,
})
export default connect(mapStateToProps, { randomPics, setPage })(RandomPics)
