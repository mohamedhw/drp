import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import Items from '../component/Items';
import {connect} from 'react-redux'
import {search} from '../redux/action/pics'


const Search = ({show, setShow, pics_g, search}) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    console.log(pics_g)
    const [q, setQ] = useState(null)
    const [loading, setLoading] = useState(true)
    let url = ``

    const values = [true];
    const [fullscreen, setFullscreen] = useState(true);

    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }
    
    useEffect(() => {
        // setCurrentPage(page)
        if(q){
            url = `${apiUrl}/api-post/?q=${q}`;
        }
        
        // if (currentPage != null) {
        //     navigate(`/${currentPage}`);
        //     url = isPageProvided
        //     ? `${apiUrl}/api-post/?page=${currentPage}`
        //     : `${apiUrl}/api-post/`;
        // }else if (currentPage === null & page > 1){
        //     navigate(`/${page}`);
        //     url = `${apiUrl}/api-post/?page=${page}`;
        // }else {
        //     // navigate(`/`);
        //     url = `${apiUrl}/api-post/`; 
        // }
        

        search(url, setLoading);
        
        console.log(url)
    }, [q]);


    const handelSearch = (e) => {
        // setCurrentPage(1)
        setQ(e.target.value)
    }


    
    return (
        <>
            <Modal className='my-model-search' show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Seach</Modal.Title>
                    <Container>
                        <Form.Control
                                type="text"
                                name='q'
                                placeholder="Search"
                                className=" mr-sm-2 search-input"
                                onChange={e=>handelSearch(e)}
                        />
                    </Container>
                </Modal.Header>
                <Modal.Body>
                {q?
                    pics_g &&
                        <Items pics_g={pics_g}/>
                    :
                    <div></div>
                }
                </Modal.Body>
            </Modal>
        </>
    )
}

const mapStateToProps = state => ({
    pics_g: state.pics.searched.results
    // currentPage: state.pages.currentPage,
})
export default connect(mapStateToProps, {search}) (Search)
