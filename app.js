import "./styles.css";

import React, { useState } from "react";

export default function App() {
  const [posts, setPosts] = useState([]);

  function setPostById(index, data) {
    const clonePosts = [...posts];
    clonePosts[index] = data;
    setPosts(clonePosts);
  }

  async function getPosts() {
    let posts = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    ).then((response) => response.json());

    posts = posts.slice(0, 10);

    setPosts(posts);
  }

  async function editPosts(index) {
    let post = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${index}`,
      {
        method: "PUT",
        body: JSON.stringify({
          id: index,
          title: `foo ${index}`,
          body: `bar ${index}`,
          userId: index
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
    ).then((response) => response.json());

    setPostById(index - 1, post);
  }

  async function removePosts(index) {
    console.log("todo");
  }

  const postItem = posts.map((post, index) => (
    <li>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <button onClick={() => editPosts(index + 1)}>edit post</button>
      <button onClick={() => removePosts(index + 1)}>remove post</button>
    </li>
  ));

  return (
    <div className="App">
      <button onClick={() => getPosts()}>Get Posts</button>
      <ul>{postItem}</ul>
    </div>
  );
}
