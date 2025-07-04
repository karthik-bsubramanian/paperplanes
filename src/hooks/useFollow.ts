import axios from "axios";
import { BACKEND_URL } from "../../config";

type followRequestType = {
  id: string;
  setIsDone: (status: boolean) => void;
};

export const useFollow = () => {
      return async function followUser({id,setIsDone}:followRequestType) {
        const res = await axios.post(`${BACKEND_URL}/user/action/follow`, {
          id,
        },{
            headers:{
                Authorization: "Bearer "+ localStorage.getItem('authtoken')
            }
        });
        if (res.data.message) {
          setIsDone(true);
        }
    };
}
