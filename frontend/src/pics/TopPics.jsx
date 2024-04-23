import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { topPics } from "../redux/action/pics";
import Pagination from "../component/Pagination";
import Items from "../component/Items";
import Loading from "../component/Loading";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { setCurrentPage, setPage } from "../redux/action/pages";

const TopPics = ({
  pics_g,
  loading,
  topPics,
  currentPage,
  count,
  next,
  previous,
}) => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  let ranges = {
    "1d": "Last Day",
    "3d": "Last 3 Days",
    "1w": "Last Week",
    "1M": "Last Month",
    "6M": "Last 6 Months",
    "all": "All",
  };

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get("page") || 1; // Default to page 1 if 'page' query parameter is not provided
  const topRangeTag = queryParams.get("topRange"); // Default to page 1 if 'page' query parameter is not provided
  const isPageProvided = Boolean(page);

  const [topRange, setTopRange] = useState("Last Month");
  const [selectedRange, setSelectedRange] = useState("Last Month");

  const handleDropdownChange = (eventKey, event) => {
    setTopRange(eventKey);
    setSelectedRange(event.target.innerText);
  };

  let url = ``;
  useEffect(() => {
    if (topRangeTag) {
      setTopRange(ranges[topRangeTag]);
      setSelectedRange(ranges[topRangeTag]);
    }
    if (topRangeTag) {
      if (currentPage != null) {
        url = isPageProvided
          ? `${apiUrl}/api-top-pics/?topRange=${topRangeTag}&page=${currentPage}`
          : `${apiUrl}/api-top-pics/?topRange=${topRangeTag}`;
        navigate(`/top/?topRange=${topRangeTag}&page=${currentPage}`);
      } else if ((currentPage === null) & (page > 1)) {
        url = `${apiUrl}/api-top-pics/?topRange=${topRangeTag}&page=${page}`;
        navigate(`/top/?topRange=${topRangeTag}&page=${page}`);
      } else {
        url = `${apiUrl}/api-top-pics/?topRange=${topRangeTag}`;
      }
    } else {
      if (currentPage != null) {
        url = isPageProvided
          ? `${apiUrl}/api-top-pics/?page=${currentPage}`
          : `${apiUrl}/api-top-pics/`;
        navigate(`/top/?page=${currentPage}`);
      } else if ((currentPage === null) & (page > 1)) {
        url = `${apiUrl}/api-top-pics/?page=${page}`;
        navigate(`/top/?page=${page}`);
      } else {
        url = `${apiUrl}/api-top-pics/`;
      }
    }

    topPics(url);
  }, [topRange, currentPage, page]);

  if (loading) {
    return (
      <div className="loading-s">
        <Loading />
      </div>
    );
  }
  return (
    <div style={{ margin: "0 8%" }}>
      <h1
        style={{ float: "left", color: "#00bda0", display: "inline" }}
        className="mb-5"
      >
        Top Pics
        <Dropdown onSelect={handleDropdownChange}>
          <Dropdown.Toggle
            className="btn-s custom-dropdown-button"
            size="sm"
            variant="success"
            id="dropdown-basic"
          >
            {topRange}
          </Dropdown.Toggle>

          <Dropdown.Menu className="custom-dropdown-menu" data-bs-theme="dark">
            {Object.entries(ranges).map(([key, value]) => (
              <Dropdown.Item
                as={Link}
                to={`?topRange=${key}`}
                eventKey={value}
                key={key}
                className={selectedRange === value ? "selected" : ""}
              >
                {value}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </h1>
      {pics_g && (
        <>
          <Items pics_g={pics_g} loading={loading} />
          <Pagination
            page={page}
            loading={loading}
            count={count}
            currentPage={currentPage}
            next={next}
            previous={previous}
          />
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  pics_g: state.pics.pics.results,
  loading: state.pics.pics_loading,
  currentPage: state.pages.currentPage,
  count: state.pics.pics.count,
  next: state.pics.pics.next,
  previous: state.pics.pics.previous,
});
export default connect(mapStateToProps, { topPics, setPage })(TopPics);
