import {connect} from 'react-redux'
import { useState, useEffect } from 'react';
import {pics} from '../redux/action/pics'
import Container from 'react-bootstrap/Container';
import Pagination from '../component/Pagination';
import Items from '../component/Items';
import { useParams } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import { setPage, setCurrentPage } from '../redux/action/pages'; // Import your new actions

const Home = ({pics_g, pics, q, setCurrentPage, currentPage}) => {
    const navigate = useNavigate()
    const apiUrl = import.meta.env.VITE_API_URL;
    const [loading, setLoading] = useState(true)

    const { page } = useParams();
    const isPageProvided = Boolean(page);

    
    console.log("currentPage:", currentPage)
    console.log("page:", page)
    
    
    let url = ``
    useEffect(() => {
        navigate(`/${currentPage}`);
        if (q) {
            if (isPageProvided) {
                // setCurrentPage(1)
                if (currentPage > 1) {
                    url = `${apiUrl}/api-post/?q=${q}&page=${currentPage}`;
                } else {
                    url = `${apiUrl}/api-post/?q=${q}`;
                }
            } else {
                url = `${apiUrl}/api-post/?q=${q}`;
            }
        } else if (currentPage) {
            url = isPageProvided
            ? `${apiUrl}/api-post/?page=${currentPage}`
            : `${apiUrl}/api-post/`;
        } else {
            url = `${apiUrl}/api-post/`; 
        }
        
        // if (currentPage !== 1) {
        //     navigate(`/${currentPage}`);
        // }
        pics(url, setLoading);
        console.log(url)
    }, [q, currentPage, page]);
    return(
        <Container className='mt-5'>
            {loading? <h1>Loading...</h1>: <></>}
            {pics_g && 
                <>
                    <Items pics_g={pics_g} />
                    <Pagination  page={page} />
                </>
            }
        </Container>
    )
}


const mapStateToProps = state => ({
    pics_g: state.pics.pics.results,
    currentPage: state.pages.currentPage,
})
export default connect(mapStateToProps, {pics, setPage, setCurrentPage}) (Home)