export default function useSpeak() {
  return speak;
}

export const getDefaultVoice = () => {
  return 0;
};

export const getListOfVoices = () => {
  const synth = window.speechSynthesis;
  const voices = synth.getVoices();
  return voices.map((v, i) => {
    return {
      id: i,
      name: v.name,
      voice: v,
    };
  });
};

export const speak = (voice, text) => () => {
  const synth = window.speechSynthesis;
  const speakText = new SpeechSynthesisUtterance(text);

  // Speak end
  speakText.onend = (e) => {
    console.log("Done speaking...");
  };

  speakText.onstart = (e) => {
    console.log("starting");
  };
  // Speak error
  speakText.onerror = (e) => {
    console.error("Something went wrong");
  };

  speakText.voice = voice;
  // Set pitch and rate
  speakText.rate = 0.8;
  speakText.pitch = 0.5;
  // Speak
  synth.cancel();
  synth.speak(speakText);
};
