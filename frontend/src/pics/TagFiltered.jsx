import {connect} from 'react-redux'
import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from 'react';
import {tagpics} from '../redux/action/pics'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Loading from '../component/Loading';

const TagFiltered = ({pics, tagpics, loading}) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const {tagSlug} = useParams()
    const url = `${apiUrl}/api-tag/${tagSlug}/`

    useEffect(()=>{
        tagpics(url)
    },[])

    
    return(
        <Container className='mt-5'>
                  <Row className=''>
                    {pics && pics.map((post) => (
                          <Col xs={12} md={6} lg={3} xl={3} xxl={3} className='p-1 pic-t'>
                              <Link to={`/pic/${post.id}`} className='article-2'>
                                  <Card className='pic-l' key={post.id} style={{height: "100%"}}>
                                    {loading? <Loading />:
                                      <Card.Img variant="top" src={post.thumb} style={{height: "100% !important"}}/>
                                    }
                                  </Card>
                              </Link>
                          </Col>
                      ))
                    }
                  </Row>
        </Container>
    )
}


const mapStateToProps = state => ({
    pics: state.pics.taged.results,
    loading: state.pics.taged_loading
})
export default connect(mapStateToProps, {tagpics}) (TagFiltered)
