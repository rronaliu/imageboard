const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json());

// ROUTES //

// create a post

app.post("/posts", async (req, res) => {
  try {
    const { description, body, image } = req.body;
    const newPost = await pool.query(
      "INSERT INTO post (description, body, image ) VALUES ($1, $2, $3) RETURNING *",
      [description, body, image]
    );

    res.json(newPost.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// get all posts

app.get("/posts", async (req, res) => {
  try {
    const allPosts = await pool.query("SELECT * FROM post ORDER BY post_id DESC");
    res.json(allPosts.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get a post
app.get("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await pool.query("SELECT * FROM post WHERE post_id = $1" , [
      id,
    ]);

    res.json(post.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// delete post

app.delete("/posts/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const deletePost = await pool.query("DELETE FROM post WHERE post_id = $1", [
            id
        ]);
        res.json("Post was deleted");
    } catch (err) {
        console.error(err.message);
    }
});

// REPLIES

// create a reply

app.post("/posts/:id/reply",async (req, res) => {
  try {
    const {slug, body, image } = req.body;
    const parentReplyId = parseInt(req.body.parentReplyId);
    const newReply = await pool.query(
      "INSERT INTO reply (slug, body, image, parent_reply_id ) VALUES ($1, $2, 3$) RETURNING *",
      [slug, body, image, parent_reply_id]
    );

    res.json(newReply.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});


// get all replies

app.get("/posts/:id/replies",async (req, res) => {

  try {
    const slug = req.params.slug
    const allReplies = await pool.query("SELECT * FROM reply WHERE slug = 1$ ORDER BY reply_id DESC");
    res.json(allReplies.rows);
  } catch (err) {
    console.error(err.message);
  }
});



app.listen(5000, () => {
  console.log("server has started on port 5000");
});


