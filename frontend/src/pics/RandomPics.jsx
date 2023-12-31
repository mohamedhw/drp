import {connect} from 'react-redux'
import { useState, useEffect } from 'react';
import {randomPics} from '../redux/action/pics'
import Container from 'react-bootstrap/Container';
import Pagination from '../component/Pagination';
import Items from '../component/Items';
import { useParams } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import { setPage, setCurrentPage } from '../redux/action/pages'; // Import your new actions

const RandomPics = ({pics_g, randomPics, setCurrentPage, currentPage, count, next, previous}) => {
    const navigate = useNavigate()
    const apiUrl = import.meta.env.VITE_API_URL;

    const { page } = useParams();
    const isPageProvided = Boolean(page);

    

    let url = ``
    useEffect(() => {
        // setCurrentPage(page)
        if (currentPage != null) {
            url = isPageProvided
            ? `${apiUrl}/api-random-pics/?page=${currentPage}`
            : `${apiUrl}/api-random-pics/`;
            navigate(`/random/${currentPage}`);
        }else if (currentPage === null & page > 1){
            url = `${apiUrl}/api-random-pics/?page=${page}`;
            navigate(`/random/${page}`);
        }else {
            // navigate(`/`);
            url = `${apiUrl}/api-random-pics/`; 
        }
        
        // if (currentPage !== 1) {
        //     navigate(`/${currentPage}`);
        // }
        randomPics(url);
        // console.log(url)
    }, [currentPage, page]);

    return(
        <Container className='mt-5'>
            <h1 style={{float: "left", color: "#00bda0"}} className="mb-5">Random Pics</h1>
            {pics_g && 
                <>
                    <Items pics_g={pics_g} />
                    <Pagination  page={page} count={count} currentPage={currentPage} next={next} previous={previous}/>
                </>
            }
        </Container>
    )
}


const mapStateToProps = state => ({
    pics_g: state.pics.random.results,
    currentPage: state.pages.currentPage,
    count: state.pics.random.count,
    next: state.pics.random.next,
    previous: state.pics.random.previous,
})
export default connect(mapStateToProps, {randomPics, setPage, setCurrentPage}) (RandomPics)
