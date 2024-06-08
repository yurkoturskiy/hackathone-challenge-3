"use client";


import StepOne from "@/components/StepOne";
import { MyComposition } from "@/remotion/Composition";
import { Player } from "@remotion/player";
import { useState } from "react";
import { DURATION_IN_FRAMES, VIDEO_FPS, VIDEO_HEIGHT, VIDEO_WIDTH } from "../../types/constants";

export default function Home() {
  const [step, setStep] = useState(1);
  const [videoURL, setVideoURL] = useState("");
  const [prompt, setPrompt] = useState("");
  const [summary, setSummary] = useState("");
  const [highlight, setHighlight] = useState("");
  const [feedback, setFeedback] = useState("");

  return (<div>



    {step === 1 && (
      <StepOne
        setStep={setStep}
        setPrompt={setPrompt}
        setVideoURL={setVideoURL}
      />
    )}
  </div>
  );
}
