import { useState } from "react";
import { Authcard } from "../pages/Authcard";
import { Lock } from "lucide-react";

type LoginToContinueProps = {
  message?: string;
  action?: string;
};

export const LoginToContinue = ({
  message = "You need to be logged in to access this feature",
  action = "Sign in to continue",
}: LoginToContinueProps) => {
  const [authCardOpen, setAuthCardOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8">
        <div className="bg-sandal border-2 border-green rounded-2xl p-8 max-w-md">
          <div className="flex justify-center mb-4">
            <Lock className="h-12 w-12 text-green" />
          </div>
          <h3 className="text-xl font-bold text-green mb-3">Login Required</h3>
          <p className="text-gray-600 mb-6">{message}</p>
          <button
            onClick={() => setAuthCardOpen(true)}
            className="w-full bg-green text-white font-semibold py-3 px-6 rounded-xl hover:bg-green-600 transition-colors"
          >
            {action}
          </button>
        </div>
      </div>

      {authCardOpen && <Authcard isOpen={setAuthCardOpen} />}
    </>
  );
};
