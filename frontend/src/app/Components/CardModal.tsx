"use client"

import { MouseEvent, useEffect, useState } from "react";
import Folder from "./Folder";
import Token from "./Token";
import axios from "axios";

interface CardModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  wallet: string;
}

interface Achievement {
  activityName: string;
  activityType: string;
}

function CardModal({ isOpen, onClose, name, wallet }: CardModalProps) {
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    const fetchAchievements = async () => {
      if (!wallet) return;
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/achievements/${wallet}`);
        setAchievements(res.data.achievements);
      } catch (err) {
        console.error("Failed to fetch achievements:", err);
        setAchievements([]);
      }
    };
    if (isOpen) fetchAchievements();
  }, [wallet, isOpen]);

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-slate-900/50 backdrop-blur-md flex justify-center items-center z-50 transition-opacity duration-300 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl relative transform scale-95 hover:scale-100 transition-transform duration-300">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-red-500 hover:text-red-900 transition-colors"
          aria-label="Close modal"
        >
          Exit
        </button>

        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-4xl font-light text-white shadow-lg">
            {name.charAt(0).toUpperCase()}
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-4">
            <Folder title="Achievements">
                <div className="flex flex-wrap gap-2 justify-center">
                {achievements.map((a, idx) => (
                    <Token key={idx} activityName={a.activityName} />
                ))}
                </div>
            </Folder>
        </div>

      </div>
    </div>
  );
}

export default CardModal;
