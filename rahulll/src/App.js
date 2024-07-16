import { useState, useEffect } from "react";
import { format } from "date-fns";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";

import About from "./About";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import Missing from "./Missing";
import Nav from "./Nav";
import PostPage from "./PostPage";
import NewPost from "./NewPost";

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My fking Post",
      datetime: "July 1, 2023 11:17:32 AM",
      body: "rahul2",
    },
    {
      id: 2,
      title: "My 2nd Post",
      datetime: "July 1, 2023 11:17:32 AM",
      body: "rahul",
    },
    {
      id: 3,
      title: "My 3rd Post",
      datetime: "July 1, 2023 11:17:32 AM",
      body: "rahul1",
    },
  ]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const filteredResults = posts.filter((post) =>
      post.body.toLowerCase().includes(search.toLowerCase()) ||
      post.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMM dd, yyyy pp");
    const newPost = { id, title: postTitle, datetime, body: postBody };
    const allPosts = [...posts, newPost];
    setPosts(allPosts);
    setPostTitle("");
    setPostBody("");
    navigate("/");
  };

  const handleDelete = (id) => {
    const postsList = posts.filter((post) => post.id !== id);
    setPosts(postsList);
    navigate("/");
  };

  return (
    <div className="App">
      <Header title="Rahul Social Media" />
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home posts={searchResults} />} />
        <Route
          path="post"
          element={<NewPost handleSubmit={handleSubmit} postTitle={postTitle} setPostTitle={setPostTitle} postBody={postBody} setPostBody={setPostBody} />}
        />
        <Route path="post/:id" element={<PostPage posts={posts} handleDelete={handleDelete} />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
