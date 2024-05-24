import { connect } from "react-redux";
import { useEffect } from "react";
import { topPics, resetPicsItems } from "../redux/action/pics";
import { useNavigate, useLocation } from "react-router-dom";
import { setCurrentPage, setPage } from "../redux/action/pages";
import InfiniteScroll from "react-infinite-scroll-component";
import Items from "../component/Items";
import Loading from "../component/Loading";
import UpButton from "../component/UpButton";
import FilterBar from "../component/FilterBar"

const TopPics = ({
  pics,
  hasMore,
  loading,
  currentPage,
  page,
  setCurrentPage,
  setPage,
  topPics,
  resetPicsItems,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const apiUrl = import.meta.env.VITE_API_URL;

  const queryParams = new URLSearchParams(location.search);
  const pageParam = currentPage || queryParams.get("page") || 1;
  const topRangeParam = queryParams.get("topRange");

  const buildUrl = () => {
    let url = `${apiUrl}/api-pics/?type=top`;
    let params = "?";
    if (topRangeParam) {
      url += `&topRange=${topRangeParam}`;
      params += `topRange=${topRangeParam}`;
      if (pageParam) {
        url += `&page=${pageParam}`;
      }
    } else {
      if (pageParam) {
        url += `&page=${pageParam}`;
        params += `page=${pageParam}`;
      }
    }
    return url;
  };

  const fetchMoreData = async () => {
    const url = buildUrl();
    if (pageParam === 1) {
      await resetPicsItems();
    }
    if (hasMore || pageParam === 1) {
      await topPics(url);
      const nextPage = parseInt(pageParam) + 1;
      if (pageParam > 1) {
        if (topRangeParam){
          navigate(`?topRange=${topRangeParam}&page=${pageParam}`);
        }else{
          navigate(`?page=${pageParam}`);
        }
      }
      setCurrentPage(nextPage);
      setPage(nextPage)
    }
  };

  useEffect(() => {
    setPage()
    setCurrentPage()
    fetchMoreData();
  }, [topRangeParam]);


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
        endMessage={pics.length > 1 && <p className="mt-5 loading-more-result">No more items</p>}
      >
        {pics && <Items pics_g={pics} loading={false} title="Top Pics" />}
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
export default connect(mapStateToProps, { topPics, resetPicsItems, setCurrentPage, setPage })(TopPics);
