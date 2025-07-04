import { useNavigate } from "react-router-dom";

type cardProps ={
    cardType: string;
    date: string;
    title: string;
    firstimageurl: string;
    blogId: string
} 
export const PublishedBlogsCard = ({cardType,date,title,firstimageurl,blogId}:cardProps)=>{
    const navigate = useNavigate();
    return <div className="container rounded-2xl h-[450px] w-[400px] mx-auto overflow-hidden">
        <img src={firstimageurl}
        alt="kimi raikonen"
        className="w-full h-[255px] object-cover"
        />
        <div className="flex justify-between font-normal text-xs px-3 pt-1">
            <span className="rounded-lg p-0.5 bg-bg-orange text-orange">{cardType}</span>
            <span className="text-green">{date.slice(0,10)}</span>
        </div>
        <h1 onClick={()=>{navigate(`/home/view?postid=${blogId}`)}} className="pt-3 text-2xl font-semibold cursor-pointer px-1 text-green line-clamp-4 hover:underline">
            {title}    
        </h1>
    </div>
}

