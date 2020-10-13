import React, { Fragment, useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import '../App.css';



const ListReplies = () => {

  const [replies, setReplies] = useState([])
  const [slug] = useState([]);

    const getReplies = async() => {

        try {
            
            const response = await fetch(`http://localhost:5000/posts/${slug}/replies`);
            const replies = await response.json();

            setReplies(replies);
            console.log(replies);
        } 
        
        catch (err) {
            console.error(err.message)
        }

    };

    useEffect(() => {
        getReplies();
    },[]);


    return (
        <Fragment>
        <div>
            {replies && replies.map((reply) => (
                <div>
                <div>{reply.reply_id}</div>
                <div>{reply.image}</div>
                <div>{reply.body}</div>
                <div>{reply.created_at}</div>
                </div>
            ))};
        </div>
        </Fragment>
    );
};
export default ListReplies;