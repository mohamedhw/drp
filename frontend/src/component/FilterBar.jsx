import { Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { setCurrentPage } from "../redux/action/pages";
import { setTopRange, resetPicsItems } from "../redux/action/pics";
import { connect } from "react-redux";
import { useEffect, useState } from "react";

const FilterBar = ({
  setCurrentPage,
  setTopRange,
  resetPicsItems,
  topRange,
  currentPage,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const routeParam = location.pathname.split("/").filter(Boolean).pop();

  const queryParams = new URLSearchParams(location.search);
  const topRangeParam = queryParams.get("topRange");

  const filters = {
    top: "Top",
    random: "Random",
    latest: "Latest",
  };

  const [filter, setFilter] = useState(filters[routeParam] || "Latest");
  const [selectedFilter, setSelectedFilter] = useState(filters[routeParam] || "Latest");

  const handleFiltersDropdownChange = (eventKey) => {
    setFilter(eventKey);
    setSelectedFilter(eventKey);
    setCurrentPage(1);
  };

  useEffect(()=>{
    if(routeParam !== filter || selectedFilter){
      setFilter(filters[routeParam] || "Latest");
      setSelectedFilter(filters[routeParam] || "Latest");
      setCurrentPage(1);
    }
  }, [routeParam])

  const ranges = {
    "1d": "Last Day",
    "3d": "Last 3 Days",
    "1w": "Last Week",
    "1M": "Last Month",
    "6M": "Last 6 Months",
    all: "All",
  };

  const [selectedRange, setSelectedRange] = useState(
    ranges[topRangeParam] || "Last Month",
  );
  const handleRangeDropdownChange = (eventKey) => {
    setTopRange(eventKey);
    setSelectedRange(eventKey);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (routeParam === "top" && !selectedRange) {
      setTopRange(ranges[topRangeParam] || ranges["1M"]);
      setSelectedRange(ranges[topRangeParam] || ranges["1M"]);
    } else {
      setTopRange(ranges[topRangeParam] || ranges["1M"]);
    }
  }, []);

  return (
    <Navbar expand="lg" className="navbar-dark pt-0">
      <Container>
        <Navbar.Toggle
          className="filters-toggle"
          aria-controls="Filters-navbar-nav"
        >
          Filters
        </Navbar.Toggle>
        <Navbar.Collapse
          id="Filters-navbar-nav"
          className="justify-content-center"
        >
          <Nav>
            <Dropdown className="mx-1" onSelect={handleFiltersDropdownChange}>
              <Dropdown.Toggle
                className="btn-s custom-dropdown-button"
                size="lg"
                variant="success"
                id="dropdown-basic"
              >
                {filter}
              </Dropdown.Toggle>

              <Dropdown.Menu
                className="custom-dropdown-menu"
                data-bs-theme="dark"
              >
                {Object.entries(filters).map(([key, value]) => (
                  <Dropdown.Item
                    as={Link}
                    to={`/${key}`}
                    eventKey={value}
                    key={key}
                    className={selectedFilter === value ? "selected" : ""}
                    active={value === selectedFilter}
                  >
                    {value}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            {routeParam == "top" && (
              <Dropdown className="mx-1" onSelect={handleRangeDropdownChange}>
                <Dropdown.Toggle
                  className="btn-s custom-dropdown-button"
                  size="lg"
                  variant="success"
                  id="dropdown-basic"
                >
                  {topRange}
                </Dropdown.Toggle>

                <Dropdown.Menu
                  className="custom-dropdown-menu"
                  data-bs-theme="dark"
                >
                  {Object.entries(ranges).map(([key, value]) => (
                    <Dropdown.Item
                      as={Link}
                      to={`?topRange=${key}`}
                      eventKey={value}
                      key={key}
                      className={selectedRange === value ? "selected" : ""}
                      active={value === selectedFilter}
                    >
                      {value}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
const mapStateToProps = (state) => ({
  topRange: state.pics.top_range,
  currentPage: state.pages.currentPage,
});

export default connect(mapStateToProps, {
  setCurrentPage,
  setTopRange,
  resetPicsItems,
})(FilterBar);
