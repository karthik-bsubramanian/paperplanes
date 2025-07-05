import { Link, useLocation, useNavigate } from "react-router-dom";
import paperplanes from "../assets/paperplanes.png";
import { FilePen, BellRing, CircleUserRound, LogOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { userState, topicState } from "../jotai/atom";
import { useAtom } from "jotai";
import { useSetAtom } from "jotai";
import loadingGIF from "../assets/loading (2).gif";
import { Authcard } from "../pages/Authcard";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { jwtDecode } from "jwt-decode";

type Props = {
  handleOnClick: () => void;
  publishing?: boolean;
};

type decodeJWT = {
  id: string;
};

export const PublicNavbar = ({ handleOnClick, publishing }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [authCardOpen, setAuthCardOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [userData, setUserData] = useAtom(userState);
  const setTopic = useSetAtom(topicState);

  // Only decode if user is logged in
  const currentUserId = userData
    ? jwtDecode<decodeJWT>(localStorage.getItem("authtoken") as string)
    : null;

  const topics = [
    { name: "Select topic ⮟", value: 0 },
    { name: "General", value: 1 },
    { name: "Software Development", value: 2 },
    { name: "Self Improvement", value: 3 },
    { name: "Work", value: 4 },
    { name: "Technology", value: 5 },
    { name: "Life", value: 6 },
    { name: "Culture", value: 7 },
    { name: "World", value: 8 },
    { name: "Media", value: 9 },
    { name: "Society", value: 10 },
    { name: "Programming", value: 11 },
  ];

  const [selectedTopic, setSelectedTopic] = useState(topics[0]);

  useEffect(() => {
    setTopic({ topicId: selectedTopic.value });
  }, [selectedTopic]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="flex h-11 sticky top-0 items-center bg-sandal text-green font-normal text-sm justify-between z-50">
        <div className="flex">
          <img src={paperplanes} alt="" className="h-8 w-8 ml-10" />
          <Link
            to="/"
            className="ml-3 flex items-center text-2xl font-black font-[Ancizar] text-[#F8681C]"
          >
            PaperPlanes
          </Link>
        </div>

        <div className="flex mr-5 items-center">
          <div className="border border-transparent cursor-pointer flex justify-between p-1 mr-6">
            {location.pathname == "/home/write" ? (
              <div className="flex gap-8">
                <Listbox value={selectedTopic} onChange={setSelectedTopic}>
                  <ListboxButton className="relative px-4 py-2 cursor-pointer bg-black rounded-3xl text-white">
                    {selectedTopic.name}
                  </ListboxButton>

                  <ListboxOptions className="absolute mt-10 bg-white rounded shadow-lg z-60">
                    {topics.map((topic) => (
                      <ListboxOption
                        key={topic.value}
                        value={topic}
                        className={({ selected }) =>
                          `px-4 py-2 z-60 cursor-pointer
            ${selected ? "font-bold" : ""}`
                        }
                      >
                        {topic.name}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </Listbox>
                <div className="rounded-2xl bg-green-900 hover:bg-green p-1 flex items-center px-2 text-white">
                  {!publishing ? (
                    <button
                      onClick={() => {
                        handleOnClick();
                      }}
                      className="cursor-pointer focus:outline-none w-15"
                    >
                      publish
                    </button>
                  ) : (
                    <div className="w-15 flex justify-center">
                      <img src={loadingGIF} alt="" className="w-6 h-6" />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                {userData ? (
                  <Link
                    to="/home/write"
                    className="flex items-center space-x-1"
                    onClick={() => {
                      navigate("/home/write");
                    }}
                  >
                    <FilePen strokeWidth={1} className="p-0.2" />
                    <span className="flex font-extrabold pl-1 items-center">
                      Write
                    </span>
                  </Link>
                ) : (
                  <button
                    onClick={() => setAuthCardOpen(true)}
                    className="flex items-center space-x-1 bg-green text-white px-4 py-2 rounded-xl hover:bg-green-600 transition-colors"
                  >
                    <FilePen strokeWidth={1} className="p-0.2" />
                    <span className="flex font-extrabold pl-1 items-center">
                      Start Writing
                    </span>
                  </button>
                )}
              </div>
            )}
          </div>

          {userData ? (
            <>
              <BellRing strokeWidth={1} className="mr-10 cursor-pointer" />
              <div
                ref={wrapperRef}
                className="relative border rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              >
                <img
                  src={userData?.image}
                  alt="er"
                  className="rounded-full object-cover"
                />
                {isOpen && (
                  <div className="absolute top-10 right-0 bg-sandal w-40 h-20 shadow-lg px-2 pt-2">
                    <div className=" mx-auto text-green-800 hover:text-green mb-2">
                      <button
                        onClick={() =>
                          navigate(`/profile?id=${currentUserId?.id}`)
                        }
                        className="flex gap-2 text-sm font-semibold cursor-pointer"
                      >
                        <CircleUserRound
                          className="h-5 w-5"
                          strokeWidth={0.5}
                        />
                        Profile
                      </button>
                    </div>
                    <div className="shadow-[0_-1px_0_0_rgba(0,0,0,0.1)]">
                      <div className="pt-2 space-x-2 flex">
                        <LogOut className="h-5 w-5" strokeWidth={0.5} />
                        <button
                          onClick={() => {
                            setUserData(null);
                            localStorage.removeItem("authtoken");
                            navigate("/");
                          }}
                          className="cursor-pointer font-semibold"
                        >
                          logout
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <button
              onClick={() => setAuthCardOpen(true)}
              className="mr-10 bg-green text-white px-4 py-2 rounded-xl hover:bg-green-600 transition-colors font-semibold"
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      {authCardOpen && <Authcard isOpen={setAuthCardOpen} />}
    </>
  );
};
