import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { connect } from 'react-redux'
import Side from "../component/Side";
import { detail, sideBarStatus, sideBarHolder } from "../redux/action/pics";
import PicContent from "../component/PicContent";
import Loading from "../component/Loading";

const Pic = ({ loading, side_status, side_holder, setShowCroper, setShowDelete, detail, data, sideBarStatus, sideBarHolder }) => {

    const { postId } = useParams()
    const [zoom_, setZoom_] = useState("showcase-norm")
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);


    const hidContent = (
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-right-square" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
        </svg>
    )

    const visContent = (
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-left-square" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
        </svg>
    )


    useEffect(() => {
        detail(postId, setZoom_)
        // Update window height when the window is resized
        const handleResize = () => {
            setWindowHeight(window.innerHeight);
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        // Remove event listener when the component is unmounted
        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, [postId])


    useEffect(()=>{

      // Check window size and sidebar status, toggle sidebar accordingly
      if (side_holder && windowWidth < 1000 && side_status) {
        sideBarStatus();
      } else if (side_holder && windowWidth >= 1000 && !side_status) {
        sideBarStatus();
      }

    }, [windowWidth])

    useEffect(() => {
      // Check window size when the component mounts
      // if (windowWidth < 1000 && side_status) {
      setWindowWidth(window.innerWidth);
      // }
    }, []);


    const toggleSidebar = () => {
      sideBarStatus();
      sideBarHolder()
    }


    return (
        <main>
            <>
                <div>
                    {/* the side bar */}
                    <aside id="menu" style={{ display: side_status ? "block" : "none" }}>
                        {/* the side body */}
                        <div id="showcase-sidebar" style={{maxHeight: windowHeight - 100}}>
                            <div className="lsidebar">
                                <div className="side">
                                    {loading? <Loading />:
                                      <Side post={data} toggleSidebar={toggleSidebar} setShowDelete={setShowDelete} setShowCroper={setShowCroper}></Side>
                                      }
                                    <div className="sidebar-content" style={{ marginRight: "-16.8px" }}></div>
                                </div>
                            </div>
                        </div>

                    </aside>
                    {/* the button */}
                    {loading? <></>:
                      <div id="togglebutton" style={{ width: "auto", marginTop: windowHeight / 5 }} className={side_status ? "vis" : "hid"} onClick={e => toggleSidebar()}>
                          {side_status ? visContent : hidContent}
                      </div>
                    }
                </div>
                <main id="main" className={side_status ? "vis-main" : "hid-main"}>
                    <section id="" className="fit showcase" style={{ height: windowHeight - 100, marginRight: "15px" }}>
                          <PicContent data={data} zoom_={zoom_} setZoom_={setZoom_} />
                    </section>
                </main>
            </>
        </main>
    )
}


const mapStateToProps = state => ({
    data: state.pics.detail,
    loading: state.pics.detail_loading,
    side_status: state.pics.side_status,
    side_holder: state.pics.side_holder,
})
export default connect(mapStateToProps, { detail, sideBarStatus, sideBarHolder })(Pic)
