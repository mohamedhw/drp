import { connect } from "react-redux";
import { useEffect } from "react";
import { relatedPics, resetPicsItems } from "../redux/action/pics";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Items from "../component/Items";
import Loading from "../component/Loading";
import { setCurrentPage, setPage } from "../redux/action/pages";


const RelatedPics = ({relatedPics, resetPicsItems, pics, hasMore, count, loading, currentPage, page}) => {

  const { postId } = useParams();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pageParam = currentPage || (queryParams.get("page") || 1);


  const buildUrl = () => {
    let url = `${apiUrl}/api-related/${postId}/`;
    if (pageParam) {
      url += `?page=${pageParam}`;
    }
    return url;
  };

  const fetchMoreData = async () => {
    if (pageParam === 1) {
      await resetPicsItems();
    }
    const url = buildUrl();
    if (hasMore || pageParam === 1) {
      await relatedPics(url);
      const nextPage = parseInt(pageParam) + 1;
      if (pageParam > 1) {
        navigate(`?page=${pageParam}`);
      }
      setCurrentPage(nextPage)
      setPage(nextPage)
    }
  };

  useEffect(()=>{
    setCurrentPage(1)
    fetchMoreData()
    setPage()
  }, [])

  if (loading) {
    return <Loading />;
  }
  return (
    <div style={{ margin: "0 8%" }}>
      <InfiniteScroll
        dataLength={pics.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<p className="mt-5 loading-more-result">Loading...</p>}
        endMessage={pics.length > 1 && <p className="mt-5 loading-more-result">No more items</p>}
      >
        {pics && <Items pics_g={pics} loading={false} title=""/>}
      </InfiniteScroll>
    </div>
  )

}

const mapStateToProps = (state) => ({
  pics: state.pics.pics,
  loading: state.pics.pics_loading,
  currentPage: state.pages.currentPage,
  page: state.pages.page,
  hasMore: state.pics.hasMore,
});

export default connect(mapStateToProps, {relatedPics, resetPicsItems})(RelatedPics)
