import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { topPics } from "../redux/action/pics";
import Pagination from "../component/Pagination";
import Items from "../component/Items";
import Loading from "../component/Loading";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { setCurrentPage } from "../redux/action/pages";

const TopPics = ({
  pics_g,
  loading,
  topPics,
  currentPage,
  setCurrentPage,
  count,
  next,
  previous,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const apiUrl = import.meta.env.VITE_API_URL;
  let ranges = {
    "1d": "Last Day",
    "3d": "Last 3 Days",
    "1w": "Last Week",
    "1M": "Last Month",
    "6M": "Last 6 Months",
    "all": "All",
  };

  const queryParams = new URLSearchParams(location.search);
  const pageParam = currentPage || queryParams.get("page");
  const topRangeParam = queryParams.get("topRange");

  const [topRange, setTopRange] = useState("Last Month");
  const [selectedRange, setSelectedRange] = useState("Last Month");

  const handleDropdownChange = (eventKey) => {
    setTopRange(ranges[eventKey]);
    setSelectedRange(ranges[eventKey]);
    setCurrentPage(0);
    navigate(`?topRange=${topRange}`);
  };

  const buildUrl = () => {
    let url = `${apiUrl}/api-top-pics/`;
    let params = "?";
    if (topRangeParam) {
      setTopRange(ranges[topRangeParam] || "Last Month");
      setSelectedRange(ranges[topRangeParam] || "Last Month");
      url += `?topRange=${topRangeParam}`;
      params += `topRange=${topRangeParam}`;
      if (pageParam) {
        url += `&page=${pageParam}`;
        params += `&page=${pageParam}`;
      }
      navigate(`${params}`);
    } else {
      if (pageParam) {
        url += `?page=${pageParam}`;
        params += `page=${pageParam}`;
      }
      navigate(`${params}`);
    }
    return url;
  };

  useEffect(() => {
    const url = buildUrl();
    topPics(url);
  }, [topRange, pageParam, topRangeParam]);

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
            page={pageParam || 1}
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
export default connect(mapStateToProps, { topPics, setCurrentPage })(TopPics);
