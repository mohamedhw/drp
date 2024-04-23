import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { authorPics } from "../redux/action/pics";
import ProfileHead from "../component/ProfileHead";
import { useParams, Link } from "react-router-dom";
import SliceItems from "../component/SliceItems";
import Loading from "../component/Loading";

const UserPics = ({
  authorPics,
  pics,
  pics_,
  username_g,
  image_g,
  loading,
}) => {

  const apiUrl = import.meta.env.VITE_API_URL;
  const { authorname } = useParams();
  const url = `${apiUrl}/api-user-posts/${authorname}/`;
  const [profileHead, setProfileHead] = useState(<></>);
  let slicePics = pics && pics.slice(0, 8);

  useEffect(() => {
    authorPics(url);
    if (username_g === authorname) {
      setProfileHead(<ProfileHead username={authorname} image={image_g} />);
    } else {
      setProfileHead(
        <ProfileHead
          username={authorname}
          image={pics && pics[0].author_image}
        />,
      );
    }
  }, [authorname, username_g]);

  let picsView = <></>;

  if (pics && pics.length === 0) {
    picsView = <h2>no pics</h2>;
  } else {
    picsView = (
      <>
        <div className={username_g !== authorname && 'mt-4'}>
          <SliceItems pics_g={slicePics}/>
        </div>

        {pics && pics.length > 8 ? (
          <div>
            <Link to={`/userallpics/${authorname}`}>
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
          {profileHead}
          {picsView}
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  pics_: state.pics.author_pics,
  pics: state.pics.author_pics.results,
  username_g: state.profile.username,
  image_g: state.profile.image,
  loading: state.pics.loading,
});

export default connect(mapStateToProps, { authorPics })(UserPics);
