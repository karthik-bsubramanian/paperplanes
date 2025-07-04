import { Link } from "react-router-dom";
import paperplanes from "../assets/paperplanes.png";
import { CustomGoogleButton } from "../components/GoogleLogin";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
// import { useEffect, useRef } from "react";

type AuthcardProps = {
  isOpen: (isVisible: boolean)=>void
}

export const Authcard = ({isOpen}:AuthcardProps) => {
//  const cardref = useRef<HTMLDivElement|null>(null); 

//  useEffect(()=>{
//   const handleMouseClick = (event: MouseEvent)=>{
//     if(cardref.current && !cardref.current.contains(event.target as Node)){
//       isOpen(false);
//     }
//   }
//   window.addEventListener('mousedown',handleMouseClick)
//   return ()=>{
//     window.removeEventListener('mousedown',handleMouseClick);
//   }
//  },[])
  return (
    <div className="fixed inset-0 shadow-2xl backdrop-blur-3xl flex justify-center items-center">
      <AnimatePresence>
        <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
      <div className="h-110 w-110 bg-white shadow-2xl flex flex-col justify-between">
        <div className="flex cursor-pointer justify-end pt-2 pr-2">
          <X onClick={()=>{isOpen(false)}} strokeWidth={1}/>
          
        </div>
        <div className="flex flex-col justify-start">
          <img className="h-15 w-15 mx-auto" src={paperplanes} alt="paperplanes" />
          <h1 className="mt-3 text-3xl font-medium justify-center flex font-[Ancizar] mb-3">
            Start Writing with PaperPlanes
          </h1>
          <span className="mt-3 text-sm flex font-light justify-center leading-2">
            Create your account and discover
          </span>
          <span className="text-sm flex font-light justify-center">
            world-class content
          </span>
        </div>
        <div className="flex justify-center items-center w-full">
          <CustomGoogleButton />
        </div>
        <div className="mb-5">
          <h3 className="text-xs px-10 flex justify-center mx-auto">By clicking you agree to the Paperplanes </h3>
          <h3 className="text-xs px-10 flex justify-center mx-auto whitespace-pre"><Link to="#" className="underline cursor-pointer">Privacy policy</Link> and <Link to="#" className="underline cursor-pointer">terms of service</Link></h3>
        </div>
      </div>
</motion.div>
      </AnimatePresence>
    </div>
  );
};
