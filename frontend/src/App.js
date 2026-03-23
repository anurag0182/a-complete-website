import { BrowserRouter, Routes, Route } from "react-router-dom";
import BlogList from "./components/BlogList";
import BlogDetail from "./components/BlogDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* Home Page */}
        <Route path="/" element={<BlogList />} />

        {/* Blog Detail Page */}
        <Route path="/post/:slug" element={<BlogDetail />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;