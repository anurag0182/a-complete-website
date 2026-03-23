import { useEffect, useState, useCallback, useMemo } from "react";
import { getBlogs } from "../services/api";
import "./blog.css";
import { Link } from "react-router-dom";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [slide, setSlide] = useState(0);

  // 🔥 ADDED: SEARCH
  const [search, setSearch] = useState("");

  // 🔥 ADDED: DARK MODE
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  // 🔥 ADDED: POPUP
  const [showPopup, setShowPopup] = useState(false);


  // ✅ PAGINATION STATE
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  // Fetch blogs
  useEffect(() => {
  getBlogs()
    .then((res) => {
      console.log("BLOG DATA:", res.data);  // ✅ ADD HERE
      setBlogs(res.data);
    })
    .catch((err) => console.log(err));
}, []);

  // 🔥 ADDED: APPLY DARK MODE
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

   // 🔥 POPUP LOGIC
  useEffect(() => {
    const isSubscribed = localStorage.getItem("subscribed");

    if (!isSubscribed) {
      setTimeout(() => {
        setShowPopup(true);
      }, 2000);
    }
  }, []);


  // Slider posts
  const sliderPosts = useMemo(() => blogs.slice(0, 5), [blogs]);

  const nextSlide = useCallback(() => {
    if (!sliderPosts.length) return;
    setSlide((prev) => (prev + 1) % sliderPosts.length);
  }, [sliderPosts.length]);

  const prevSlide = useCallback(() => {
    if (!sliderPosts.length) return;
    setSlide((prev) =>
      prev === 0 ? sliderPosts.length - 1 : prev - 1
    );
  }, [sliderPosts.length]);

  // Auto slide
  useEffect(() => {
    if (!sliderPosts.length) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, sliderPosts.length]);

  // 🔥 ADDED: SEARCH FILTER
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ PAGINATION LOGIC (UPDATED)
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredBlogs.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">Sample-Web</div>
          <div className="nav-links">
            <a href="/">Home</a>
            <a href="/">Articles</a>
            <a href="/">About</a>
            <a href="/">android</a>
            <a href="/">google</a>
          </div>

          {/* 🔥 ADDED: SEARCH */}
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // reset page on search
            }}
          />

          {/* 🔥 ADDED: DARK MODE */}
          <button
            className="dark-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <h1>Anurag-Blogs</h1>
        <p>a sample tech website</p>
      </section>

      {/* Slider */}
      {sliderPosts.length > 0 && (
        <div className="slider">
          {sliderPosts.reverse().map((blog, index) => (
            <Link
              key={blog.id}
              to={`/post/${blog.slug}`}
              className={`slide ${index === slide ? "active" : ""}`}
            >
              <img src={blog.image} alt={blog.title} />

              <div className="slide-overlay">
                <div className="slide-content">
                  <span className="slide-category">{blog.category}</span>
                  <h2 className="slide-title">{blog.title}</h2>
                  <p className="slide-text">
                    {blog.text.substring(0, 160)}...
                  </p>
                </div>
              </div>
            </Link>
          ))}

          <button className="slider-btn prev" onClick={prevSlide}>‹</button>
          <button className="slider-btn next" onClick={nextSlide}>›</button>
        </div>
      )}

      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">| Android Section |</div>
        </div>
      </nav>

      {/* CATEGORY */}
      <div className="category-sectionz">
        <div className="horizontal-container">
          {blogs
            .filter((b) => b.category === "android")
            .slice(0, 6)
            .map((blog) => (
              <Link to={`/post/${blog.slug}`} className="horizontal-card" key={blog.id}>
                <img src={blog.image} alt={blog.title} />
                <h4>{blog.title}</h4>
              </Link>
            ))}
        </div>

        <div className="horizontal-container">
          {blogs
            .filter((b) => b.category === "google")
            .slice(0, 6)
            .map((blog) => (
              <Link to={`/post/${blog.slug}`} className="horizontal-card" key={blog.id}>
                <img src={blog.image} alt={blog.title} />
                <h4>{blog.title}</h4>
              </Link>
            ))}
        </div>
      </div>

      {/* AD */}
      <div className="top-ad-section">
        <p>Advertisement</p>
        <div className="top-ad-box">Your Banner Ad Here</div>
      </div>

      {/* Latest Header */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">| Latest Posts |</div>
        </div>
      </nav>

      {/* Layout */}
      <div className="container">
        <div className="layout">

          {/* LEFT */}
          <div className="main">
            <div className="grid">
              {blogs.length === 0 && <p>Loading posts...</p>}

              {currentPosts.map((blog) => (
                <div className="card" key={blog.id}>
                  <img src={blog.image} alt={blog.title} />

                  <div className="card-body">
                    <span className="category">{blog.category}</span>

                    <h3>
                      <Link to={`/post/${blog.slug}`}>
                        {blog.title}
                      </Link>
                    </h3>

                    <p className="text">
                      {blog.text.substring(0, 160)}...
                    </p>

                    <div className="meta">
                      <span>👁 {blog.views}</span>
                      <span>
                        {new Date(blog.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <br></br>
            

            {/* PAGINATION */}
            <div className="pagination">
              <hr></hr>
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                ⬅ Prev
              </button>

              <span>Page {currentPage}</span>

              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={indexOfLastPost >= filteredBlogs.length} // 🔥 FIXED
              >
                Next ➡
              </button>
              <br></br>
              <hr></hr>
            
            </div>
          </div>
          

          {/* RIGHT */}
          <aside className="sidebars">
            <h3>🔥 Trending</h3>
            <br></br>
            <hr></hr>
            <br></br>

            {blogs.slice(0, 5).reverse().map((blog) => (
              <Link key={blog.id} to={`/post/${blog.slug}`} className="trend-item">
                <img src={blog.image} alt={blog.title} />
                <p>{blog.title}</p>
              </Link>
            ))}

            <div className="ad-section">
              <p>Advertisement</p>
              <div className="ad-box">Your Ad Here</div>
            </div>
          </aside>

        </div>
      </div>
      

      {/* 🔥 WEEKLY POSTS */}
<div className="weekly-section">
  <h2 className="weekly-title">🔥 Weekly Picks</h2>

  <div className="weekly-container">
    {blogs.slice(0, 2).map((blog) => (
      <Link
        to={`/post/${blog.slug}`}
        className="weekly-card"
        key={blog.id}
      >
        <img src={blog.image} alt={blog.title} />

        <div className="weekly-content">
          <h3>{blog.title}</h3>
          <p>{blog.text.substring(0, 100)}...</p>
        </div>
      </Link>
    ))}
  </div>
</div>
<div className="top-ad-section">
        <p>Advertisement</p>
        <div className="top-ad-box">Your Banner Ad Here</div>
      </div>

      {/* AUTHOR */}
      <div className="author-section">
        <div className="author-card">
          <img src="/photo.jpg" alt="author" className="author-img" />

          <div className="author-info">
            <h2>Anurag Singh Tomar</h2>
            <p className="author-role">Full Stack Developer • Django & React</p>
            <p className="author-desc">
              Aspiring Backend Developer skilled in Python, Django and Flask.
            </p>

            <div className="author-buttons">
              <a href="#" className="btn">Instagram</a>
              <a href="#" className="btn">GitHub</a>
              <a href="#" className="btn">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
      <div className="top-ad-section">
        <p>Advertisement</p>
        <div className="top-ad-box">Your Banner Ad Here</div>
      </div>
       {/* 🔥 POPUP */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <button className="popup-close" onClick={() => setShowPopup(false)}>✖</button>

            <h2>🚀 Stay Updated!</h2>
            <p>Subscribe to get latest posts directly.</p>

            <input type="email" placeholder="Enter your email" className="popup-input" />

            <button
              className="popup-btn"
              onClick={() => {
                localStorage.setItem("subscribed", "true");
                setShowPopup(false);
              }}
            >
              Subscribe
            </button>
          </div>
        </div>
      )}


      {/* Footer */}
      <footer className="footer">
        © 2026 AnuragBlogs · Full Stack Project
      </footer>
    </>
  );
};

export default BlogList;