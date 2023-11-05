import Container from "react-bootstrap/esm/Container"
import Items from "../component/Items"
import {connect} from 'react-redux'
import { useParams } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {search} from '../redux/action/pics'
import Pagination from "../component/Pagination"; 

const Searched = ({pics_g, q, currentPage, search}) => {

    const navigate = useNavigate()
    const apiUrl = import.meta.env.VITE_API_URL;
    const [loading, setLoading] = useState(true)
    console.log(q)
    const { searchpage } = useParams();
    const isPageProvided = Boolean(searchpage);
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

        search(url, setLoading);
    }, [currentPage, searchpage]);

    return (
        <Container>
            {pics_g && 
                <>
                    <Items pics_g={pics_g} />
                    <Pagination  page={searchpage} setLoading={setLoading}/>
                </>
            }
        </Container>
    )
}

const mapStateToProps = state => ({
    pics_g: state.pics.searched.results,
    currentPage: state.pages.currentPage,
    q: state.pics.q
})

export default connect(mapStateToProps, {search}) (Searched)

