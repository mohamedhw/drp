import { toast } from "react-toastify";
import { profile, profile_update, user_update } from "../redux/action/profile";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import { connect } from "react-redux";
import ProfileHead from "../component/ProfileHead";
import Loading from "../component/Loading";

const Profile = ({
  profile,
  profile_update,
  user_update,
  username_g,
  image_g,
  email_g,
  setShow,
  setCoverPic,
  loading,
}) => {
  const [data, setData] = useState({ username: "", email: "", image: null });
  const [placeholders, setPlaceholders] = useState({
    username: `${username_g}`,
    email: `${email_g}`,
    image: null,
  });
  const acceptedFileArray = [
    "image/x-png",
    "image/png",
    "image/jpg",
    "image/jpeg",
  ];
  const isImageFile = (file) => {
    return file && file.type.startsWith("image/");
  };
  const handelImage = (e) => {
    e.preventDefault();

    const file = e.target.files[0];
    if (file && isImageFile(file) && acceptedFileArray.includes(file.type)) {
      setData({ ...data, image: file });
    } else {
      e.target.value = null; // Reset file input
      toast(
        "Invalid file type. Please select a valid image (png, x-png, jpg, jpeg",
        { type: "error" },
      );
    }
  };

  const notifyError = () => {
    toast.error("Error: Could not update the profile!");
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    let form_data = new FormData();
    if (data.image && data.email && data.username) {
      form_data.append("image", data.image);
      await user_update(data.username, data.email);
      await profile_update(form_data);
    } else if (data.username && data.email) {
      await user_update(data.username, data.email);
    } else if (data.image && data.username) {
      form_data.append("image", data.image);
      await user_update(data.username, email_g);
      await profile_update(form_data);
    } else if (data.image && data.email) {
      form_data.append("image", data.image);
      await user_update(username_g, data.email);
      await profile_update(form_data);
    } else if (data.image) {
      form_data.append("image", data.image);
      await profile_update(form_data);
    } else if (data.username) {
      await user_update(data.username, email_g);
    } else if (data.email) {
      await user_update(username_g, data.email);
    } else {
      notifyError();
    }
    await profile();
    document.getElementById("up-profile").reset();
    setData({ username: "", email: "", image: null });
  };

  useEffect(() => {
    profile();
    setPlaceholders({ username: username_g, email: email_g });
  }, [username_g, image_g]);

  return (
    <div className="mt-5">
      {loading ? (
        <Loading />
      ) : (
        <ProfileHead
          username={username_g}
          image={image_g}
          setShow={setShow}
          setCoverPic={setCoverPic}
        />
      )}
      <Container>
        <form onSubmit={handelSubmit} id="up-profile">
          <div className="form-group m-lg-4 m-2 p-lg-1 pt-3">
            <input
              className="form-control"
              type="text"
              placeholder={placeholders.username}
              name="username"
              onChange={(e) => setData({ ...data, username: e.target.value })}
            />
          </div>
          <div className="form-group m-lg-4 m-2 p-lg-1 pt-3">
            <input
              className="form-control"
              type="email"
              placeholder={placeholders.email}
              name="email"
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </div>
          <div className="form-group m-lg-4 m-2 p-lg-1 pt-3">
            <input
              id="profileimage"
              className="form-control"
              type="file"
              accept="image/*"
              name="image"
              onChange={(e) => handelImage(e)}
            />
          </div>
          <div className="mt-5 m-1">
            <button
              style={{ display: "inline-block" }}
              type="submit"
              className="btn btn-outline-success btn-s px-4 mt-3"
            >
              Update
            </button>
            <span className="m-lg-5 m-md-2 m-sm-1"></span>
            <div
              className="p-1"
              style={{ display: "inline-block", verticalAlign: "bottom" }}
            >
              <a href="/reset_password/">
                <b>forgot your password?</b>
              </a>
            </div>
          </div>
        </form>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  username_g: state.profile.username,
  image_g: state.profile.image,
  email_g: state.profile.email,
  user_global: state.profile.user,
  pics_: state.pics.authorPics,
  Loading: state.profile.loading,
});

export default connect(mapStateToProps, {
  profile,
  profile_update,
  user_update,
})(Profile);
