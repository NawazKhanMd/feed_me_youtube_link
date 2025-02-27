"use client";

import ParentLayout from "@/components/parentLayout";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";

const PlayerComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const videoId = searchParams.get("video");
  const playerRef = useRef<any>(null);
  const playerEventRef = useRef<any>(null);
  const [isGifVisible, setIsGifVisible] = useState(false);
  const [gifCorner, setGifCorner] = useState("bottom-right");
  let t3: any;

  const createPlayer = () => {
    try {
      playerRef.current = new window.YT.Player("youtube-player", {
        videoId,
        playerVars: { autoplay: 1, controls: 1 },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
    } catch (error) {
      console.log(error)
    }
  };

  const onPlayerReady = (event: any) => {
    const savedPlayerPrevTime = localStorage.getItem(`${videoId}_Player_Time`);
    const savedPastTime = localStorage.getItem(`${videoId}_Current_Time`);
    console.log(
      `Player stopped at ${savedPlayerPrevTime} seconds and time was ${savedPastTime}`
    );
    if (!!savedPlayerPrevTime) {
      console.log(savedPastTime);
      const secondsPassedsinceLastStop = !!savedPastTime
        ? (Date.now() - Number(savedPastTime)) / 1000
        : 0;
      console.log(
        `Time passed since last stopped ${secondsPassedsinceLastStop}`
      );
      const newSeekSeconds =
        secondsPassedsinceLastStop + Number(savedPlayerPrevTime);
      console.log(`Seeking to ${newSeekSeconds}`);
      event.target.seekTo(newSeekSeconds, true);
      setTimeout(() => {
        event.target.playVideo();
      }, 1000);
    } else {
      event.target.seekTo(0, true);
    }
  };

  const onPlayerStateChange = (event: any) => {
    playerEventRef.current = event;
    const currentTime = event.target.getCurrentTime();
    localStorage.setItem(`${videoId}_Player_Time`, currentTime.toString());
    console.log(
      event.data === window.YT.PlayerState.PLAYING ? Date.now().toString() : ""
    );
    localStorage.setItem(
      `${videoId}_Current_Time`,
      event.data === window.YT.PlayerState.PLAYING ? Date.now().toString() : ""
    );
  };

  const loadYouTubeAPI = () => {
    if (window.YT && window.YT.Player) {
      window.YT = undefined;
      window.onYouTubeIframeAPIReady = null;
    }
    window.onYouTubeIframeAPIReady = createPlayer;
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (!videoId) return;
    loadYouTubeAPI();
  }, [videoId]);

  useEffect(() => {
    let t1: any;
    let t2: any;
    const showGif = () => {
      const options = ["top-left", "top-right", "bottom-left", "bottom-right"];
      const randomCorner = options[Math.floor(Math.random() * options.length)];
      setGifCorner(randomCorner);
      setIsGifVisible(true);
      t1 = setTimeout(() => {
        setIsGifVisible(false);
      }, 6000);
      t2 = setInterval(showGif, 8000);
    };
    showGif();
    return () => {
      clearTimeout(t1);
      clearInterval(t2);
      clearInterval(t3);
    };
  }, []);

  return (
    <ParentLayout backTitle={"Change link"}>
      <div id="youtube-player" data-testid="youtube-player" className="w-[800px] h-[450px] z-1"></div>
      {isGifVisible && (
        <img
          onClick={() => router.push(`/gifPage`)}
          src="/gifs/smiling.gif"
          alt="Funny GIF"
          className={`w-24 h-24 object-contain absolute transition-all duration-500 ${
            gifCorner === "top-left" ? "top-5 left-5" : ""
          }
        ${gifCorner === "top-right" ? "top-5 right-5" : ""}
        ${gifCorner === "bottom-left" ? "bottom-5 left-5" : ""}
        ${gifCorner === "bottom-right" ? "bottom-5 right-5" : ""}`}
        />
      )}
    </ParentLayout>
  );
}

const Player = () => (
  <Suspense fallback={<div>wait, am having tea!</div>}>
    <PlayerComponent />
  </Suspense>
);

export default Player;
