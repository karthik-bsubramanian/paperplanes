import { useState } from "react";
import paperplanes from "../assets/pp final.png";
import { Footer } from "../components/Footer";
import { Authcard } from "./Authcard";
import { useAtom } from "jotai";
import { userState } from "../jotai/atom";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const [authCardOpen, setAuthCardOpen] = useState(false);
  const [user]=useAtom(userState);
  const navigate = useNavigate();
  if(user){
    setTimeout(()=>{
      navigate('/home',{replace: true});
    }
    ,500)
  }

  return (
    <div className="relative">
      <div className=" flex flex-col min-h-screen text-green">
        <div className="flex h-11 top-0 items-center text-green font-normal text-sm justify-between">
          <div className="flex">
            <img src={paperplanes} alt="" className="h-8 w-8 ml-10" />
            <span className="ml-3 flex items-center text-2xl font-black cursor-pointer font-[Ancizar] text-[#F8681C]">
              PaperPlanes
            </span>
          </div>
          <button
          onClick={()=>{setAuthCardOpen(true)}}
          className="mr-15 rounded-3xl font-semibold text-sm text-white cursor-pointer bg-green px-2 py-2">
            Get Started
          </button>
        </div>
        <div className="my-auto flex justify-between items-center">
          <div className="ml-10 space-y-5">
            <h1 className="text-8xl w-5xl font-[Ancizar]">
              Human stories. Bold ideas. Just you & the internet
            </h1>
            <p className="text-lg">
              Spill your thoughts, not your coffee - log in and let the words
              flow
            </p>
            <button 
          onClick={()=>{setAuthCardOpen(true)}}
            className="text-sm font-semibold px-3 py-3 cursor-pointer rounded-3xl bg-green text-white">
              Start Writing
            </button>
          </div>
          <img
            className="h-150 w-150 ml-auto"
            src={paperplanes}
            alt="paperplanes"
          />
        </div>
        <Footer />
        {authCardOpen && <Authcard isOpen={setAuthCardOpen}/>}
      </div>
    </div>
  );
};
