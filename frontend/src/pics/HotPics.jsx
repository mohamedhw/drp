import { connect } from "react-redux";
import { useEffect } from "react";
import { hotPics, resetPicsItems } from "../redux/action/pics";
import { useNavigate, useLocation } from "react-router-dom";
import { setCurrentPage, setPage } from "../redux/action/pages";
import InfiniteScroll from "react-infinite-scroll-component";
import Items from "../component/Items";
import Loading from "../component/Loading";
import UpButton from "../component/UpButton";
import FilterBar from "../component/FilterBar";

const HotPics = ({
  pics,
  hasMore,
  loading,
  currentPage,
  page,
  setCurrentPage,
  setPage,
  hotPics,
  resetPicsItems,
}) => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pageParam = currentPage || queryParams.get("page") || 1;

  const routeParam = location.pathname.split("/").filter(Boolean).pop();

  const buildUrl = () => {
    let url = `${apiUrl}/api-hot/`;
    if (pageParam) {
      url += `?page=${pageParam}`;
    }
    return url;
  };

  const fetchMoreData = async () => {
    const url = buildUrl();
    if (pageParam === 1) {
      await resetPicsItems();
    }
    if (hasMore || pageParam === 1) {
      await hotPics(url);
      const nextPage = parseInt(pageParam) + 1;
      if (pageParam > 1) {
        navigate(`?page=${pageParam}`);
      }
      setCurrentPage(nextPage);
      setPage(nextPage)
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    fetchMoreData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div style={{ margin: "0 8%" }}>
      <FilterBar />
      <InfiniteScroll
        dataLength={pics.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<p className="mt-5 loading-more-result">Loading...</p>}
        endMessage={
          pics.length > 1 && (
            <p className="mt-5 loading-more-result">No more items</p>
          )
        }
      >
        {pics && <Items pics_g={pics} loading={false} title="Hot Pics" />}
      </InfiniteScroll>
      <UpButton />
    </div>
  );
};

const mapStateToProps = (state) => ({
  pics: state.pics.pics,
  loading: state.pics.pics_loading,
  hasMore: state.pics.hasMore,
  currentPage: state.pages.currentPage,
  page: state.pages.page
});

export default connect(mapStateToProps, {
  hotPics,
  resetPicsItems,
  setCurrentPage,
  setPage,
})(HotPics);
