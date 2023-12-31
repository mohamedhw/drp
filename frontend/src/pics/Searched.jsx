import Container from "react-bootstrap/esm/Container"
import Items from "../component/Items"
import {connect} from 'react-redux'
import { useParams } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {search} from '../redux/action/pics'
import Pagination from "../component/Pagination"; 

const Searched = ({pics_g, q, currentPage, search, count, previous, next}) => {

    const navigate = useNavigate()
    const apiUrl = import.meta.env.VITE_API_URL;
    
    const { searchpage } = useParams();
    const isPageProvided = Boolean(searchpage);
    console.log(count)
    let url=""
    
    useEffect(() => {
        // setCurrentPage(1)
        if (currentPage != null) {
            url = isPageProvided
            ? `${apiUrl}/api-post/?q=${q}&page=${currentPage}`
            : `${apiUrl}/api-post/?q=${q}`;
            navigate(`/search/${currentPage}`);
        }else if (currentPage === null & searchpage > 1){
            url = `${apiUrl}/api-post/?q=${q}&page=${searchpage}`;
            navigate(`/search/${searchpage}`);
        }else {
            navigate(`/search`);
            url = `${apiUrl}/api-post/?q=${q}`; 
        }
        
        // if (currentPage !== 1) {
        //     navigate(`/${currentPage}`);
        // }

        search(url);
    }, [currentPage, searchpage]);

    return (
        <Container>
            {pics_g && 
                <>
                    <Items pics_g={pics_g} />
                    <Pagination  page={searchpage} count={count} currentPage={currentPage} next={next} previous={previous}/>
                </>
            }
        </Container>
    )
}

const mapStateToProps = state => ({
    pics_g: state.pics.searched.results,
    currentPage: state.pages.currentPage,
    count: state.pics.searched.count,
    q: state.pics.q,
    next: state.pics.searched.next,
    previous: state.pics.searched.previous,
})

export default connect(mapStateToProps, {search}) (Searched)

