import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Blog } from "./pages/Blog";
import { Write } from "./pages/Write";
import { Profile } from "./pages/Profile";
import { Topic } from "./pages/Topic";
import { Signin } from "./pages/Signin";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/404NotFound";
import "react-loading-skeleton/dist/skeleton.css";
import { AuthInit } from "./auth/AuthInit";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthInit>
          <Routes>
            <Route path="/" element={<Signin />} />

            <Route path="/home" element={<Home />} />
            <Route path="/home/view" element={<Blog />} />
            <Route path="/home/write" element={<Write />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/topics" element={<Topic />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthInit>
      </BrowserRouter>
    </>
  );
}

export default App;
