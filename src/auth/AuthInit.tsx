import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { userState } from "../jotai/atom";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import loadingGIF from '../assets/black loading.gif';

type props = {
    children: React.ReactNode;
}

export const AuthInit = ({children}:props)=>{
  const [, setUserState] = useAtom(userState);
  const token = localStorage.getItem("authtoken")??null;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const validateToken = async () => {
      if (token) {
        try {
          const res = await axios.get(`${BACKEND_URL}/user/action/me`, {
            headers: {
              Authorization: "Bearer " + token,
            },
          });
          setUserState(res.data.user);
        } catch (error) {
            console.error('token Invalid');
            localStorage.removeItem('authtoken');
            setUserState(null);
        }
    }

    setLoading(false);
    };
    validateToken();
  }, [token,setUserState]);

  if(loading){
    return <div className="min-h-screen flex justify-center items-center backdrop-blur-3xl">
        <img src={loadingGIF} alt="" className="h-8 w-8 z-20"/>
    </div>
  }

  return children;
}