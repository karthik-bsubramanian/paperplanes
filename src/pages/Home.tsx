import { Navbar } from "../components/Navbar";
import cornerimg from "../assets/home.png";
import { useEffect, useRef, useState } from "react";
import { Featured } from "./Featured";
import { Following } from "./Following";
import { About } from "./About";
import { Search } from "../components/Search";
import { useHydratedUser } from "../hooks/HydratedUser";
import { Loading } from "../components/Loading";

export const Home = () => {
  const { hydrated } = useHydratedUser();

  const tabs = ["Featured", "Following", "Topics"];

  const [activeTab, setActiveTab] = useState("Featured");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [sliderStyle, setSliderStyle] = useState<React.CSSProperties>({});
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const currentRef = tabRefs.current[tabs.indexOf(activeTab)];
    if (currentRef) {
      const newStyle = {
        width: currentRef.offsetWidth + "px",
        left: currentRef.offsetLeft + "px",
      };

      // Only update state if values changed
      if (
        sliderStyle.width !== newStyle.width ||
        sliderStyle.left !== newStyle.left
      ) {
        setSliderStyle(newStyle);
      }
    }
  }, [activeTab, tabs, sliderStyle]);

  useEffect(() => {
    document.title = "single place to share all of your thoughts and knowledge";
  }, []);

  if (!hydrated) return <Loading />;

  return (
    <div className="bg-sandal h-max min-h-screen">
      <Navbar handleOnClick={() => {}} />
      <div className="flex h-30 justify-end">
        <img src={cornerimg} alt="" aria-hidden="true" className="flex" />
      </div>

      <div className="mx-20">
        <h1 className="text-6xl font-bold text-green">Blog</h1>
        <div className="flex items-center justify-between">
          <div className="relative w-max p-1 mt-8 bg-green rounded-3xl space-x-10">
            <span
              className="absolute top-1 bottom-1 bg-sandal rounded-3xl !transition-all !ease-in-out duration-300"
              style={sliderStyle}
            />
            {tabs.map((tab, idx) => (
              <button
                key={tab}
                ref={(element) => {
                  tabRefs.current[idx] = element;
                }}
                onClick={() => setActiveTab(tab)}
                className={`relative cursor-pointer z-10 px-4 py-2 font-semibold rounded-3xl !transition-colors !duration-200 ${
                  activeTab === tab ? "text-green" : "text-sandal"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          {activeTab === "Featured" && (
            <Search setSearchQuery={setSearchQuery} />
          )}
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-10">
        {activeTab === "Featured" && <Featured searchQuery={searchQuery} />}
        {activeTab === "Following" && <Following />}
        {activeTab === "Topics" && <About />}
      </div>
    </div>
  );
};
