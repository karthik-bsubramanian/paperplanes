import axios from "axios";
import { BookmarkPlus, Ellipsis, MessageCircle, ThumbsUp } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../config";
import { useQueryClient } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";

type blog = {
    id: string;
    title: string;
    description: string;
    image: string;
    userId: string;
    userName: string;
    createdAt: string;
    topic: string;
    isSaved: boolean;
    loading: boolean;
}

const savePost = async (id:string,
    setSaved:(state: boolean)=>void,
    queryClient:ReturnType<typeof useQueryClient>)=>{
    const res = await axios.post(`${BACKEND_URL}/user/action/save`,{
        id
    },{
        headers:{
            Authorization: "Bearer "+localStorage.getItem('authtoken')
        }
    })
    if(res){
        setSaved(true);
        queryClient.invalidateQueries({ queryKey: ["savedPosts"] });
    }
}

export const FollowingCard = ({id,title,description,image,userId,topic,userName,createdAt,isSaved,loading}:blog)=>{
    const navigate = useNavigate();
    const [saved,setSaved] = useState(isSaved);
    const [likes] = useState(Math.floor(Math.random()*100));
    const [comments] = useState(Math.floor(Math.random()*10));
    const queryClient = useQueryClient();
    return <div className="max-h-80 pt-8 pr-15 shadow-[0.5px_0_0_0_rgba(0,0,0,0.2)]">
                <div className="flex space-x-2 items-center pb-9 shadow-[0_0.5px_0_0_rgba(0,0,0,0.2)]">
                    <div className="w-155">
                        {loading?
                        <Skeleton width={100}/>
                    :
                        <h6 className="text-xs">In <button onClick={()=>{navigate('/topics')}} className="hover:underline cursor-pointer">{topic}</button> by  <button onClick={()=>navigate(`/profile?id=${userId}`)} className="hover:underline cursor-pointer">{userName}</button></h6>
                    }
                    {loading?
                    <Skeleton count={4}/>
                    :<>                    
                        <h1 onClick={()=>{navigate(`/home/view?postid=${id}`)}} className="font-bold cursor-pointer text-2xl pt-2">{title}</h1>
                        <p className="text-gray-500 font-medium text-sm pt-2 line-clamp-2">{description}</p>
                        </>
                    }
                        <div className="flex justify-between mt-4">
                            <div className="flex space-x-3 items-center">
                                {loading?
                                <Skeleton width={60}/>
                                :
                                
                                <span className="text-sm">{createdAt.slice(0,10)}</span>
                                }
                                <div className="flex space-x-1 items-center">
                                    {loading?
                                    <Skeleton width={30}/>
                                    :
                                    <>
                                    <ThumbsUp strokeWidth={1} className="h-4 w-4"/>
                                    <span className="text-sm">{likes}</span>
                                    </>}
                                </div>
                                <div className="flex items-center space-x-1">
                                    {loading?
                                    <Skeleton width={30}/>
                                    :<>
                                    
                                    <MessageCircle strokeWidth={1} className="h-4 w-4"/>
                                    <span className="text-sm">{comments}</span>
                                    </>
                                    }
                                </div>
                            </div>
                            
                            <div className="flex mr-10 space-x-3">
                                {loading?
                                    <Skeleton width={40}/>
                                :<>
                                
                                <BookmarkPlus onClick={()=>savePost(id,setSaved,queryClient)} strokeWidth={1} className={`h-4 cursor-pointer w-4 ${saved==true?"fill-black":""}`}/>
                                <Ellipsis strokeWidth={1} className="h-4 w-4"/>
                                </>
                                }
                            </div>
                        </div>
                    </div>
                {loading?
                <Skeleton height={160} width={160}/>
                :
                
                    <img 
                    src={image} 
                    alt="blog image"
                    className="h-40 w-40 object-cover" />
                }
        </div>  
    </div>
}