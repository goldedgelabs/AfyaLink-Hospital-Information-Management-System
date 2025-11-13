// Start listening to user speech and return the SpeechRecognition instance
export function startListening(cb) {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) return;

  const recognition = new SR();

  recognition.onresult = (e) => {
    cb(e.results[0][0].transcript);
  };

  recognition.start();
  return recognition;
}

// Play text as speech using SpeechSynthesis
export function playSpeech(text) {
  const synth = window.speechSynthesis;
  if (!synth) return;

  const utterance = new SpeechSynthesisUtterance(text);
  synth.speak(utterance);
}
