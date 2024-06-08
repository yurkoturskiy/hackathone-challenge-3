"use client";

import StepOne from "@/components/StepOne";
import StepTwo from "@/components/StepTwo";
import { Dispatch, SetStateAction, useState } from "react";

export interface StepProps {
  setStep: Dispatch<SetStateAction<number>>;
  videoURL: string;
  setVideoURL: Dispatch<SetStateAction<string>>;
  setPrompt: Dispatch<SetStateAction<string>>;
}
const steps = [StepOne, StepTwo];

export default function Home() {
  const [step, setStep] = useState(1);
  const [videoURL, setVideoURL] = useState("");
  const [prompt, setPrompt] = useState("");
  const [summary, setSummary] = useState("");
  const [highlight, setHighlight] = useState("");
  const [feedback, setFeedback] = useState("");

  const View = steps[step - 1];

  return (
    <div>
      <View
        setStep={setStep}
        setPrompt={setPrompt}
        videoURL={videoURL}
        setVideoURL={setVideoURL}
      />
    </div>
  );
}
