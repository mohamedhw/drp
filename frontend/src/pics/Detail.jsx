import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { connect } from 'react-redux'
import Side from "../component/Side";
import { detail, sideBarStatus } from "../redux/action/pics";
import PicContent from "../component/PicContent";
import Loading from "../component/Loading";

const Pic = ({ loading, side_status, setShowCroper, setShowDelete, detail, data, sideBarStatus }) => {


    const { postId } = useParams()
    const [zoom_, setZoom_] = useState("showcase-norm")
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

    useEffect(() => {
        detail(postId, setZoom_)

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

    console.log(side_status)
    // SIDE BARE
    const [slid, setSlid] = useState(visContent)
    const toggleSidebar = () => {
        const sidebar = document.getElementById("menu");
        const togglebutton = document.getElementById("togglebutton")
        const main = document.getElementById("main")
        if (sidebar.style.display === "block" && side_status) {
            setSlid(hidContent)
            sidebar.style.display = "none";
            togglebutton.classList.replace("vis", "hid");
            main.classList.replace("vis-main", "hid-main");
            sideBarStatus()
        } else {
            setSlid(visContent)
            sidebar.style.display = "block";
            togglebutton.classList.replace("hid", "vis");
            main.classList.replace("hid-main", "vis-main");
            sideBarStatus()
        }
    }

    if (loading) {
        return <Loading />;
    }

    return (
        <main>
            <>
                <div>
                    {/* the side bar */}
                    <aside id="menu" style={{ display: "block" }}>
                        {/* the side body */}
                        <div id="showcase-sidebar" className=''>
                            <div className="lsidebar">
                                <div className="side">
                                    <Side post={data} toggleSidebar={toggleSidebar} setShowDelete={setShowDelete} setShowCroper={setShowCroper}></Side>
                                    <div className="sidebar-content" style={{ marginRight: "-16.8px" }}></div>
                                </div>
                            </div>
                        </div>

                    </aside>
                    {/* the button */}
                    <div id="togglebutton" style={{ width: "auto", marginTop: he / 5 }} className="vis" onClick={e => toggleSidebar()}>
                        {slid}
                    </div>
                </div>
                <main id="main" className="vis-main">
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
    loading: state.pics.loading,
    side_status: state.pics.side_status,
})
export default connect(mapStateToProps, { detail, sideBarStatus })(Pic)
