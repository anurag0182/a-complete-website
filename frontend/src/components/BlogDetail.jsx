import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";   // ✅ added Link
import axios from "axios";
import "./blog.css";
import Navbar from "./navbar";
import Footer from "./footer";

const BlogDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [blogs, setBlogs] = useState([]);   // ✅ added
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // 🔥 FETCH SINGLE POST
  useEffect(() => {
    axios
      .get(`https://a-complete-website.onrender.com/api/blogging/${slug}/`)
      .then((res) => setPost(res.data))
      .catch((err) => {
        console.log(err);
        setPost({ error: true });
      });
  }, [slug]);

  // 🔥 FETCH ALL BLOGS (for trending)
  useEffect(() => {
    axios
      .get("https://a-complete-website-2.onrender.com/api/blogging/")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.log(err));
  }, []);

  if (!post) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <>
    <Navbar />
    <div className="container">
      {/* 🔥 TOP ADVERTISEMENT */}
<div className="top-ad-section">
  <p>Advertisement</p>

  <div className="top-ad-box">
    Your Banner Ad Here
  </div>
</div>
      <div className="layout">

        {/* LEFT — MAIN CONTENT */}
        <div className="main">
          
          <div className="detail-container">

            <div className="detail-hero">
              <img
                src={
                  post?.image
                    ? `https://a-complete-website-2.onrender.com${post.image}`
                    : "https://via.placeholder.com/400"
                }
                alt={post.title}
              />
            </div>

            <div className="detail-content">
              <span className="detail-category">{post.category}</span>

              <h1 className="detail-title">{post.title}</h1>

              <div className="detail-meta">
                <span>
                  🗓{" "}
                  {post.created_at
                    ? new Date(post.created_at).toDateString()
                    : "No Date"}
                </span>
                <span>👁 {post.views || 0} views</span>
              </div>

              <div className="detail-text">{post.text}</div>
              {/* 🔥 RELATED / LATEST POSTS */}
<div className="latest-section">
  <hr></hr>
  <br></br>
  <h3> Latest Posts</h3>
  <br></br>

  <div className="horizontal-container">
    {blogs
      .filter((b) => b.slug !== post.slug) // avoid same post
      .slice(0, 3)
      .map((blog) =>
        blog.slug ? (
          <Link
            key={blog.id}
            to={`/post/${blog.slug}`}
            className="horizontal-card"
          >
            <img src={blog.image} alt={blog.title} />
            <h4>{blog.title}</h4>
          </Link>
        ) : null
      )}
  </div>
</div>

              {/* COMMENTS */}
              <br></br>
              <hr></hr>
              <div className="comment-section">
                <h3>💬 Comments</h3>

                <div className="comment-input">
                  <textarea
                    placeholder="Write your comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <button
                    onClick={() => {
                      if (!newComment.trim()) return;
                      setComments([...comments, newComment]);
                      setNewComment("");
                    }}
                  >
                    Post Comment
                  </button>
                </div>

                <div className="comment-list">
                  {comments.length === 0 && <p>No comments yet</p>}
                  {comments.map((c, index) => (
                    <div key={index} className="comment-item">
                      {c}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* 🔥 RIGHT — TRENDING SIDEBAR */}
        <aside className="sidebars">
          <h3> Trending</h3>
          <br></br>

          {blogs.slice(0, 5).map((blog) =>
            blog.slug ? (
              <Link
                key={blog.id}
                to={`/post/${blog.slug}`}
                className="trend-item"
              >
                <img src={blog.image} alt={blog.title} />
                <p>{blog.title}</p>
              </Link>
            ) : null
          )}
        {/* 🔥 TOP ADVERTISEMENT */}
<div className="top-ads-section">
  <p>Advertisement</p>

  <div className="top-ad-box">
    Your Banner Ad Here
  </div>
</div>  
        </aside>

      </div>
    </div>
    <Footer/>
    </>
  );
};

export default BlogDetail;