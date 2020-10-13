import React, { Fragment, useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import InputReplies from './InputReplies';
import ListReplies from './ListReplies';

const Post = ({ match }) => {
    useEffect(() => {
        getPost();
        console.log(match);
    },[]);


  const [post, setPost] = useState([]);

    const getPost = async() => {

        try {
            
            const response = await fetch(`http://localhost:5000/posts/${match.params.id}`);
            const post = await response.json();

            setPost(post);
            console.log(post);
        } 
        
        catch (err) {
            console.error(err.message)
        }

    };
    
  return (
    <Fragment>
        <div>
            <InputReplies />
            <p>Id: {post.post_id}</p>
            <a href={post.image} target="_blank">
            <img src={post.image} style={{maxWidth: "16rem"}}></img>
            </a>
            <h1>{post.description}</h1>
            <p>{post.body}</p>
            <p>{post.created_at}</p>
            <ListReplies />
        </div>

    </Fragment> 

  )
};

export default Post;
