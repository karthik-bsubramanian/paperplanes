import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useQuery } from "@tanstack/react-query";
import { Card } from "./Card";
import { BookmarkPlus } from "lucide-react";
type savedPosts =  {
    id: string,
    image: string,
    createdAt: string,
    title: string,
    author: {
        id: string,
        image: string,
        name: string,
    },
    topic: string
}

export const SavedPosts = () => {
  const { data: savedBlogs = [], isLoading: loading } = useQuery<savedPosts[]>({
    queryKey: ["savedPosts"],
    queryFn: async () => {
      const res = await axios.get(`${BACKEND_URL}/user/action/savedposts`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("authtoken"),
        },
      });
      return res.data.savedPosts || [];
    },
    staleTime: 1*60*1000,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  const dataForSkeleton = Array(6).fill({sample: 'blahblahblah!'});

  return <div className="grid grid-cols-3 mt-10">
    {!loading?(
        savedBlogs.length>0?(
            savedBlogs.map((blog)=>(
                <Card key={blog.id} cardType={blog.topic} date={blog.createdAt.slice(0,10)} blogId={blog.id} title={blog.title} firstimageurl={blog.image} author={blog.author} loading={loading}/>
            ))
        ):(<p className="text-sm font-light mt-20 px-10 mx-auto mb-15">
              Click the {<BookmarkPlus className="inline" strokeWidth={0.5} />}{" "}
              on any story to easily add it to your reading list.
            </p>
        )
    ):dataForSkeleton.map((data,idx)=>(
          <Card key={idx} cardType={data.topic} date={data.createdAt} blogId={data.id} title={data.title} firstimageurl={data.image} author={data.author} loading={loading}/>
    ))}
  </div>;
};