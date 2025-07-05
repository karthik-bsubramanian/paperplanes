import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Blog } from "./pages/Blog";
import { Write } from "./pages/Write";
import { Profile } from "./pages/Profile";
import { Topic } from "./pages/Topic";
import { Signin } from "./pages/Signin";
import { Home } from "./pages/Home";
import { PublicHome } from "./pages/PublicHome";
import { NotFound } from "./pages/404NotFound";
import { ProtectedRoute } from "./components/ProtectedRoute";
import "react-loading-skeleton/dist/skeleton.css";
import { AuthInit } from "./auth/AuthInit";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthInit>
          <Routes>
            <Route path="/" element={<PublicHome />} />
            <Route path="/signin" element={<Signin />} />

            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="/home/view" element={<Blog />} />
            <Route path="/blog/:id" element={<Blog />} />
            <Route
              path="/home/write"
              element={
                <ProtectedRoute>
                  <Write />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/topics"
              element={
                <ProtectedRoute>
                  <Topic />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthInit>
      </BrowserRouter>
    </>
  );
}

export default App;
