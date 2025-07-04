import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loadingGIF from '../assets/transparent black loading.gif';
import { userState } from "../jotai/atom";
import { useAtom } from "jotai";
import { BACKEND_URL } from "../../config";

export function CustomGoogleButton() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [, setUserData] = useAtom(userState);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );

        const userData = res.data;

        if (!userData) {
          console.error("Failed to fetch user data from Google");
          return;
        }

        // Try signing in
        try {
          const signinRes = await axios.post(
            `${BACKEND_URL}/user/signin`,
            {
              email: userData.email,
            }
          );

          
            localStorage.setItem("authtoken", signinRes.data.jwt);
            setUserData({
              id: signinRes.data.id,
              name: signinRes.data.name,
              image: signinRes.data.image
            })
            console.log("Signin success");
            setLoading(false);
            navigate("/home");
            return;
          
        } catch (err: any) {
          // If 400 (user not found), try signup
          if (err.response?.status === 400) {
            const signupRes = await axios.post(
              `${BACKEND_URL}/user/signup`,
              {
                email: userData.email,
                name: userData.name,
                image: userData.picture,
                googleid: "",
              }
            );

            if (signupRes.data.jwt) {
              localStorage.setItem("authtoken", signupRes.data.jwt);
              setUserData({
              id: signupRes.data.id,
              name: signupRes.data.name,
              image: signupRes.data.image
            })
              setLoading(false);
              console.log("Signup success");
              navigate("/home");
              return;
            } else {
              console.error("Signup failed, no token returned");
            }
          } else {
            console.error("Unexpected signin error", err);
          }
        }
      } catch (err) {
        console.error("Google login failed", err);
      }
    },
    onError: () => {
      console.log("Login Failed");
    },
  });

  return (
    <>
      {!loading ? (
        <button
          onClick={() =>{ 
            login();
            setLoading(true);
          }}
          className="flex items-center cursor-pointer justify-center gap-2 bg-white text-black mx-10 py-2 rounded-full w-full transition duration-200 border border-gray-300"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google logo"
            className="w-5 h-5"
          />
          <span className="text-sm font-semibold">Continue with Google</span>
        </button>
      ) : (
        <div className="bg-white">
          <img src={loadingGIF} alt="" className="h-8 w-8 bg-white" />
        </div>
      )}
    </>
  );
}
