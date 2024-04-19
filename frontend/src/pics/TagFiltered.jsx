import { connect } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { tagpics } from "../redux/action/pics";
import Loading from "../component/Loading";
import Items from "../component/Items";
import Pagination from "../component/Pagination"

const TagFiltered = ({ pics_g, next, previous, currentPage, count, tagpics, loading }) => {
  const { tagSlug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get("page");

  let apiUrl = `${import.meta.env.VITE_API_URL}/api-tag/${tagSlug}/`;

  useEffect(() => {
    
    if (currentPage != null) {
      apiUrl += `?page=${currentPage}`;
      navigate(`/tag/${tagSlug}/?page=${currentPage}`);
    } else if (page && page > 1) {
      apiUrl += `?page=${page}`;
      navigate(`/tag/${tagSlug}/?page=${page}`);
    } else {
      navigate(`/tag/${tagSlug}/`);
    }

    tagpics(apiUrl);
  }, [currentPage]);

  if (loading) {
    return <div className='loading-s'><Loading /></div>;
  }
  return (
    <div style={{ margin: "0 8%" }}>
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
  pics_g: state.pics.taged.results,
  currentPage: state.pages.currentPage,
  count: state.pics.taged.count,
  next: state.pics.taged.next,
  previous: state.pics.taged.previous,
  loading: state.pics.taged_loading,
});
export default connect(mapStateToProps, { tagpics })(TagFiltered);
