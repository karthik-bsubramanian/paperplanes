import { Ellipsis } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { PublishedBlogsCard } from "../components/publishedBlogsCard";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../../config";
import { Navigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Following } from "../components/FollowingCard";
import { jwtDecode } from "jwt-decode";
import { SavedPosts } from "../components/SavedPosts";
import { useFollow } from "../hooks/useFollow";
import { Loading } from "../components/Loading";
import { useHydratedUser } from "../hooks/HydratedUser";

type profileData = {
  image: string;
  name: string;
  isFollowed: boolean;
};

type publishedBlogs = {
    id: string;
    image: string;
    title: string;
    topic: string;
    date: string;
}

type jwtPayload = {
  id: string;
}

export const Profile = () => {
    const { user, hydrated } = useHydratedUser();

  const [activeTab, setActiveTab] = useState("Home");
  const [userData, setUserData] = useState<profileData | null>(null);
  const [searchParams] = useSearchParams();
  const paramid = searchParams.get("id"as string);
  const [isDone,setIsDone] = useState(false);
  const currentUserId = jwtDecode<jwtPayload>(localStorage.getItem('authtoken') as string);
  const follow = useFollow();

  useEffect(()=>{
    document.title = `${userData?.name} | Profile | PaperPlanes`
  })
  
  const tabs = ["Home", "About", "Following"];
  if (paramid === currentUserId.id) tabs.push("Saved");

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await axios.get(`${BACKEND_URL}/user/action/profile/${paramid}`,{
          headers:{
            Authorization: "Bearer "+ localStorage.getItem('authtoken')
          }
        });
        if (res.data) {
          setUserData(res.data.response);
          setIsDone(res.data.response.isFollowed);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [paramid]);

const { data: publishedBlogs = [], isLoading: publishedBlogsLoading } =useQuery<publishedBlogs[]>({
    queryKey: ["publishedBlogs",paramid],
    queryFn: async () => {
      if (!paramid) return [];
      const res = await axios.get(`${BACKEND_URL}/user/publishedposts/${paramid}`);
      return res.data.publishedBlogs || [];
    },
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: !!paramid
  });
      
  if (!hydrated) return <Loading/>
  if (!user) return <Navigate to="/" replace />;
  if (loading) {
    return <Loading/>;
  }

  if (error) {
    return <div className="h-screen backdrop-blur-2xl flex items-center justify-center text-black">You're Searching for a wrong Id</div>;
  }
  return (
    <div className="h-screen">
      <Navbar handleOnClick={() => {}} />
      <div className="flex items-center justify-center gap-5 mt-20 h-50">
        <img
          src={userData?.image}
          alt="profile image"
          className="h-25 w-25 rounded-full object-cover"
        />
        <div>
          <h1 className="text-4xl font-bold">{userData?.name}</h1>
          <div className="flex items-center gap-2">
            {paramid===currentUserId.id?(<>            
            <button
              onClick={() => toast("Yet to be added!")}
              className="rounded-3xl shadow-[0_0_0_0.5px_rgba(0,0,0,0.4)] px-2 p-2 mt-2 cursor-pointer"
            >
              Edit Profile
            </button>
            <div className="rounded-full p-2 px-2 shadow-[0_0_0_0.5px_rgba(0,0,0,0.4)] mt-2">
              <Ellipsis className="p-1" />
            </div></>):(<div className="pt-2 w-full flex justify-start">

                    <button 
      onClick={()=>follow({id: paramid||"",setIsDone})}
      className={`border p-1 px-5 mx-2 cursor-pointer rounded-2xl ${isDone?"bg-slate-800 text-white":""}`}>{isDone?"Following":"Follow"}</button>
            </div>
            )
          }
          </div>
        </div>
      </div>
      <div className="px-40">
        <div className="space-x-5 mt-5 shadow-[0_0.5px_0_0_rgba(0,0,0,0.4)]">
          {tabs.map((tab) => {
            return (
              <button
                key={tab}
                className={`${
                  activeTab === tab
                    ? "bg-green-700 rounded-3xl text-white"
                    : "hover:text-gray-500 "
                } rounded-3xl font-semibold p-2 cursor-pointer mb-3`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {activeTab === "Home" && (
          <div>
            {publishedBlogsLoading? <div className="flex w-full h-40 justify-center items-center">loading...</div> : publishedBlogs.length > 0 ?<div className="mt-5 grid grid-cols-3">
                  {publishedBlogs.map((blog)=>(
                <PublishedBlogsCard key={blog.id} blogId={blog.id} cardType={blog.topic} firstimageurl={blog.image} date={blog.date} title={blog.title}/>
            ))}
            </div>:<div className="w-full h-50 flex flex-col gap-3 mt-5 justify-center items-center">
              <h1 className="font-semibold text-xl">No published Blogs Yet!</h1>
              {paramid === currentUserId.id && (<>
              <h3 className="text-sm">what's resisting you, Start writing one now</h3>
              <button className="rounded-3xl shadow-[0_0_0_0.5px_rgba(0,0,0,0.4)] font-seimibold px-2 p-2 mt-2 cursor-pointer">Write now!</button>
</>)}
            </div>}
          </div>
        )}

        {activeTab === "About" && (
          <div className="w-100 mx-auto mt-40">
            <h1 className="flex justify-center text-xl font-semibold px-10">
              {paramid === currentUserId.id?"Tell the world about yourself":"Description Not added yet"}
            </h1>
            <br />
            {paramid===currentUserId.id && <>
            <p className="flex px-3 justify-center text-sm">
              Here’s where you can share more about yourself: your history, work
              experience, accomplishments, interests, dreams, and more.
            </p>
            <div className="flex justify-center mt-3">
              <button
                onClick={() => toast("Yet to be added!")}
                className="rounded-3xl shadow-[0_0_0_0.5px_rgba(0,0,0,0.4)] font-seimibold px-2 p-2 mt-2 cursor-pointer"
              >
                Get started
              </button>
            </div></>}
          </div>
        )}

        {activeTab === "Following" && 
          <Following userid={paramid as string}/>}
        {activeTab==="Saved" && <SavedPosts/>}
      </div>
    </div>
  );
};
