import React, { Fragment, useState } from "react";

const InputReplies = () => {
  const [ slug ] = useState("");
  const [body, setBody] = useState("");

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
          const replyBody = { body, image, slug };
          const response = await fetch(`http://localhost:5000/posts/${slug}/reply`, {
              method: "POST",
              headers: { "Content-Type" : "application/json"},
              body: JSON.stringify(replyBody),
          });
          
        window.location= `/`;
      } catch (err) {
          console.error(err.message)
      }
  }

  return (
    <Fragment>
      <h1 className="text-center mt-5">Post Something</h1>
      <form className="text-center mt-5" onSubmit={onSubmitForm}>
        <textarea
          type="text"
          className="form-control m-2"
          rows="3"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
        <input 
          type="file"
          name="file"
          placeholder="Upload an image"
          onChange={uploadImage}
          className="mb-2"
        />
        {loading ? (
          <h3>Loading...</h3>
        ): (
          <img src={image} style={{width:'180px'}} />
        )}
        <button className="btn btn-secondary btn-block">Post</button>
      </form>
    </Fragment>
  );
};

export default InputReplies;
