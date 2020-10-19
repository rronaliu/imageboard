import React, { Fragment, useState } from "react";
import { useLocation, useParams, useHistory } from "react-router-dom";



const InputComment = () => {
  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();

  const [comment, setComment] = useState("");
  // Image upload
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  
  const uploadImage = async e => {

    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'kovvelyb')
    setLoading(true)
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/imageboard-cloud/image/upload',
      {
        method: "POST",
        body: data
      }
    )
    const file = await res.json()

    setImage(file.secure_url)
    setLoading(false)
  }

  const onSubmitForm = async e => {
      e.preventDefault();

      try {
          const commentBody = {comment, image};
          const response = await fetch(`/posts/${id}/addComment`, {
              method: "POST",
              headers: { "Content-Type" : "application/json"},
              body: JSON.stringify(commentBody),
          });
          
      } catch (err) {
          console.error(err.message)
      }
      history.push("/");
      // history.push(location.pathname);
  }

  return (
    <Fragment>
      <div className="col-md-6 m-auto">
      <h1 className="text-center mt-5">Post Something</h1>
      <form className="text-center mt-5" onSubmit={onSubmitForm}>
        <textarea
          type="text"
          className="form-control btn-dark m-2"
          rows="3"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <input 
          type="file"
          name="file"
          placeholder="Upload an image"
          onChange={uploadImage}
          
          className="m-2"
        />
        {loading ? (
          <h3>Loading...</h3>
        ): (
          <img src={image} style={{width:'180px'}} />
        )}
        <button className="btn btn-dark btn-block m-2">Post</button>
      </form>
      </div>
    </Fragment>
  );
};

export default InputComment;
