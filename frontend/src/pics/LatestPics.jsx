import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { latestPics, resetPicsItems } from "../redux/action/pics";
import { useNavigate, useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Items from "../component/Items";
import Loading from "../component/Loading";
import FilterBar from "../component/FilterBar";
import UpButton from "../component/UpButton";
import { setCurrentPage } from "../redux/action/pages";


const LatestPics = ({ hasMore, pics, currentPage, setCurrentPage, loading, resetPicsItems, latestPics}) => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pageParam = currentPage || (queryParams.get("page") || 1);

  const buildUrl = () => {
    let url = `${apiUrl}/api-latest/`;
    if (pageParam) {
      url += `?page=${pageParam}`;
    }
    return url;
  };

  const fetchMoreData = async () => {
    const url = buildUrl();
    if (pageParam === 1 ) {
      await resetPicsItems();
    }
    if (hasMore || pageParam === 1) {
      await latestPics(url);
      const nextPage = parseInt(pageParam) + 1;
      if (pageParam > 1) {
        navigate(`?page=${pageParam}`);
      }
      setCurrentPage(nextPage)
    }
  };

  useEffect(() => {
    fetchMoreData();
    setCurrentPage(1)
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
        endMessage={<p className="mt-5 loading-more-result">No more items</p>}
      >
        {pics && <Items pics_g={pics} loading={false} />}
      </InfiniteScroll>
      <UpButton />
    </div>
  );
};

const mapStateToProps = (state) => ({
  pics: state.pics.pics,
  loading: state.pics.pics_loading,
  currentPage: state.pages.currentPage,
  hasMore: state.pics.hasMore,
});

export default connect(mapStateToProps, { latestPics, resetPicsItems, setCurrentPage })(
  LatestPics,
);
