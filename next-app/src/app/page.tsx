"use client";

import StepOne from "@/components/StepOne";
import { useState } from "react";

export default function Home() {
  const [step, setStep] = useState(1);
  const [videoURL, setVideoURL] = useState("");
  const [prompt, setPrompt] = useState("");
  const [summary, setSummary] = useState("");
  const [highlight, setHighlight] = useState("");
  const [feedback, setFeedback] = useState("");

  return (
    <div>
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
