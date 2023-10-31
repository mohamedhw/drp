import {connect} from 'react-redux'
import { useState, useEffect } from 'react';
import {pics} from '../redux/action/pics'
import Container from 'react-bootstrap/Container';
import Pagination from '../component/Pagination';
import Items from '../component/Items';
import { useParams } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import { setPage, setCurrentPage } from '../redux/action/pages'; // Import your new actions

const Home = ({pics_g, pics, setCurrentPage, currentPage}) => {
    const navigate = useNavigate()
    const apiUrl = import.meta.env.VITE_API_URL;
    const [loading, setLoading] = useState(true)

    const { page } = useParams();
    const isPageProvided = Boolean(page);

    
    console.log("currentPage:", currentPage)
    console.log("page:", page)
    
    
    let url = ``
    useEffect(() => {
        // setCurrentPage(page)
        if (currentPage != null) {
            navigate(`/${currentPage}`);
            url = isPageProvided
            ? `${apiUrl}/api-post/?page=${currentPage}`
            : `${apiUrl}/api-post/`;
        }else if (currentPage === null & page > 1){
            navigate(`/${page}`);
            url = `${apiUrl}/api-post/?page=${page}`;
        }else {
            // navigate(`/`);
            url = `${apiUrl}/api-post/`; 
        }
        
        // if (currentPage !== 1) {
        //     navigate(`/${currentPage}`);
        // }
        pics(url, setLoading);
        console.log(url)
    }, [currentPage]);
    return(
        <Container className='mt-5'>
            {loading? <h1>Loading...</h1>: <></>}
            {pics_g && 
                <>
                    <Items pics_g={pics_g} />
                    <Pagination  page={page} setLoading={setLoading}/>
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