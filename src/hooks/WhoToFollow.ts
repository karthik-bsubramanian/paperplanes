import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../config";

type whoToFollow={
    id: string;
    image: string;
    name: string;
}
export const useWhoToFollow = () => {
  const [whoToFollow, setWhoToFollow] = useState<whoToFollow[]| []>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${BACKEND_URL}/user/action/whotofollow`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("authtoken"),
          },
        }
      );
      setWhoToFollow(response.data);
    };
    fetchData();
  }, []);


  return whoToFollow;
};
