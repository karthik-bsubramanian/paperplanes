import { FollowingCard } from "../components/FollowingBlogsCard";
import paperplaneimg from "../assets/Pngtree.png";
import { BookmarkPlus } from "lucide-react";
import { NoFollowers } from "../components/NoFollowers";
import { useNavigate } from "react-router-dom";
import { useFollowingBlogs } from "../hooks/FollowingBlogs";
import fetchmore from "../assets/fetchmore.gif";
import { useWhoToFollow } from "../hooks/WhoToFollow";
import { useState } from "react";
import { useFollow } from "../hooks/useFollow";

export const Following = () => {
  const Topics = [
    "Programming",
    "Writing",
    "Politics",
    "Internet",
    "Relationship",
    "Technology",
  ];
  const navigate = useNavigate();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFollowingBlogs();

  const followingBlogs = data?.pages?.flatMap((page) => page.data) || [];

  const whoToFollow = useWhoToFollow();

  const skeletonContent = Array(5).fill({ content: "karthik" });

  return (
    <div>
      <img
        src={paperplaneimg}
        alt="paperplaneimg"
        className="absolute h-40 w-40 left-15 mt-10"
      />
      <div className="grid grid-cols-12">
        <div className="col-span-8">
          {!isLoading && followingBlogs.length === 0 && <NoFollowers />}
          {isLoading
            ? skeletonContent.map((blog, id) => (
                <FollowingCard
                  loading={isLoading}
                  key={id}
                  id={blog.id}
                  title={blog.title}
                  userId={blog.userId}
                  topic={blog.topic}
                  description={blog.description}
                  createdAt={blog.createdAt}
                  image={blog.image}
                  userName={blog.userName}
                  isSaved={blog.isSaved}
                />
              ))
            : followingBlogs.map((blog) => (
                <FollowingCard
                  loading={isLoading}
                  key={blog.id}
                  id={blog.id}
                  title={blog.title}
                  userId={blog.userId}
                  topic={blog.topic}
                  description={blog.description}
                  createdAt={blog.createdAt}
                  image={blog.image}
                  userName={blog.userName}
                  isSaved={blog.isSaved}
                />
              ))}
          {hasNextPage && (
            <div className="w-full pb-10 flex justify-center items-center">
              <button
                disabled={isFetchingNextPage}
                onClick={() => fetchNextPage()}
                className="rounded-3xl p-2 px-5 mt-5 bg-black cursor-pointer text-white text-xs font-semibold"
              >
                {isFetchingNextPage ? (
                  <div className="flex whitespace-pre">
                    Loading <img src={fetchmore} alt="" className="h-5 w-5" />
                  </div>
                ) : (
                  "Load more  》"
                )}
              </button>
            </div>
          )}
        </div>

        <div className="pl-10 col-span-4 min-h-max">
          <div className="sticky top-10 self-start">
            <span className="text-md font-medium">Recommended topics</span>
            <div className="flex flex-wrap gap-2 max-w-60 mt-5">
              {Topics.map((topic) => (
                <button
                  key={topic}
                  className="bg-gray-200 p-1 px-2 w-max text-base rounded-3xl"
                >
                  {topic}
                </button>
              ))}
              <button
                onClick={() => navigate("/topics")}
                className="text-xs hover:underline cursor-pointer mt-2"
              >
                See more topics...
              </button>
            </div>
            <div className="mt-10">
              <span className="text-xl font-bold">Who to follow</span>
              <div>
                {whoToFollow.length === 0 && (
                  <div className="w-full h-full flex justify-center text-sm pt-10 items-center">
                    Holy moly you've followed Everyone
                  </div>
                )}
                {whoToFollow.length > 0 &&
                  whoToFollow.map((person) => {
                    return (
                      <Card
                        key={person.id}
                        id={person.id}
                        image={person.image}
                        name={person.name}
                      />
                    );
                  })}
              </div>
            </div>
            <p className="text-sm font-light mt-20 px-10 mx-auto mb-15">
              Click the {<BookmarkPlus className="inline" strokeWidth={0.5} />}{" "}
              on any story to easily add it to your reading list.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

type cardProps = {
  id: string;
  image: string;
  name: string;
};
function Card({ id, image, name }: cardProps) {
  const [isDone, setIsDone] = useState(false);
  const follow = useFollow();
  const navigate = useNavigate();

  const description = "Description Yet to be added";
  return (
    <div className="flex items-start gap-2 mt-8">
      <img src={image} alt="" className="w-10 h-10 rounded-full object-cover" />
      <div className="min-w-50">
        <button
          onClick={() => {
            navigate(`/profile?id=${id}`);
          }}
          className="text-md cursor-pointer font-semibold"
        >
          {name}
        </button>
        <p className="text-sm font-light line-clamp-2">
          {truncateWords(description, 14)}
        </p>
      </div>
      <button
        onClick={() => follow({ id, setIsDone })}
        className={`border p-1 px-5 mx-2 cursor-pointer rounded-2xl ${
          isDone ? "bg-slate-800 text-white" : ""
        }`}
      >
        {isDone ? "Following" : "Follow"}
      </button>
    </div>
  );
}

function truncateWords(text: string, wordLimit: number) {
  return text.split(" ").slice(0, wordLimit).join(" ") + "...";
}
