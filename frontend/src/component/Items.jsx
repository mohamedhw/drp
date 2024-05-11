import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "../component/Loading";
import { useState } from "react";

const Items = ({ loading, pics_g, setShow, setZoom_ }) => {
  const [pageTarget, setPageTarget] = useState(true);
  const handelClick = () => {
    if (setShow) {
      setZoom_("showcase-norm");
      setShow(false);
    }
    if (window.innerWidth < 1000) {
      setPageTarget(false);
    }
  };

  const filters = {
    top: "Top Pics",
    random: "Random Pics",
    hot: "Hot Pics",
    foryou: "Pics For You"
  };
  const location = useLocation();
  const routParam = location.pathname.split("/").filter(Boolean).pop();

  return (
    <div style={{ margin: "auto", width: "100%", textAlign: "center" }}>
      <h1
        style={{ float: "left", color: "#00bda0", display: "inline" }}
        className="mb-5"
      >
        {filters[routParam] || "Latest Pics"}
      </h1>
      <Row style={{ margin: "auto", width: "100%", justifyContent: "center" }}>
        {pics_g.length > 0 ? (
          pics_g.map((post) => (
            <Col
              key={post.id}
              xs={12}
              sm={5}
              md={5}
              lg={3}
              xl={3}
              xxl={2}
              className="mt-4 mt-sm-4 mx-sm-2 mt-md-3 mx-md-1 mt-lg-4 mx-lg-3 p-lg-1"
            >
              <Link
                to={`/pic/${post.id}`}
                target={pageTarget && "_blank"}
                className="article-2"
                onClick={() => handelClick()}
              >
                <Card
                  className="pic-l"
                  style={{
                    minWidth: "auto",
                    minHight: "100px",
                    maxHeight: "300px",
                    maxWidth: "500px",
                  }}
                >
                  {loading ? (
                    <Loading />
                  ) : (
                    <>
                      <Card.Img
                        className="lazyload"
                        variant="top"
                        src={post.thumb}
                        style={{ overflow: "hidden" }}
                        loading="lazy"
                      />
                      <div className="thumb-info">
                        <span className="">
                          {post.get_width} X {post.get_height}
                        </span>
                      </div>
                    </>
                  )}
                </Card>
              </Link>
            </Col>
          ))
        ) : (
          <h1>No Results</h1>
        )}
      </Row>
    </div>
  );
};

export default connect(null, {})(Items);
