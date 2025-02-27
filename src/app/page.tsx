"use client";

import ParentLayout from "@/components/parentLayout";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [link, setLink] = useState("");
  const [error, showError] = useState(false);

  const getYouTubeVideoID = (url: string) => {
    const match = url.match(
      /(?:youtube\.com\/(?:[^\/]+\/[^\/]+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    );
    return match ? match[1] : null;
  };

  const handleSubmit = () => {
    const videoId = getYouTubeVideoID(link);
    if (videoId) {
      localStorage.setItem(`${videoId}_Player_Time`, "");
      localStorage.setItem(`${videoId}_Current_Time`, "");
      router.push(`/player?video=${videoId}`);
    } else {
      showError(true);
    }
  };

  return (
    <ParentLayout>
      <input
        type="text"
        value={link}
        placeholder="Paste Youtube link here"
        onChange={(e) => {
          setLink(e.target.value);
          showError(false);
        }}
        className="text-center text-xs w-96 p-3 border-2 border-green-500 bg-black text-green-300 rounded-lg shadow-md focus:ring-2 focus:ring-green-400"
      />
      {!!error ? (
        <span
          className={`text-xs text-red-300 transition-opacity duration-300 ${
            error ? "opacity-100" : "opacity-0"
          }`}
        >
          Invalid YouTube URL
        </span>
      ) : (
        <button
          onClick={handleSubmit}
          className={`text-xs transition-opacity duration-300 ${
            link ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          Submit
        </button>
      )}
    </ParentLayout>
  );
}
