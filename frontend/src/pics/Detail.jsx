import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import {connect} from 'react-redux'
import Side from "../component/Side";
import { detail } from "../redux/action/pics";

const Pic = ({setShowDelete, detail, data}) => {

    const {postId} = useParams()
    const [zoom_, setZoom_] = useState("showcase-norm")
    const [loading, setLoading] = useState(true)
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

    useEffect(()=>{
        detail(postId, setLoading, setZoom_)
        // axios.get(`${apiUrl}/api-post/${postId}/`)
        // .then(response => {
        //     setData(response.data)
        //     setZoom_("showcase-norm")
        // })
          // Update window height when the window is resized
        const handleResize = () => {
          setWindowHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        // Remove event listener when the component is unmounted
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, [postId])
    const he = window.innerHeight

    const handleImageLoad = () => {
        if(zoom_ === "showcase-norm"){
            setZoom_("showcase-zoom")
            const imageContainer = document.querySelector('.scrollbox');
            const containerHeight = imageContainer.offsetHeight;
            const minImageWidth = Math.max(data && data.image_width, containerWidth);
            const scrollLeft = (minImageWidth - containerWidth) / 2;
            const scrollTop = (data && data.image_height - containerHeight) / 2;
            console.log("Image Width:", data.image_width);
            console.log("Container Width:", containerWidth);
            console.log("Left:", scrollLeft);
            imageContainer.scrollTo(scrollLeft, scrollTop);
        }else if(zoom_ == "showcase-zoom"){
            setZoom_("showcase-x-zoom")
            const imageContainer = document.querySelector('.scrollbox');
            const containerWidth = imageContainer.offsetWidth;
            const containerHeight = imageContainer.offsetHeight;
            const scrollLeft = (data && data.image_width - containerWidth) / 2;
            const scrollTop = (data && data.image_height - containerHeight) / 2;

            imageContainer.scrollTo(scrollLeft, scrollTop);
        }
        else{
            setZoom_("showcase-norm")
        }

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
        <main>
            {loading? <h1>Loading...</h1>:
        <>
                <div>
                    {/* the side bar */}
                    <aside id="menu" style={{display: "block"}}>
                        {/* the side body */}
                        <div id="showcase-sidebar" className=''>
                              <div className="lsidebar"> 
                                <div className="side">
                                    <Side post={data} toggleSidebar={toggleSidebar} setShowDelete={setShowDelete}></Side>
                                <div className="sidebar-content" style={{marginRight: "-16.8px"}}></div>
                              </div>
                            </div>
                        </div>

                    </aside>
                    {/* the button */}
                    <div id="togglebutton" style={{width:"auto", marginTop: he/5 }} className="vis" onClick={e=>toggleSidebar()}>
                        {slid}
                    </div>
                </div>
            <main id="main" className="vis-main">
                <section id="" className="fit showcase" style={{height: windowHeight - 100, marginRight: "15px"}}>
                        {/* the image body */}
                            <div 
                            className="scrollbox"
                            style={{marginRight: "-16.8px", marginBottom: "-16.8px", height: '80vh'}}>
                                
                            {data && 
                                <img
                                className={zoom_} onClick={handleImageLoad} id="img-content" src={data.image}  alt="Image Description" autoFocus/>
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
        }
        </main>
    )
}



const mapStateToProps = state => ({
    data: state.pics.detail
})
export default connect(mapStateToProps, {detail}) (Pic)
