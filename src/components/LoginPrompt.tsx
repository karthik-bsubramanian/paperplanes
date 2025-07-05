import { useState } from "react";
import { Authcard } from "../pages/Authcard";
import { FilePen } from "lucide-react";

export const LoginPrompt = () => {
  const [authCardOpen, setAuthCardOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-8 right-8 z-50">
        <div className="bg-green text-white rounded-2xl p-6 shadow-lg max-w-sm">
          <div className="flex items-center space-x-3 mb-3">
            <FilePen className="h-6 w-6" />
            <h3 className="text-lg font-bold">Start Writing Today</h3>
          </div>
          <p className="text-sm mb-4 text-green-50">
            Join thousands of writers sharing their stories. Create your first
            blog post in minutes.
          </p>
          <button
            onClick={() => setAuthCardOpen(true)}
            className="w-full bg-white text-green font-semibold py-2 px-4 rounded-xl hover:bg-green-50 transition-colors"
          >
            Get Started
          </button>
        </div>
      </div>

      {authCardOpen && <Authcard isOpen={setAuthCardOpen} />}
    </>
  );
};
