import { useState } from "react";
import { Authcard } from "../pages/Authcard";
import { ArrowRight, Users, BookOpen, PenTool } from "lucide-react";

export const WelcomeBanner = () => {
  const [authCardOpen, setAuthCardOpen] = useState(false);

  return (
    <>
      <div className="bg-gradient-to-r from-green to-green-600 text-white py-8 px-6 rounded-2xl mx-20 mb-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-3">
                Welcome to PaperPlanes
              </h2>
              <p className="text-green-50 mb-6 text-lg">
                Discover amazing stories from writers around the world. Join our
                community to share your thoughts and connect with others.
              </p>
              <div className="flex items-center space-x-8 mb-6">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span className="text-sm">Read Stories</span>
                </div>
                <div className="flex items-center space-x-2">
                  <PenTool className="h-5 w-5" />
                  <span className="text-sm">Write & Share</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span className="text-sm">Connect</span>
                </div>
              </div>
              <button
                onClick={() => setAuthCardOpen(true)}
                className="bg-white text-green font-semibold px-6 py-3 rounded-xl hover:bg-green-50 transition-colors flex items-center space-x-2"
              >
                <span>Get Started</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {authCardOpen && <Authcard isOpen={setAuthCardOpen} />}
    </>
  );
};
