import { StarterKit } from "@tiptap/starter-kit";
import type { JSONContent } from "@tiptap/core";
import "@/styles/_keyframe-animations.scss";
import "@/styles/_variables.scss";
import { Image } from "@tiptap/extension-image";
import { TaskItem } from "@tiptap/extension-task-item";
import { TaskList } from "@tiptap/extension-task-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { Underline } from "@tiptap/extension-underline";

import { Link } from "../../@/components/tiptap-extension/link-extension";
import { Selection } from "../../@/components/tiptap-extension/selection-extension";
import { TrailingNode } from "../../@/components/tiptap-extension/trailing-node-extension";
import { ImageUploadNode } from "../../@/components/tiptap-node/image-upload-node/image-upload-node-extension";

import { Navbar } from "../components/Navbar";
import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { Navigate, useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { Loading } from "../components/Loading";
import { useHydratedUser } from "../hooks/HydratedUser";

export function Blog() {
  const { user, hydrated } = useHydratedUser();

  
  const [content, setContent] = useState<JSONContent | null>(null);
  const [searchParams] = useSearchParams();
  const postId = searchParams.get('postid')

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${BACKEND_URL}/blog/get`, {
        params: {
          id: postId,
        },
      });

      const parsedContent = JSON.parse(response.data.data.content);
      const finalData = {
        ...response.data.data,
        content: parsedContent,
      };
      setContent(finalData);
      document.title = finalData.title;
    };
    fetchData();
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      TaskItem,
      TaskList,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Typography,
      Highlight,
      Subscript,
      Superscript,
      Underline,
      Link,
      Selection,
      TrailingNode,
      ImageUploadNode,
    ],
    content: content?.content,
    editable: false,
  });
  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content.content as JSONContent);
    }
  }, [editor, content]);

  if (!hydrated) return <Loading/>
  if (!user) return <Navigate to="/" replace />;

  if (!content || !editor) {
    return <Loading/>
  }

  return (
    <div>
      <Navbar handleOnClick={() => {}} />
      <div className="grid grid-cols-3">
        <div className="flex justify-end w-full col-span-2">
          
        <div className="flex justify-end max-w-2xl prose p-4">

          <EditorContent editor={editor} />
        </div>
        </div>
        <div className="flex col-span-1 flex-col justify-start p-8 pl-20">
          <h1 className="text-xl text-green font-semibold">Published By:</h1>
          <Card id={content.author.id} image={content.author.image} name={content.author.name}/>
        </div>
      </div>
    </div>
  );
}

type cardProps={
  id: string;
  image: string;
  name: string;
}
function Card({id,image,name}: cardProps) {
  const navigate = useNavigate();

  const description =
    "Description Yet to be added";
  return (
    <div className="flex items-start gap-2 mt-5">
      <img
        src={image}
        alt=""
        className="w-10 h-10 rounded-full"
      />
      <div className="min-w-50">
        <button onClick={()=>{navigate(`/profile?id=${id}`)}} className="text-md cursor-pointer font-semibold">{name}</button>
        <p className="text-sm font-light line-clamp-2">
          {truncateWords(description, 14)}
        </p>
      </div>
    </div>
  );
}

function truncateWords(text: string, wordLimit: number) {
  return text.split(" ").slice(0, wordLimit).join(" ") + "...";
}
