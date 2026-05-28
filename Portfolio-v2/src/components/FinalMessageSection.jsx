"use client";

import { useState, useRef } from "react";
import SectionHeading from "./SectionHeading";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

// Placeholder captions (start and end times in seconds)
// You can adjust these times and text as you listen to the audio!
const CAPTIONS = [
  { start: 0, end: 5, text: "Whatever happens, happens. Stop obsessing over things that you can't control." },
  { start: 5, end: 10, text: "Life will not go the way you planned, and that's okay." },
  { start: 10, end: 14, text: "Just learn to accept things and trust in timing." },
  { start: 14, end: 16, text: "And don't forget, everything happens for a reason." },
  { start: 16, end: 20, text: "Stay positive. Make the best out of what life threw at you." },
  { start: 20, end: 27, text: "And when you're frustrated that things didn't go the way you planned, remember, God had a different plan." },
  { start: 27, end: 32, text: "Whatever happens, happens." },
];

export default function FinalMessageSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [activeCaption, setActiveCaption] = useState("");
  
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    
    const current = audioRef.current.currentTime;
    setCurrentTime(current);
    setProgress((current / duration) * 100);

    const caption = CAPTIONS.find(c => current >= c.start && current < c.end);
    setActiveCaption(caption ? caption.text : "");
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    if (!audioRef.current) return;
    const seekTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = seekTime;
    setProgress(e.target.value);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return (
    <section id="final-message" className="portfolio-section">
      <SectionHeading number="08" title="A Personal Note" id="message-heading" />
      
      <div style={{ 
        width: "100%", 
        marginTop: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem"
      }}>
        
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", color: "var(--ink-soft)", lineHeight: "1.6" }}>
          Thanks for making it all the way to the end! I have a little something for you. I hope it resonates with you in some way, and maybe even gives you a little boost of motivation or perspective.
        </p>

        {/* Audio Element */}
        <audio 
          ref={audioRef}
          src="/Voice/AkhilThirunalveli_Message.mp3"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
        />

        {/* Custom Player UI */}
        <div style={{ 
          display: "flex", 
          flexDirection: "column", 
          background: "var(--bg-surface)", 
          border: "1px solid var(--rule-soft)",
          borderLeft: "1px solid var(--rule-soft)",
          boxShadow: "var(--shadow-soft)"
        }}>
          
          {/* Captions Display (Top Bar) */}
          <div style={{
            padding: "1.25rem 1.5rem",
            borderBottom: "1px solid var(--rule-soft)",
            background: "var(--bg-surface-hover)",
            minHeight: "4.5rem",
            display: "flex",
            alignItems: "center",
            fontFamily: "var(--font-sans)",
            fontSize: "1.05rem",
            color: "var(--ink)",
            fontWeight: 400,
            lineHeight: "1.5"
          }}>
            <span style={{ color: "var(--blueprint)", marginRight: "8px", fontWeight: "bold" }}>&gt;</span>
            {activeCaption || "..."}
          </div>

          {/* Controls & Progress (Bottom Bar) */}
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "1.5rem",
            padding: "1rem 1.5rem" 
          }}>
            <button 
              onClick={togglePlay}
              style={{ 
                background: "var(--blueprint)", 
                color: "var(--bg-surface)", 
                border: "none", 
                borderRadius: "4px", 
                width: "40px", 
                height: "40px", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                cursor: "pointer",
                flexShrink: 0,
                transition: "transform 0.1s"
              }}
              onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.95)"}
              onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: "3px" }} />}
            </button>

            <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "1rem" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--ink-soft)", minWidth: "40px", textAlign: "right" }}>
                {formatTime(currentTime)}
              </span>
              
              <div style={{ flex: 1, height: "6px", background: "var(--rule-soft)", borderRadius: "3px", position: "relative", cursor: "pointer" }}
                   onClick={(e) => {
                     const rect = e.currentTarget.getBoundingClientRect();
                     const pos = (e.clientX - rect.left) / rect.width;
                     const seekTime = pos * duration;
                     if(audioRef.current) audioRef.current.currentTime = seekTime;
                     setProgress(pos * 100);
                   }}>
                <div style={{ 
                  position: "absolute", 
                  top: 0, 
                  left: 0, 
                  height: "100%", 
                  width: `${progress}%`, 
                  background: "var(--blueprint)", 
                  borderRadius: "3px" 
                }} />
                <div style={{
                  position: "absolute",
                  top: "50%",
                  left: `${progress}%`,
                  transform: "translate(-50%, -50%)",
                  width: "12px",
                  height: "12px",
                  background: "var(--bg-surface)",
                  border: "2px solid var(--blueprint)",
                  borderRadius: "50%",
                  pointerEvents: "none"
                }} />
              </div>
              
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--ink-soft)", minWidth: "40px" }}>
                {formatTime(duration)}
              </span>
            </div>

            <button 
              onClick={toggleMute}
              style={{ background: "transparent", border: "none", color: "var(--ink-soft)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
