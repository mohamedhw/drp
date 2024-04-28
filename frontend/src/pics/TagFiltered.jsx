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
  const pageParam = currentPage || queryParams.get("page");

  const apiUrl = import.meta.env.VITE_API_URL;

  const buildUrl = () => {
    let url = `${apiUrl}/api-tag/${tagSlug}/`;
    let params = "";

    if (pageParam) {
      url += `?page=${pageParam}`;
      params += `?page=${pageParam}`;
    }

    navigate(params);
    return url;
  };
  useEffect(() => {
    const url = buildUrl()   
    tagpics(url);
  }, [pageParam]);

  if (loading) {
    return <div className='loading-s'><Loading /></div>;
  }
  return (
    <div style={{ margin: "0 8%" }}>
      {pics_g && (
        <>
          <Items pics_g={pics_g} loading={loading} />
          <Pagination
            page={pageParam}
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
