import { useEffect, useState } from "react";
import { tags } from "../redux/action/pics";
import { connect } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Loading from "../component/Loading";
import { IoIosArrowBack } from "react-icons/io";

const Tags = ({ tags, tags_g }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    tags();
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="loading-s">
        <Loading />
      </div>
    );
  }
  return (
    <>
      <h2 style={{ color: "#00bda0" }}>Tags</h2>
      <Container>
        <Row className="m-5" style={{}}>
          {/* {loading ? <Loading /> : */}
          {tags_g &&
            tags_g.map((tag) => (
              <Col key={tag.tag} xl={3} md={6} sm={12}>
                <Link to={`/tag/${tag.tag_slug}`}>
                  <Card className="tag-card p-1">
                    <p className="p-1 m-0" style={{ float: "left" }}>
                      {tag.tag}
                    </p>
                    <p className="p-1 m-0" style={{ float: "right" }}>
                      <span className="p-1 tag-card-span" />
                      {tag.post_count}
                    </p>
                  </Card>
                </Link>
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  tags_g: state.pics.tags,
  // loading: state.pics.tags_loading
});
export default connect(mapStateToProps, { tags })(Tags);
