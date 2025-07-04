import { SimpleEditor } from "../../@/components/tiptap-templates/simple/simple-editor";
import "@/styles/_keyframe-animations.scss";
import "@/styles/_variables.scss";
import { Navbar } from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import type { JSONContent } from "@tiptap/react";
import { useAtomValue } from "jotai";
import { topicState } from "../jotai/atom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function Write() {
  const [jsonData, setJsonData] = useState<JSONContent | null>(null);
  const topic = useAtomValue(topicState);
  if (topic.topicId == 0) topic.topicId = 1; //fallback if user did not select any topic
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const jwt = localStorage.getItem("authtoken");
  const blogInput = JSON.stringify(jsonData);

  // disable scrolling
  //   useEffect(() => {
  //   document.body.style.overflow = 'hidden';
  //   return () => {
  //     document.body.style.overflow = 'auto';
  //   };
  // }, []);

  const handleDbCall = async () => {
    if (!jsonData) return;
    setLoading(true);
    const titleInput = JSON.stringify(
      jsonData.content?.[0]?.content?.[0]?.text
    );
    const data = {
      title: titleInput,
      content: blogInput,
      topicId: topic.topicId,
      authorId: "bullshit",
    };
    const config = {
      headers: {
        Authorization: "Bearer " + jwt,
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        "https://paperplanes.rckarthik03.workers.dev/api/v1/blog/protected/create",
        data,
        config
      );
      if (response.data.id) {
        toast.success("Published successfully!");
        navigate("/home");
      }
      setLoading(false);
    } catch (error) {
      toast.error("Publish Failed! make sure you entered title at the top.");
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    document.title = "New story - PaperPlanes";
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="h-11 flex-shrink-0">
        <Navbar handleOnClick={handleDbCall} publishing={loading} />
      </div>
      <div className="flex-1 overflow-auto">
        <SimpleEditor handleData={setJsonData} />
      </div>
    </div>
  );
}
