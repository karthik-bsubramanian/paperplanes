import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useQuery } from '@tanstack/react-query';


type blogType={
    id:string,
    title: string,
    createdAt: string,
    firstImageUrl: string,
    author:{
        id: string,
        name: string,
        image: string
    }
}
export const useBlogs = () => {
    //fetch content only on the initial mount
    const{data:blogs=[],isLoading: loading}=useQuery<blogType[]>({
        queryKey: ['blogs'],
        queryFn: async ()=>{
            const response = await axios.get(`${BACKEND_URL}/blog/bulk`);
            return response?.data?.data || [];   
        },
        staleTime: Infinity, 
        refetchOnMount: false, //dont refetch on every mount
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    })
  return {
    blogs,
    loading
  };
};
