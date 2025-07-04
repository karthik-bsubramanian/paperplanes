import { useEffect, useState } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Card } from "../components/Card";
import axios from "axios";
import { BACKEND_URL } from "../../config";

export function Topic() {
  // const scrollRef = useRef<HTMLDivElement>(null);

  // const scroll = (direction: "left" | "right") => {
  //   if (!scrollRef.current) return;
  //   const { scrollLeft, clientWidth } = scrollRef.current;
  //   console.log(scrollRef.current.scrollLeft);
  //   const scrollAmount =
  //     direction === "left" ? -clientWidth / 10 : clientWidth / 10;
  //   scrollRef.current.scrollTo({
  //     left: scrollLeft + scrollAmount,
  //     behavior: "smooth",
  //   });
  // };

  useEffect(()=>{
    document.title = 'Explore topics - PaperPlanes';
  },[])

  type cardProps = {
      topic: string;
      createdAt: string;
      title: string;
      id: string;
      image: string;
      author: {
        id: string;
        name: string;
        image: string;
      };
  }; 

  type topicResponse = {
    modifiedResponse: cardProps[],
    noOfPosts: number;
  }

  const tags = [{
    topic: "General",
    topicId: 1
  },{
    topic: "Software Development",
    topicId: 2
  },{
    topic: "Self Improvement",
    topicId: 3
  },{
    topic: "Work",
    topicId: 4
  },{
    topic: "Technology",
    topicId: 5
  },{
    topic: "Life",
    topicId: 6
  },{
    topic: "Culture",
    topicId: 7
  },{
    topic: "world",
    topicId: 8
  },{
    topic: "Media",
    topicId: 9 
  },{
    topic: "Society",
    topicId: 10
  },{
    topic: "Programming",
    topicId: 11
  }]

  const [activeTab,setActiveTab] = useState(tags[0]);
  const [content,setContent] = useState<topicResponse|null>(null);
  const [loading,setloading] = useState(false);
  useEffect(()=>{
    setloading(true);
    const fetchData = async ()=>{
      const response = await axios.get(`${BACKEND_URL}/blog/topic`,{
        params:{
          topicId: activeTab.topicId
        }
      })
      setContent(response.data.data);
      setloading(false);
    }
    fetchData();
  },[activeTab])
  
  const contentToRender = loading
  ? Array(6).fill({sample:'karthik'})
  : content;

  return (
    <div>
      <Navbar handleOnClick={() => {}} />
      <div className="mx-auto">
        <div className="flex justify-center relative w-full overflow-hidden">
          <div className="flex overflow-x-auto gap-3 px-12 py-2 scroll-smooth">
            {tags.map((tag) => (
              <button
                key={tag.topicId}
                onClick={() => setActiveTab(tag)}
                className={`${
                  activeTab.topic === tag.topic
                    ? "transform scale-110"
                    : "border-2"
                } whitespace-nowrap rounded-full bg-green-900 text-sm font-semibold text-white px-4 py-2 hover:bg-green cursor-pointer !transition ease-in-out duration-200`}
              >
                {tag.topic}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="text-4xl flex justify-center mt-4">{activeTab.topic}</div>
      <div className="flex justify-center mt-3 whitespace-pre-wrap shadow-[0_0.5px_0_0_rgba(0,0,0,0.2)] pb-10 mx-50">
        <span>Topic </span>
        <span>· {content && content.noOfPosts} stories</span>
      </div>
      <div className="mx-50 mt-10">
        <div className="grid grid-cols-3">
          
           {Array.isArray(contentToRender)
              ? contentToRender.map((blog: any, idx: number) => (
                  <Card
                    key={idx}
                    cardType={blog.topic}
                    date={blog.createdAt}
                    title={blog.title}
                    blogId={blog.id}
                    firstimageurl={blog.image}
                    author={blog.author}
                    loading={loading}
                  />
                ))
              : contentToRender?.modifiedResponse?.map((blog: cardProps) => (
                  <Card
                    key={blog.id}
                    cardType={blog.topic}
                    date={blog.createdAt}
                    title={blog.title}
                    blogId={blog.id}
                    firstimageurl={blog.image}
                    author={blog.author}
                    loading={loading}
                  />
                ))}
          
        </div>
      </div>
    </div>
  );
}
