import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Heart, Gift, Volume2, VolumeX } from "lucide-react";

const App = () => {
  const [name, setName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [emoji, setEmoji] = useState("");
  const [message, setMessage] = useState("");
  const [showGift, setShowGift] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hearts, setHearts] = useState<
    { id: number; left: number; animationDuration: number }[]
  >([]);

  const christmasMessages = [
    "Merry Christmas Mercy! You're amazing! 🎄",
    "Mercy, you light up everyone's day! ⭐",
    "Mercy, you're the best gift ever! 🎁",
    "Mercy brings joy wherever she goes! 🌟",
    "The world is better with Mercy in it! 💝",
  ];

  const createHeart = () => {
    const heart = {
      id: Date.now(),
      left: Math.random() * 100,
      animationDuration: 3 + Math.random() * 2,
    };
    setHearts((prev) => [...prev, heart]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== heart.id));
    }, heart.animationDuration * 1000);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim()) {
      setDisplayName(name);
      if (name.toLowerCase() === "mercy") {
        setEmoji("👑");
        setMessage(
          christmasMessages[
            Math.floor(Math.random() * christmasMessages.length)
          ]
        );
        setShowGift(true);
        setIsPlaying(true);
        // Create hearts periodically
        const interval = setInterval(createHeart, 500);
        setTimeout(() => clearInterval(interval), 3000);
      } else {
        setEmoji("🎅");
        setMessage("Almost there! Try typing 'Mercy' to see the magic!");
        setShowGift(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-100 to-green-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-red-600 mb-8">
          Mercy's Christmas Wonderland 🎄✨
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type 'Mercy' here..."
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none transition-all"
          />
          <Button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white rounded-lg p-3 flex items-center justify-center gap-2">
            Spread Christmas Joy <Gift className="w-5 h-5" />
          </Button>
        </form>

        {displayName && (
          <div className="mt-8 text-center">
            <h2 className="text-4xl font-bold mb-4">
              {emoji} {displayName} {emoji}
            </h2>
            <p className="text-xl text-green-600 mb-4">{message}</p>

            {showGift && (
              <div className="space-y-4">
                <div className="flex justify-center gap-4">
                  <Button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="bg-green-500 hover:bg-green-600">
                    {isPlaying ? (
                      <Volume2 className="w-5 h-5" />
                    ) : (
                      <VolumeX className="w-5 h-5" />
                    )}
                  </Button>
                </div>

                <AlertDialog open={showGift}>
                  <AlertDialogContent className="bg-gradient-to-r from-red-100 to-green-100">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-center text-2xl text-red-600">
                        🎁 Special Christmas Message 🎁
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <div className="p-4 text-center">
                      <p className="text-lg mb-4">
                        Dear Mercy,
                        <br />
                        Your kindness and love make every day feel like
                        Christmas!
                        <br />
                        Wishing you the most magical holiday season! 🌟
                      </p>
                      <Button
                        onClick={() => setShowGift(false)}
                        className="bg-red-500 hover:bg-red-600">
                        Thank you! 💝
                      </Button>
                    </div>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </div>
        )}

        {/* Floating hearts animation */}
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute bottom-0"
            style={{
              left: `${heart.left}%`,
              animation: `float ${heart.animationDuration}s linear infinite`,
            }}>
            <Heart className="text-red-500 w-6 h-6" />
          </div>
        ))}

        <style>{`
          @keyframes float {
            0% {
              transform: translateY(0) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(-100vh) rotate(360deg);
              opacity: 0;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default App;
