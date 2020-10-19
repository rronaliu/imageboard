const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/client/build"));

// if(process.env.NODE_ENV === "production") {
//   // server static content
//   //npm run build
//   app.use(express.static(path.join(__dirname, "client/build")));
// }

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

    const comments = await pool.query(
      "select * from comments where post_id = $1",
      [req.params.id]);

    // res.json(post.rows[0]);
    // res.json(comments.rows);
    res.status(200).json({
      status: "success",
      data: {
        post: post.rows[0],
        comments: comments.rows,
      },
    });
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

// COMMENTS

// ADD COMMENT
app.post("/posts/:id/addComment", async (req, res) => {
  try {
    const { comment, image } = req.body;
    const newComment = await pool.query(
      "INSERT INTO comments (comment, image, post_id) VALUES ($1, $2, $3) RETURNING *",
      [ comment, image, req.params.id]
    );

    res.json(newComment.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});


app.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`);
});


