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
import { ProtectedRoutes } from "./auth/ProtectedRoutes";
import { useAtomValue } from "jotai";
import { userState } from "./jotai/atom";

function App() {
  const user = useAtomValue(userState);
  const isAuthenticated = !!user;

  return (
    <>
      <BrowserRouter>
        <AuthInit>
          <Routes>
            <Route path="/" element={<Signin />} />

            <Route
              path="/home"
              element={
                <ProtectedRoutes isAuthenticated={isAuthenticated}>
                  <Home />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/home/view"
              element={
                <ProtectedRoutes isAuthenticated={isAuthenticated}>
                  <Blog />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/home/write"
              element={
                <ProtectedRoutes isAuthenticated={isAuthenticated}>
                  <Write />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoutes isAuthenticated={isAuthenticated}>
                  <Profile />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/topics"
              element={
                <ProtectedRoutes isAuthenticated={isAuthenticated}>
                  <Topic />
                </ProtectedRoutes>
              }
            />
            <Route
              path="*"
              element={
                <ProtectedRoutes isAuthenticated={isAuthenticated}>
                  <NotFound />
                </ProtectedRoutes>
              }
            />
          </Routes>
        </AuthInit>
      </BrowserRouter>
    </>
  );
}

export default App;
