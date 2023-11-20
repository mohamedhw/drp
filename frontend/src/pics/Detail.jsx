import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Side from "../component/Side";

const Pic = () => {
    const apiUrl = import.meta.env.VITE_API_URL;

    const {postId} = useParams()
    const [data, setData]=useState()
    const [imageHeight, setImageHeight] = useState(null);
    const [imageWidth, setImageWidth] = useState(null);

    useEffect(()=>{
        axios.get(`${apiUrl}/api-post/${postId}/`)
        .then(response => {
            setData(response.data)

        })
    }, [postId])
    const he = window.innerHeight
    const [test, setTest] = useState("showcase-norm")
    const handleImageLoad = () => {
        if(test === "showcase-norm"){
            setTest("showcase-zoom")
        }else if(test == "showcase-zoom"){
            setTest("showcase-x-zoom")
        }
        else{
            setTest("showcase-norm")
        }
        // setImageHeight(event.target.naturalHeight);
        // setImageWidth(event.target.naturalWidth);
    }

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
        const sidebar = document.getElementById("menu");
        const togglebutton = document.getElementById("togglebutton")
        const main = document.getElementById("main")
        if (sidebar.style.display === "block") {
            setSlid(hidContent)
            sidebar.style.display = "none";
            togglebutton.classList.replace("vis", "hid");
            main.classList.replace("vis-main", "hid-main");
        } else {
            setSlid(visContent)
            sidebar.style.display = "block";
            togglebutton.classList.replace("hid", "vis");
            main.classList.replace("hid-main", "vis-main");
        }
    }
    return(
        <>
            {/* the side bar */}
            <aside id="menu" style={{display: "block"}}>
                {/* the side body */}
                <div id="showcase-sidebar" className='' style={{height: "100%"}}>
                      <div className="lsidebar"> 
                        <div className="side">
                            <Side post={data} toggleSidebar={toggleSidebar} ></Side>
                        <div className="sidebar-content" style={{marginRight: "-16.8px"}}></div>
                      </div>
                    </div>
                </div>

            </aside>
            {/* the button */}
            <div id="togglebutton" style={{width:"auto", marginTop: he/5 }} className="vis" onClick={e=>toggleSidebar()}>
                {slid}
            </div>
            
            <main id="main" className="vis-main">
                <section id="" className="fit showcase" 

                >
                        {/* the image body */}
                            <div 
                            className="scrollbox"
                            style={{marginRight: "-16.8px", marginBottom: "-16.8px"}}>
                                
                            {data && 
                                <img
                                className={test} onClick={handleImageLoad} id="img-content" src={data.image}  alt="Image Description" autoFocus/>
                            }
                                <div className="scrollbar horizontal both">
                                    <div className="scroll-handle" style={{ width: "56.8642%", left: "6.03324%"}}></div>
                                </div>
                                <div className="scrollbar vertical both">
                                    <div className="scroll-handle" style={{height: "30.3218%", top: "69.6782%"}}></div>
                                </div>
                    </div>
                </section>
            </main>
        </>
    )
}


export default Pic
