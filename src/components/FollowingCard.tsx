import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type cardProps={
  id: string;
  image: string;
  name: string;
}
type followingPpl = {
    id: string;
    image: string;
    name: string;
}
type followingProps = {
    userid: string;
}

export function Following({ userid }: followingProps) {
  const [followingPpl, setFollowingPpl] = useState<followingPpl[] | []>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/user/following/${userid}`, {
          params: {
            id: userid,
          },
        });
        setFollowingPpl(res.data.followingPpl);
        setLoading(false);
      } catch (error) {
        setFollowingPpl([]);
      }
    };
    fetchData();
  }, [userid]);
  return (
    <>
      {!loading ? (
        followingPpl.length > 0 ? (
          followingPpl.map((person) => (
            <FollowingCard
              key={person.id}
              id={person.id}
              image={person.image}
              name={person.name}
            />
          ))
        ) : (
          <div className="w-full h-40 flex justify-center text-sm items-center font-semibold">Following list is empty!</div>
        )
      ) : (
        <div className="w-full h-40 flex justify-center text-sm items-center font-semibold">loading...</div>
      )}
    </>
  );
}

function FollowingCard({id,image,name}: cardProps) {
    const navigate = useNavigate();
  const description =
    "Description Yet to be added";
  return (
    <div className="flex items-start gap-2 mt-8">
      <img
        src={image}
        alt=""
        className="w-10 h-10 rounded-full"
      />
      <div className="min-w-50">
        <button onClick={()=>navigate(`/profile?id=${id}`)} className="text-md cursor-pointer font-semibold">{name}</button>
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