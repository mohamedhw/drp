import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Side from "../component/Side";

const Pic = () => {


    const options = [ {
        name: 'Enable body scrolling',
        scroll: true,
        backdrop: false,
      },]
    const {postId} = useParams()
    const [data, setData]=useState()
    const [imageHeight, setImageHeight] = useState(null);
    const [imageWidth, setImageWidth] = useState(null);

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_URL}/api-post/${postId}/`)
        .then(response => {
            setData(response.data)
        })
    }, [])
    const he = window.innerHeight
    const handleImageLoad = (event) => {
        setImageHeight(event.target.naturalHeight);
        setImageWidth(event.target.naturalWidth);
    }
    console.log(imageHeight)
    console.log(imageWidth)
    let hight_=0
    let width_=0
    if(imageHeight>imageWidth){
        hight_="40%"
        width_="40%"
    }else if(imageHeight===imageWidth){
        hight_="60%"
        width_="60%"
    }else{
        hight_="100%"
        width_="100%"
    }


    const hidContent = (
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-arrow-right-square" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
        </svg>
    )

    const visContent = (
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-arrow-left-square" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
        </svg>
    )
    const [slid, setSlid] = useState(visContent)
    const toggleSidebar = () => {
        console.log("asd")
        const sidebar = document.getElementById("menu");
        const imgcontent = document.getElementById("img-content");
        const togglebutton = document.getElementById("togglebutton")
        if (sidebar.style.display === "block") {
            setSlid(hidContent)
            sidebar.style.display = "none";
            togglebutton.classList.replace("vis", "hid");
            imgcontent.classList.replace("col-lg-9", "col-lg-12");
            imgcontent.classList.replace("col-md-8", "col-md-12");
        } else {
            setSlid(visContent)
            sidebar.style.display = "block";
            togglebutton.classList.replace("hid", "vis");
            imgcontent.classList.replace("col-lg-12", "col-lg-9");
            imgcontent.classList.replace("col-md-12", "col-md-8");
        }
    }
    
    return(
        <Row>
            <Col id="img-content" xs={12} sm={6} md={8} lg={9}>
                <Container className='mt-5 image-container'>
                    {data && 
                    <div className="image-container">
                        <img onLoad={handleImageLoad} className="" src={data.thumb} style={{height: hight_, width: width_}} alt="Image Description"/>
                    </div>
                    }
                </Container>
            </Col>
            <div id="togglebutton" style={{width:"auto", marginTop: imageHeight/2}} className="vis" onClick={e=>toggleSidebar()}>
                {slid}
            </div>
            <Col id="menu" xs={8} sm={5} md={4} lg={2} style={{display: "block"}}>
                <Container className='mt-5' style={{height: "100%"}}>
                    <div className="side">
                        <Side post={data} toggleSidebar={toggleSidebar}/>
                    </div>
                </Container>
            </Col>
            {options.map((props, idx) => (
                <Side post={data} key={idx} {...props} />
            ))}
        </Row>
    )
}


export default Pic