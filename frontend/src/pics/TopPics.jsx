import {connect} from 'react-redux'
import { useState, useEffect } from 'react';
import {topPics} from '../redux/action/pics'
import Container from 'react-bootstrap/Container';
import Pagination from '../component/Pagination';
import Items from '../component/Items';
import { useParams } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import { setPage, setCurrentPage } from '../redux/action/pages'; // Import your new actions

const TopPics = ({pics_g, topPics, setCurrentPage, currentPage, count, next, previous}) => {
    const navigate = useNavigate()
    const apiUrl = import.meta.env.VITE_API_URL;
    const [loading, setLoading] = useState(true)

    const { page } = useParams();
    const isPageProvided = Boolean(page);

    

    let url = ``
    useEffect(() => {
        // setCurrentPage(page)
        if (currentPage != null) {
            url = isPageProvided
            ? `${apiUrl}/api-top-pics/?page=${currentPage}`
            : `${apiUrl}/api-top-pics/`;
            navigate(`/top/${currentPage}`);
        }else if (currentPage === null & page > 1){
            url = `${apiUrl}/api-top-pics/?page=${page}`;
            navigate(`/top/${page}`);
        }else {
            // navigate(`/`);
            url = `${apiUrl}/api-top-pics/`; 
        }
        
        // if (currentPage !== 1) {
        //     navigate(`/${currentPage}`);
        // }
        topPics(url, setLoading);
        // console.log(url)
    }, [currentPage, page]);

    return(
        <Container className='mt-5'>
            <h1 style={{float: "left", color: "#00bda0"}} className="mb-5">Top Pics</h1>
            {loading? <h1>Loading...</h1>: <></>}
            {pics_g && 
                <>
                    <Items pics_g={pics_g} />
                    <Pagination  page={page} setLoading={setLoading} count={count} currentPage={currentPage} next={next} previous={previous}/>
                </>
            }
        </Container>
    )
}


const mapStateToProps = state => ({
    pics_g: state.pics.top.results,
    currentPage: state.pages.currentPage,
    count: state.pics.top.count,
    next: state.pics.top.next,
    previous: state.pics.top.previous,
})
export default connect(mapStateToProps, {topPics, setPage, setCurrentPage}) (TopPics)
