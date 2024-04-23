import { useState, useEffect, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import Items from "../component/Items";
import Loading from "../component/Loading";
import { connect } from "react-redux";
import { search, setQ } from "../redux/action/pics";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { setCurrentPage } from "../redux/action/pages";

const Search = ({
  loading,
  q,
  setQ,
  show,
  setShow,
  pics_g,
  count,
  search,
  setCurrentPage,
}) => {

  const moreResultsButtonRef = useRef(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  let url = ``;
  const [fullscreen, setFullscreen] = useState(true);

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }

  useEffect(() => {
    if (q && show) {
      url = `${apiUrl}/api-post/?q=${q}`;
    }
    search(url);
  }, [q]);

  const handelMore = () => {
    setShow(false);
    if(count>24){
      setCurrentPage(1);
      navigate(`/search/?q=${q}`);
    }else{
      navigate(`/search/?q=${q}`);
    }
  };

  const handelSearch = (e) => {
    setQ(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      moreResultsButtonRef.current.click();
    }
  };

  const navigate = useNavigate();

  let slicedPics_g = pics_g && pics_g.slice(0, 12);

  const handelShow = () => {
    setShow(false);
  };

  return (
    <>
      <Modal
        className="my-model-search"
        show={show}
        fullscreen={fullscreen}
        onHide={handelShow}
      >
        <div className="mx-lg-5" style={{ display: "inline-block" }}>
          <div style={{ display: "inline-block", width: "50%" }}>
            <Form.Control
              type="text"
              name="q"
              placeholder="Search"
              className=" mr-sm-2 search-input"
              onChange={(e) => handelSearch(e)}
              onKeyPress={handleKeyPress}
              autoFocus
            />
          </div>
          <button
            onClick={handleShow}
            className="btn btn-outline-success btn-s mx-3 mx-lg-5"
            style={{ display: "inline-block" }}
          >
            <AiOutlineClose />
          </button>
        </div>
        <hr></hr>
        <Modal.Body>
          {q ? (
            loading ? (
              <div className="loading-s">
                <Loading />
              </div>
            ) : (
              <>
                {slicedPics_g && (
                  <Container>
                    <Items
                      pics_g={slicedPics_g}
                      loading={loading}
                      setShow={setShow}
                    />
                  </Container>
                )}
                {pics_g && pics_g.length > 12 ? (
                  <div>
                    <button
                      ref={moreResultsButtonRef}
                      className="btn btn-outline-success btn-s px-lg-5"
                      onClick={() => handelMore()}
                    >
                      More results
                    </button>
                  </div>
                ) : (
                  <button
                    ref={moreResultsButtonRef}
                    className="btn btn-outline-success btn-s px-lg-5"
                    style={{ display: "none" }}
                    onClick={() => handelMore()}
                  >
                    More results
                  </button>
                )}
              </>
            )
          ) : (
            <div></div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  pics_g: state.pics.searched.results,
  count: state.pics.searched.count,
  loading: state.pics.searched_loading,
  q: state.pics.q,
});
export default connect(mapStateToProps, { search, setQ, setCurrentPage })(
  Search,
);
