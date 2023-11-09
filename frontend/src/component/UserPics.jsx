import { useEffect, useState } from "react"
import axios from "axios"
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';






const UserPics = ({username}) => {
    // const username = 'saul'
    const apiUrl = import.meta.env.VITE_API_URL;
    const url = `${apiUrl}/api-user-posts/${username}/`
    console.log(url)
    const [pics, setPics] = useState()
    useEffect(()=>{
        axios.get(url)
        .then(response => {
            setPics(response.data.results)
            
        })
    }, [username])

    return (
        <>
            {pics && 
                <Row>
                    {pics.map((post) => (
                        <Col xs={12} md={6} lg={3} xl={3} xxl={3} className='p-1 pic-t'>
                            <Link to={`/pic/${post.id}`} className='article-2' onClick={e => handelClick()}>
                                <Card className='pic-l' key={post.id} style={{height: "100%"}}>
                                    <Card.Img variant="top" src={post.thumb} style={{height: "100% !important"}}/>
                                </Card>
                            </Link>
                        </Col>
                    
                    ))}
                </Row>
            }
        </>
    )
}


export default UserPics