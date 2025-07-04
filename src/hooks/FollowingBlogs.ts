import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useInfiniteQuery } from '@tanstack/react-query';

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
}
type blogType={
    data: blog[],
    nextCursor: string;
}


const fetchBlogs = async({pageParam=null}:{pageParam?: string|null})=>{
    const res = await axios.get<blogType>(`${BACKEND_URL}/user/action/followingblogs`,{
        params:{
            limit: 5,
            cursor: pageParam ?? undefined
        },
        headers:{
            Authorization: "Bearer "+ localStorage.getItem('authtoken')
        }
    })
    return res.data;
}
export const useFollowingBlogs = ()=>{
   return useInfiniteQuery({
    queryKey: ['followingBlogs'],
    queryFn: fetchBlogs,
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor
   }) 
}
