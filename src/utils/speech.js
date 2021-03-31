const synth = window.speechSynthesis;

export default function useSpeak() {
  return { speak, synth };
}

export const getDefaultVoice = () => {
  return 0;
};

export const pause = () => {
  synth.pause();
};

export const getListOfVoices = () => {
  const voices = synth.getVoices();
  return voices.map((v, i) => {
    return {
      id: i,
      name: v.name,
      voice: v,
    };
  });
};

export const speak = (text) => () => {
  if (synth.speaking) {
    synth.pause();
  } else if (synth.paused) {
    synth.resume();
  } else {
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

    // speakText.voice = voice;
    // Set pitch and rate
    speakText.rate = 0.8;
    speakText.pitch = 0.5;

    // speakText.lang = "en-US";
    // Speak
    synth.cancel();
    synth.speak(speakText);

    // let r = setInterval(() => {
    //   // console.log(speechSynthesis.speaking);
    //   if (!speechSynthesis.speaking) {
    //     clearInterval(r);
    //   } else {
    //     speechSynthesis.resume();
    //   }
    // }, 14000);
  }
};
