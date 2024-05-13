import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import Loading from "./Loading";

const PicContent = ({ data, zoom_, setZoom_, loading }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [prevMousePosition, setPrevMousePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [moved, setMoved] = useState();

  // Move in tha image feat
  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging) return;
      const deltaX = prevMousePosition.x - e.clientX;
      const deltaY = prevMousePosition.y - e.clientY;
      const scrollLeft = position.x + deltaX;
      const scrollTop = position.y + deltaY;

      const imageContainer = document.getElementById("scrollContainer");

      imageContainer.scrollTo({
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


  const handleMouseUp = useCallback(
    (e) => {
      if (!moved) {
        handleImageLoad(e);
      }
      setIsDragging(false);
      setMoved(false);
    },
    [isDragging, position, prevMousePosition],
  );


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

  // Zooming feat
  const handleImageLoad = () => {
    if (zoom_ === "showcase-norm") {
      setZoom_("showcase-zoom");
    } else if (zoom_ === "showcase-zoom") {
      setZoom_("showcase-x-zoom");
    } else {
      setZoom_("showcase-norm");
    }
  };

  // Where to zoom feat
  const handelZoomPosition = () => {
    const imageContainer = document.getElementById("scrollContainer");
    const containerWidth = imageContainer.offsetWidth;
    const containerHeight = imageContainer.offsetHeight;
    const mouseX = prevMousePosition.x - imageContainer.getBoundingClientRect().left;
    const mouseY = prevMousePosition.y - imageContainer.getBoundingClientRect().top;
    const scrollLeft =
      (mouseX * (data.get_width - containerWidth)) / containerWidth;
    const scrollTop =
      (mouseY * (data.get_height - containerHeight)) / containerHeight;
    imageContainer.scrollTo(scrollLeft, scrollTop);
  };

  useEffect(() => {
    if (zoom_ !== "showcase-norm") {
      handelZoomPosition();
    }
  }, [zoom_]);

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

  return (
    <div
      id="scrollContainer"
      className="scrollbox"
      style={{
        marginRight: "-16.8px",
        marginBottom: "-16.8px",
        height: "auto",
        display: "flex",
        alignItems: "center",
      }}
    >
      {loading ? (
        <Loading />
      ) : (
        data && (
          <img
            onMouseDown={handleMouseDown}
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
