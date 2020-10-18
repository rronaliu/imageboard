import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import InputComment from "./InputComment";

const Post = ({ match }) => {
  useEffect(() => {
    getPost();
    console.log(match);
  }, []);

  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);

  const getPost = async () => {
    try {
      const response = await fetch(
        `/posts/${match.params.id}`
      );
      const post = await response.json();

      setPost(post.data.post);
      console.log(post.data.post);
      setComments(post.data.comments);
      console.log(post.data.comments);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <InputComment id={match.path} />
      <div className="text-left mt-5 mb-3 col">
        {/* <Link to={`/`} className="float-left m-4" style={{textDecoration: "none", color: "black"}}>
            Go back
            </Link> */}
        <div className="d-flex justify-content-between">
          <p>Id: {post.post_id}</p>
          <p>{post.created_at}</p>
        </div>

        <div className="">
          <a href={post.image} target="_blank">
            <img
              src={post.image}
              className="float-left col-md-3"
              style={{ maxWidth: "20rem" }}
            ></img>
          </a>

          <div className="m-3">
            <h5>{post.description}</h5>
            <p>{post.body}</p>
          </div>
        </div>
        
        {comments.map((comment) => (
          <div key={comment.cid} className="col-md-10 my-1">
                <div className="bg-dark pb-3" style={{overflow: "hidden"}}>
            <div className="d-flex justify-content-between mt-2 mx-2">
              <small>Id: {comment.cid}</small>
              <small> {comment.created_at}</small>
            </div>
            <div className="">
              {comment.image ? (
                <img
                  src={comment.image}
                  className="m-2 col-md-4 float-left"
                //   style={{ maxWidth: "14rem" }}
                />
              ) : (
                <div className="d-hidden"></div>
              )}
              <div className="ml-5 m-3">{comment.comment}</div>
                </div>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default Post;
