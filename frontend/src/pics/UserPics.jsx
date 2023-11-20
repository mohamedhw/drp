import { useEffect, useState } from "react"
import Row from "react-bootstrap/esm/Row";
import { connect } from 'react-redux'
import Container from "react-bootstrap/esm/Container";
import Items from "../component/Items";
import {authorpics} from "../redux/action/pics"
import ProfileHead from "../component/ProfileHead";
import { useParams, Link } from "react-router-dom"

const UserPics = ({authorpics, pics, pics_, username_g, image_g}) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const {authorname} = useParams()
    const url = `${apiUrl}/api-user-posts/${authorname}/`
    const [profileHead, setProfileHead] = useState(<></>)
    
    useEffect(()=>{
        authorpics(url)
        if(username_g === authorname){
            setProfileHead(<ProfileHead username={authorname} image={image_g} count={pics_.count} test={"number of pics uploads"}/>)
        }else{
            setProfileHead(<ProfileHead username={authorname} image={pics&&pics[0].author_image} count={pics_.count} test={"number of pics uploaded"}/>)
        }
    }, [authorname, username_g])

    let picsView = <></>

    if(pics && pics.length === 0){
        picsView= (<h2>no pics</h2>)
    }else{
        picsView = (
            <>
                <Items pics_g={pics}/>
                <div>
                    <Link to={`/userallpics/${authorname}`}>
                        <button className='btn btn-outline-success btn-s px-lg-5'>More results</button>
                    </Link>
                </div>
            </>
            )
    }

    return (
        <>
            <Container className="mt-5">
                {pics &&
                <Row>
                        {profileHead}
                        {picsView}
                </Row>
                }
            </Container>
        </>
    )
}

const mapStateToProps = state => ({
    pics_: state.pics.authorPics,
    pics: state.pics.authorPics.results,
    username_g: state.profile.username,
    image_g: state.profile.image,
})

export default connect(mapStateToProps, {authorpics}) (UserPics)
