import { connect } from "react-redux";
import { useEffect } from "react";
import { randomPics, resetPicsItems } from "../redux/action/pics";
import { setCurrentPage, setPage } from "../redux/action/pages";
import { useNavigate, useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Items from "../component/Items";
import Loading from "../component/Loading";
import FilterBar from "../component/FilterBar";
import UpButton from "../component/UpButton";

const RandomPics = ({
  hasMore,
  setCurrentPage,
  setPage,
  currentPage,
  page,
  pics,
  loading,
  randomPics,
  resetPicsItems
}) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pageParam = currentPage || (queryParams.get("page") || 1);

  const buildUrl = () => {
    let url = `${apiUrl}/api-random-pics/`;
    let params = "";
    if (pageParam) {
      url += `?page=${pageParam}`;
      params += `?page=${pageParam}`;
    }
    return url;
  };

  const fetchMoreData = async () => {
    const url = buildUrl();
    if (pageParam === 1 ) {
      await resetPicsItems();
    }
    if (hasMore || pageParam === 1) {
      await randomPics(url);
      const nextPage = parseInt(pageParam) + 1;
      if (pageParam > 1) {
        navigate(`?page=${pageParam}`);
      }
      setCurrentPage(nextPage)
      setPage(nextPage)
    }
  };

  useEffect(() => {
    setPage()
    setCurrentPage()
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
        endMessage={pics.length > 1 && <p className="mt-5 loading-more-result">No more items</p>}
      >
        {pics && <Items pics_g={pics} loading={false} title="Random Pics" />}
      </InfiniteScroll>
      <UpButton />
    </div>
  );
};

const mapStateToProps = (state) => ({
  pics: state.pics.pics,
  loading: state.pics.pics_loading,
  currentPage: state.pages.currentPage,
  page: state.pages.page,
  hasMore: state.pics.hasMore,
});

export default connect(mapStateToProps, { randomPics, resetPicsItems, setCurrentPage, setPage })(RandomPics);

