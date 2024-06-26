// import { connect } from "react-redux";
// import { useEffect } from "react";
// import { pics } from "../redux/action/pics";
// import Pagination from "../component/Pagination";
// import Items from "../component/Items";
// import { useNavigate, useLocation } from "react-router-dom";
// import { setPage, setCurrentPage } from "../redux/action/pages";
// import Loading from "../component/Loading";
//
// const Home = ({
//   pics_g,
//   loading,
//   pics,
//   currentPage,
//   count,
//   next,
//   previous,
// }) => {
//
//   const apiUrl = import.meta.env.VITE_API_URL;
//   const navigate = useNavigate();
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const pageParam = currentPage || queryParams.get("page"); // Default to page 1 if 'page' query parameter is not provided
//
//   const buildUrl = () => {
//     let url = `${apiUrl}/api-post/`;
//     let params = "";
//
//     if (pageParam) {
//       url += `?page=${pageParam}`;
//       params += `?page=${pageParam}`;
//     }
//
//     navigate(`${params}` || '/');
//     return url;
//   };
//
//   useEffect(() => {
//     const url = buildUrl();
//     pics(url);
//   }, [pageParam]);
//
//   if (loading) {
//     return (
//       <div className="loading-s">
//         <Loading />
//       </div>
//     );
//   }
//
//   return (
//     <div style={{ margin: "0 8%" }}>
//       {pics_g && (
//         <>
//           <Items pics_g={pics_g} loading={loading} />
//           <Pagination
//             page={pageParam}
//             loading={loading}
//             count={count}
//             currentPage={currentPage ? currentPage : 1}
//             next={next}
//             previous={previous}
//           />
//         </>
//       )}
//     </div>
//   );
// };
//
// const mapStateToProps = (state) => ({
//   pics_g: state.pics.pics.results,
//   loading: state.pics.pics_loading,
//   currentPage: state.pages.currentPage,
//   count: state.pics.pics.count,
//   next: state.pics.pics.next,
//   previous: state.pics.pics.previous,
// });
//
// export default connect(mapStateToProps, { pics, setPage, setCurrentPage })(
//   Home,
// );
