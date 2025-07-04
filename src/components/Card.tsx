import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";

type cardProps = {
  cardType?: string;
  date?: string;
  title?: string;
  blogId?: string;
  firstimageurl?: string;
  author?: {
    id: string;
    name: string;
    image: string;
  };
  loading: boolean;
};

export const Card = ({
  cardType,
  date,
  blogId,
  title,
  firstimageurl,
  author,
  loading,
}: cardProps) => {
  const navigate = useNavigate();

  return (
    <div className="container rounded-2xl h-[550px] w-[400px] mx-auto overflow-hidden">
      {loading ? (
        <Skeleton height={255} width={400} />
      ) : (
        <img
          src={firstimageurl}
          alt="blog image"
          className="w-full h-[255px] object-cover"
        />
      )}

      <div className="flex justify-between font-normal text-xs px-3 pt-1">
        {loading ? (
          <>
            <Skeleton width={60} height={20} />
            <Skeleton width={50} height={20} />
          </>
        ) : (
          <>
            <span className="rounded-lg p-0.5 bg-bg-orange text-orange">
              {cardType}
            </span>
            <span className="text-green">{date}</span>
          </>
        )}
      </div>

      <h1
        onClick={() => !loading && navigate(`/home/view?postid=${blogId}`)}
        className="pt-3 text-2xl font-semibold px-1 text-green line-clamp-4 cursor-pointer hover:underline"
      >
        {loading ? <Skeleton count={3} /> : title}
      </h1>

      <div className="pt-5 px-1 flex items-center gap-2 text-green text-sm">
        {loading ? (
          <>
            <Skeleton circle width={40} height={40} />
            <Skeleton width={100} />
          </>
        ) : (
          <>
            <img
              src={author?.image}
              alt="user image"
              className="rounded-full object-cover h-10 w-10"
            />
            <button
              onClick={() => navigate(`/profile?id=${author?.id}`)}
              className="hover:underline cursor-pointer"
            >
              {author?.name}
            </button>
          </>
        )}
      </div>
    </div>
  );
};
