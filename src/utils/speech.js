export default function useSpeak(text) {
  return speak;
}

export const speak = (text) => () => {
  const synth = window.speechSynthesis;
  const voices = synth.getVoices();
  const speakText = new SpeechSynthesisUtterance(text);

  // Speak end
  speakText.onend = (e) => {
    // console.log("Done speaking...");
  };

  // Speak error
  speakText.onerror = (e) => {
    // console.error("Something went wrong");
  };

  speakText.voice = voices[0];
  // Set pitch and rate
  speakText.rate = 0.8;
  speakText.pitch = 0.5;
  // Speak
  synth.speak(speakText);
};
