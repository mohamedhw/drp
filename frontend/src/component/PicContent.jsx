import { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import Loading from "./Loading";

const PicContent = ({ data, zoom_, setZoom_, loading }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [prevMousePosition, setPrevMousePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [moved, setMoved] = useState();

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging) return;
      const deltaX = prevMousePosition.x - e.clientX;
      const deltaY = prevMousePosition.y - e.clientY;
      const scrollLeft = position.x + deltaX;
      const scrollTop = position.y + deltaY;

      e.target.parentElement.scrollTo({
        left: scrollLeft,
        top: scrollTop,
        behavior: "auto", // or 'smooth' for smooth scrolling
      });

      setPosition({
        x: scrollLeft,
        y: scrollTop,
      });

      setPrevMousePosition({
        x: e.clientX,
        y: e.clientY,
      });

      setMoved(true);
    },
    [isDragging, prevMousePosition, position],
  );

  const handleMouseUp = useCallback(() => {
    if (!moved) {
      handleImageLoad();
    }
    setIsDragging(false);
    setMoved(false);
  }, [isDragging, position, prevMousePosition]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleMouseDown = (e) => {
    e.preventDefault();

    setIsDragging(true);
    setPrevMousePosition({
      x: e.clientX,
      y: e.clientY,
    });
    setPosition({
      x: e.target.parentElement.scrollLeft,
      y: e.target.parentElement.scrollTop,
    });
  };

  const handleImageLoad = () => {
    if (zoom_ === "showcase-norm") {
      setZoom_("showcase-zoom");
      const imageContainer = document.querySelector(".scrollbox");
      const containerHeight = imageContainer.offsetHeight;
      const containerWidth = imageContainer.offsetWidth;
      const minImageWidth = Math.max(data && data.image_width, containerWidth);
      const scrollLeft = (minImageWidth - containerWidth) / 2;
      const scrollTop = (data && data.image_height - containerHeight) / 2;
      imageContainer.scrollTo(scrollLeft, scrollTop);
    } else if (zoom_ == "showcase-zoom") {
      setZoom_("showcase-x-zoom");
      const imageContainer = document.querySelector(".scrollbox");
      const containerWidth = imageContainer.offsetWidth;
      const containerHeight = imageContainer.offsetHeight;
      const scrollLeft = (data && data.image_width - containerWidth) / 2;
      const scrollTop = (data && data.image_height - containerHeight) / 2;
      imageContainer.scrollTo(scrollLeft, scrollTop);
    } else {
      setZoom_("showcase-norm");
    }
  };

  return (
    <div
      id="scrollContainer"
      className="scrollbox"
      style={{
        marginRight: "-16.8px",
        marginBottom: "-16.8px",
        height: "85vh",
        display: "flex",
        alignItems: "center",
      }}
      onMouseDown={handleMouseDown}
    >
      {loading ? (
        <Loading />
      ) : (
        data && (
          <img
            className={zoom_}
            id="img-content"
            src={data.image}
            alt="Image Description"
            autoFocus
          />
        )
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.pics.detail_loading,
});

export default connect(mapStateToProps, null)(PicContent);
