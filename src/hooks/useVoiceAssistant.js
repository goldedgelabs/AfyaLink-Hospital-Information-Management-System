// src/hooks/useVoiceAssistant.js
import { useRef, useState } from "react";

export default function useVoiceAssistant() {
  const recognitionRef = useRef(null);
  const [listening, setListening] = useState(false);

  function supported() {
    return typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);
  }

  function start(onResult) {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return false;
    const r = new SR();
    r.lang = "en-US";
    r.interimResults = false;
    r.onresult = (e) => {
      const text = e.results[0][0].transcript;
      onResult(text);
    };
    r.onerror = (e) => {
      console.error("speech error", e);
    };
    r.onend = () => setListening(false);
    recognitionRef.current = r;
    r.start();
    setListening(true);
    return true;
  }

  function stop() {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setListening(false);
  }

  function speak(text) {
    const s = window.speechSynthesis;
    if (!s) return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    s.speak(u);
  }

  return { supported, start, stop, listening, speak };
  }
