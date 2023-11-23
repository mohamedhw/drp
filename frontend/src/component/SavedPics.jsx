import { useEffect } from "react"
import Row from "react-bootstrap/esm/Row";
import { connect } from 'react-redux'
import Container from "react-bootstrap/esm/Container";
import Items from "../component/Items";
import ProfileHead from "../component/ProfileHead";
import { Link } from "react-router-dom"
import { savedpics } from "../redux/action/pics";
import SliceItems from "./SliceItems"
const SavedPics = ({savedpics, username_g, image_g, pics, pics_}) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const url = `${apiUrl}/api-saved-pics/`
    let slicePics = pics && pics.slice(0, 8)

    useEffect(()=>{
        savedpics(url)
    }, [username_g, image_g])


    let picsView = <></>
    if(pics && pics.length === 0){
        picsView= (<h2>no pics</h2>)
    }else{
        picsView = (
            <>
            
                    
                    <SliceItems pics_g={slicePics}/>
                    {pics && pics.length > 8?
                            <div>
                                <Link to={`/userallpics/${authorname}`}>
                                    <button className='btn btn-outline-success btn-s px-lg-5'>More results</button>
                                </Link>
                            </div>
                        :
                            <></>
                     } 
                
            </>
            )
    }

    return (
        <>
            <Container className="mt-5">
                {pics &&
                    <Row>
                        <ProfileHead username={username_g} image={image_g} count={pics_.count} test={"number of pics saved"}/>
                        {picsView}
                    </Row>
                }
            </Container>
        </>
    )
}

const mapStateToProps = state => ({
    username_g: state.profile.username,
    image_g: state.profile.image,
    pics_: state.pics.savedPics,
    pics: state.pics.savedPics.results
})

export default connect(mapStateToProps, {savedpics}) (SavedPics)
