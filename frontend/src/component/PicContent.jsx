import { useEffect, useState } from "react"
import { connect } from 'react-redux'
import Loading from "./Loading";


const PicContent = ({ data, zoom_, setZoom_, loading }) => {


    const [isDragging, setIsDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setOffset({
            x: e.clientX - e.target.offsetLeft,
            y: e.clientY - e.target.offsetTop
        });
    };

    // const handleMouseMove = (e) => {
    //   if (isDragging) {
    //     const x = e.clientX - offset.x;
    //     const y = e.clientY - offset.y;
    //
    //     // Update the scroll position only if dragging is active
    //     const imageContainer = document.querySelector(".scrollbox");
    //     if (imageContainer) {
    //       const scrollX = x - imageContainer.scrollLeft;
    //       const scrollY = y - imageContainer.scrollTop;
    //
    //       imageContainer.scrollLeft += scrollX;
    //       imageContainer.scrollTop += scrollY;
    //     }
    //   }
    // };
    // const handleMouseUp = () => {
    //   setIsDragging(false);
    // };
    useEffect(() => {

        // document.addEventListener('mousemove', handleMouseMove);
        // document.addEventListener('mouseup', handleMouseUp);
        //
        // return () => {
        //   document.removeEventListener('mousemove', handleMouseMove);
        //   document.removeEventListener('mouseup', handleMouseUp);
        // };
    }, [isDragging]);

    const handleImageLoad = () => {
        if (zoom_ === "showcase-norm") {
            setZoom_("showcase-zoom")
            const imageContainer = document.querySelector('.scrollbox');
            const containerHeight = imageContainer.offsetHeight;
            const minImageWidth = Math.max(data && data.image_width, containerWidth);
            const scrollLeft = (minImageWidth - containerWidth) / 2;
            const scrollTop = (data && data.image_height - containerHeight) / 2;
            imageContainer.scrollTo(scrollLeft, scrollTop);
        } else if (zoom_ == "showcase-zoom") {
            setZoom_("showcase-x-zoom")
            const imageContainer = document.querySelector('.scrollbox');
            const containerWidth = imageContainer.offsetWidth;
            const containerHeight = imageContainer.offsetHeight;
            const scrollLeft = (data && data.image_width - containerWidth) / 2;
            const scrollTop = (data && data.image_height - containerHeight) / 2;

            imageContainer.scrollTo(scrollLeft, scrollTop);
        }
        else {
            setZoom_("showcase-norm")
        }

    }
    const handelScroll = () => {
        let scrollContainer = document.getElementById("scrollContainer");

        // Get scroll position of the scroll container
        let scrollX = scrollContainer.scrollLeft;
        let scrollY = scrollContainer.scrollTop;
        scrollContainer.scrollX = offset.x;
        scrollContainer.scrollY = offset.y;

    }

    if (loading) {
        return <Loading />;
    }

    return (

        <div
            id="scrollContainer"
            className="scrollbox"
            style={{
                marginRight: "-16.8px",
                marginBottom: "-16.8px",
                height: '94vh',
                display: 'flex',
                alignItems: 'center',
            }}
        // onScroll={handelScroll}
        // onMouseDown={handleMouseDown}
        >
            {data &&
                <img
                    className={zoom_}
                    onClick={handleImageLoad}
                    id="img-content"
                    src={data.image}
                    alt="Image Description"
                    autoFocus
                />
            }
            <div className="scrollbar horizontal both">
                <div className="scroll-handle" style={{ width: "56.8642%", left: "6.03324%" }}></div>
            </div>
            <div className="scrollbar vertical both">
                <div className="scroll-handle" style={{ height: "30.3218%", top: "69.6782%" }}></div>
            </div>
        </div >
    )
}



const mapStateToProps = state => ({
    loading: state.pics.loading,
})

export default connect(mapStateToProps, null)(PicContent)
