import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import Container from "react-bootstrap/esm/Container";
import { tags, tag_suggestion } from "../redux/action/pics";
import { setCurrentPage } from "../redux/action/pages";
import Form from "react-bootstrap/Form";
import { IoIosCloseCircle } from "react-icons/io";
import Badge from "react-bootstrap/Badge";
import Loading from "../component/Loading";
import ProgressBar from "react-bootstrap/ProgressBar";

const Create = ({
  user_g,
  tag_suggestion,
  tag_suggestions,
  setCurrentPage,
}) => {
  const user = user_g;
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [tag, setTag] = useState([]);
  const [tempTag, setTempTag] = useState();
  const [handleErr, setErr] = useState(null);
  const [qs, setQs] = useState([]);
  const [progress, setProgress] = useState();
  const submitBtn = document.getElementById("create-sub-btn");

  useEffect(() => {
    tag_suggestion(qs);
  }, [qs]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // setIsLoading(true);
    let form_data = new FormData();
    form_data.append("author", user);
    form_data.append("image", image);
    form_data.append("tag", tag);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        const percentCompleted = Math.round((loaded / total) * 100);
        setProgress(percentCompleted);
      },
    };
    axios
      .post(`${apiUrl}/api-create/`, form_data, config)
      .then((response) => {
        setIsLoading(false);
        setErr(null);
        setCurrentPage();
        navigate("/");
      })
      .catch((err) => {
        setErr(err.message);
      });
  };
  const removeTags = (e) => {
    setTag(tag.filter((_, index) => index != e));
  };

  const addTag = (e) => {
    setQs(e.target.value);
    setTempTag(e.target.value);
    if (e.key === "Enter") {
      if (e.target.value != "") {
        setTag([...tag, e.target.value]);
        e.target.value = "";
      } else if (e.target.value === "") {
        submitBtn.click();
      }
      setTempTag();
      setQs([])
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Container>
      {handleErr && { handleErr }}
      <Form className="mt-5" onSubmit={handleSubmit}>
        <Form.Group className="mb-5">
          <input
            type="file"
            className="form-control"
            accept="image/png, image/jpeg"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
        </Form.Group>
        <Form.Group>
          <ul className="tags-list-ul">
            {tag &&
              tag.map((tag_, index) => (
                <li className="mx-1" key={index}>
                  <Badge bg="success" className="tag-bg my-1 p-1">
                    {tag_}
                    <IoIosCloseCircle
                      onClick={() => removeTags(index)}
                      className="close-ic"
                      style={{marginLeft: "1ch"}}
                    />
                  </Badge>
                </li>
              ))}
          </ul>
        </Form.Group>
        <Form.Group className="mb-5 p-1 tags-input form-control">
          <input
            id="tag-in"
            data-role="tagsinput"
            className="form-control"
            list="tag-list"
            type="text"
            placeholder="tag"
            onKeyDown={(e) => {
              if (e.key === "Enter") e.preventDefault();
            }}
            onKeyUp={addTag}
          />
          {tag_suggestions && (
            <datalist id="tag-list" className="mt-5 m-3">
              {tag_suggestions.slice(0, 6).map((item) => (
                <option key={item.tag_slug} value={item.tag}></option>
              ))}
            </datalist>
          )}
        </Form.Group>

        {progress ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ProgressBar
              variant="success"
              now={progress}
              label={`${progress}%`}
              style={{ width: "30%" }}
            />
          </div>
        ) : (
          <input
            id="create-sub-btn"
            className="btn btn-outline-success btn-s px-4"
            type="submit"
            value="Post"
            onClick={() => {
              if (tempTag) {
                setTag([...tag, tempTag]);
              }
            }}
          />
        )}
      </Form>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  user_g: state.profile.user,
  tags_g: state.pics.tags,
  tag_suggestions: state.pics.tag_suggestion.results,
});

export default connect(mapStateToProps, {
  tags,
  tag_suggestion,
  setCurrentPage,
})(Create);
