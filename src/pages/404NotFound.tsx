import { Navigate, useNavigate } from "react-router-dom";
import fallbackimage from "../assets/404.png";
import paperplanes from "../assets/paperplanes.png";
import { useHydratedUser } from "../hooks/HydratedUser";
import { Loading } from "../components/Loading";
export const NotFound = () => {
  const { user, hydrated } = useHydratedUser();
  const navigate = useNavigate();

  if (!hydrated) return <Loading/>
  if (!user) return <Navigate to="/" replace />;
  
  return (
    <div className="max-h-screen">
      <div className="flex h-11 top-0 items-center text-green font-normal text-sm justify-between">
        <div className="flex">
          <img src={paperplanes} alt="" className="h-8 w-8 ml-10" />
          <span className="ml-3 flex items-center text-2xl font-black cursor-pointer font-[Ancizar] text-[#F8681C]">
            PaperPlanes
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center h-full">
        <img src={fallbackimage} alt="" className="w-[750px] h-[750px] " />
        <h1 className="text-6xl font-black">Page Not Found.</h1>
        <button onClick={()=>navigate('/home')} className="rounded-3xl px-2 py-1 border-1 mt-3 cursor-pointer">Go to home</button>
      </div>
    </div>
  );
};
