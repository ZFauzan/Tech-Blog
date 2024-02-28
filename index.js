// This document is for the actual API
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

let lastId = 3;
const options = {month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'};

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//STEP 1: GET All posts
app.get("/posts", (req, res) => {
  res.json(posts);
});

//STEP 2: GET a specific post by id
app.get("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const foundPost = posts.find((post) => post.id === id);
  res.json(foundPost);
});

//STEP 3: POST a new post
app.post("/posts", (req, res) => {
  const newId = lastId += 1;
  const newPost = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date().toLocaleString("en-US", options),
  };
  lastId = newId;
  posts.push(newPost);
  res.status(201).json(newPost);
});

//STEP 4: PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const existingPost = posts.find((post) => post.id === id);
  if (!existingPost) return res.status(404).json({ message: "Post not found." });

  // if req.body.title exists (if user has entered/changed a title), then existingPost.title = req.body.title:
  if (req.body.title) existingPost.title = req.body.title;
  if (req.body.content) existingPost.content = req.body.content;
  if (req.body.author) existingPost.author = req.body.author;
  existingPost.date = "Edited: " + new Date().toLocaleString("en-US", options);
  res.json(existingPost);
});

//STEP 5: DELETE a specific post by providing the post id.
app.delete("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex((post) => post.id === id);
  if (index > -1) {           //checking if the index actually exists
    posts.splice(index, 1);   //removes 1 item at index
    res.json({ message: "Post deleted successfully."});
  } else {
      res.status(404).json({error: `Post with id: ${id} not found. No posts were deleted.`});
  }
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});

// In-memory data store
let posts = [
  {
    id: 1,
    title: "The Rise of Decentralized Finance",
    content:
      "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
    author: "Alex Thompson",
    date: "August 21, 2023 at 08:17:10 PM",
  },
  {
    id: 2,
    title: "The Impact of Artificial Intelligence on Modern Businesses",
    content:
      "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
    author: "Mia Williams",
    date: "January 3, 2024 at 02:37:44 PM",
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content:
      "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
    author: "Samuel Green",
    date: "November 24, 2023 at 10:04:29 PM",
  },
];
