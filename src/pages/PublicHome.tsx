import { PublicNavbar } from "../components/PublicNavbar";
import cornerimg from "../assets/home.png";
import { useEffect, useState } from "react";
import { Featured } from "./Featured";
import { Search } from "../components/Search";
import { Loading } from "../components/Loading";
import { useHydratedUser } from "../hooks/HydratedUser";
import { LoginPrompt } from "../components/LoginPrompt";
import { WelcomeBanner } from "../components/WelcomeBanner";

export const PublicHome = () => {
  const { user, hydrated } = useHydratedUser();
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    document.title =
      "PaperPlanes - Read amazing stories and share your thoughts";
  }, []);

  if (!hydrated) return <Loading />;

  return (
    <div className="bg-sandal h-max min-h-screen">
      <PublicNavbar handleOnClick={() => {}} />
      <div className="flex h-30 justify-end">
        <img src={cornerimg} alt="" aria-hidden="true" className="flex" />
      </div>

      <div className="mx-20">
        <h1 className="text-6xl font-bold text-green">Blog</h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-lg font-semibold text-green">
              Featured Stories
            </span>
          </div>
          <Search setSearchQuery={setSearchQuery} />
        </div>
      </div>

      {/* Welcome banner for unlogged users */}
      {!user && <WelcomeBanner />}

      <div className="max-w-7xl mx-auto mt-10">
        <Featured searchQuery={searchQuery} />
      </div>

      {/* Login prompt for unlogged users */}
      {!user && <LoginPrompt />}
    </div>
  );
};
