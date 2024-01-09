import {connect} from 'react-redux'
import { useState, useEffect } from 'react';
import { pics, topPics, randomPics } from '../redux/action/pics'
import Container from 'react-bootstrap/Container';
import Items from '../component/Items';
import { useParams } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import FilterBar from '../component/FilterBar';


const Home = ({pics, topPics, randomPics, pics_g, random_g, top_g}) => {
    const navigate = useNavigate()
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {

        pics(`${apiUrl}/api-post/?page=1`);
        topPics(`${apiUrl}/api-top-pics/?page=1`);
        randomPics(`${apiUrl}/api-random-pics/?page=1`);

    }, []);

    return(
        <>
            <FilterBar/>
            <Container className='mt-5'>
                {/* {loading? <h1>Loading...</h1>: <></>} */}
                {pics_g &&
                    <>
                        <Items pics_g={pics_g} />
                    </>
                }
            </Container>
        </>
    )
}


const mapStateToProps = state => ({
    pics_g: state.pics.pics.results,
    top_g: state.pics.top,
    random_g: state.pics.random
})
export default connect(mapStateToProps, {pics, topPics, randomPics}) (Home)
