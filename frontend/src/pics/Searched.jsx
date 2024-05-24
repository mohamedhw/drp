import Items from "../component/Items";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { search } from "../redux/action/pics";
import Pagination from "../component/Pagination";
import Loading from "../component/Loading";
import { setCurrentPage } from "../redux/action/pages";

const Searched = ({
  pics_g,
  loading,
  setCurrentPage,
  currentPage,
  search,
  count,
  previous,
  next,
}) => {

  const navigate = useNavigate();
  const location = useLocation();


  const queryParams = new URLSearchParams(location.search);
  const q = queryParams.get("q");
  const pageParam = currentPage || queryParams.get("page");

  const apiUrl = import.meta.env.VITE_API_URL;

  const buildUrl = () => {
    let url = `${apiUrl}/api-pics/?q=${q}`;
    let params = `?q=${q}`;

    if (pageParam) {
      url += `&page=${pageParam}`;
      params += `&page=${pageParam}`;
    }

    navigate(params);
    return url;
  };

  useEffect(() => {
    const url = buildUrl()
    search(url)
  }, [pageParam]);

  if (loading) {
    return (
      <div className="loading-s">
        <Loading />
      </div>
    );
  }

  return (
    <div style={{ margin: "0 8%" }}>
      {pics_g && (
        <>
          <h4 className="m-4">Number of results {count}</h4>
          <Items pics_g={pics_g} loading={loading} />
          <Pagination
            page={pageParam}
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
  pics_g: state.pics.searched.results,
  loading: state.pics.searched_loading,
  currentPage: state.pages.currentPage,
  count: state.pics.searched.count,
  next: state.pics.searched.next,
  previous: state.pics.searched.previous,
});

export default connect(mapStateToProps, { search, setCurrentPage })(Searched);
