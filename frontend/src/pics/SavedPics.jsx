import { useEffect, useState } from "react";
import { connect } from "react-redux";
import ProfileHead from "../component/ProfileHead";
import { Link } from "react-router-dom";
import { savedpics } from "../redux/action/pics";
import SliceItems from "../component/SliceItems";
import Loading from "../component/Loading";

const SavedPics = ({
  savedpics,
  username_g,
  image_g,
  pics,
  pics_,
  loading,
}) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const url = `${apiUrl}/api-saved-pics/`;
  let slicePics = pics && pics.slice(0, 8);

  useEffect(() => {
    savedpics(url);
  }, [username_g, image_g]);

  let picsView = <></>;
  if (pics && pics.length === 0) {
    picsView = <h2>no pics</h2>;
  } else {
    picsView = (
      <>
        <SliceItems pics_g={slicePics} />
        {pics && pics.length > 8 ? (
          <div>
            <Link to={`/userallpics/${username_g}`}>
              <button className="btn btn-outline-success btn-s px-lg-5 mb-5 mt-3">
                More results
              </button>
            </Link>
          </div>
        ) : (
          <></>
        )}
      </>
    );
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {pics && (
        <div className="mt-4">
          <ProfileHead
            username={username_g}
            image={image_g}
            loading={loading}
          />
          {picsView}
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  username_g: state.profile.username,
  image_g: state.profile.image,
  pics_: state.pics.savedPics,
  pics: state.pics.savedPics.results,
  loading: state.pics.loading,
});

export default connect(mapStateToProps, { savedpics })(SavedPics);
