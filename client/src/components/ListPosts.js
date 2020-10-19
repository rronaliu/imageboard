import React, { Fragment, useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import '../App.css';
import {Link} from 'react-router-dom';


const ListPosts = () => {

  
  const [posts, setPosts] = useState([]);
  /* SEARCH BAR IMPLEMENTATION*/
  const [search, setSearch] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

    const getPosts = async() => {


        try {
            
            const response = await fetch("/posts");
            const jsonData = await response.json();

            setPosts(jsonData);
        } 
        
        catch (err) {
            console.error(err.message)
        }

    };


    // DELETE POST
    const deletePost = async id => {
      try {
          const response = await fetch(`/posts/${id}`, {
              method: "DELETE"
          });
          setPosts(posts.filter(post => post.post_id !== id));
      } catch (err) {
          console.error(err.message)
      }
  }
    

    useEffect(() => {
        getPosts();
    },[]);

    useEffect(() => {
      setFilteredPosts(
        posts.filter((post) =>
          (post.description|| '').toLowerCase().includes(search.toLowerCase())
        )
      );
    }, [search, posts]);



  return (
    <Fragment>
      
      <div className="row d-flex flex-row-reverse mt-2">
        <div className="col-md-2 ">
      <input
        className="form-control form-control-sm btn-dark"
        type="text"
        placeholder="Search Posts"
        onChange={(e) => setSearch(e.target.value)}
      />
      </div>
    </div>

    <div className="d-flex flex-wrap justify-content-around">
        {filteredPosts.map((post) => (
          
      <Card key={post.post_id} className="text-center col-md-4 col-lg-3 m-1 my-5 bg-dark" style={{ maxWidth: "18rem" }}>
        <button className="btn btn-outline-danger" onClick={() => deletePost(post.post_id)}>X</button>
        <Link to={`/posts/${post.post_id}`} style={{textDecoration: "none", color: "white"}}>
        <Card.Body>
        <Card.Img variant="top" src={post.image} />
          <Card.Title className="mt-3">{post.description}</Card.Title>
          <Card.Text  style={{
            overflow: "hidden",
            whiteSpace: "normal",
            height: "10em"
          }}>
            {post.body}
          </Card.Text>
          <small className="text-muted">{post.created_at}</small>
        </Card.Body>
        </Link>
      </Card>
      ))}
      </div>
    </Fragment>
  );
};

export default ListPosts;
