"use client";


import StepOne from "@/components/StepOne";
import { MyComposition } from "@/remotion/Composition";
import { Player } from "@remotion/player";
import { DURATION_IN_FRAMES, VIDEO_FPS, VIDEO_HEIGHT, VIDEO_WIDTH } from "../../types/constants";
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
      <div className="overflow-hidden rounded-geist shadow-[0_0_200px_rgba(0,0,0,0.15)] mb-10 mt-16">
        <Player
          component={MyComposition}
          durationInFrames={DURATION_IN_FRAMES}
          fps={VIDEO_FPS}
          compositionHeight={VIDEO_HEIGHT}
          compositionWidth={VIDEO_WIDTH}
          style={{
            // Can't use tailwind class for width since player's default styles take presedence over tailwind's,
            // but not over inline styles
            width: "100%",
          }}
          controls
          autoPlay
          loop
        />
      </div>

      <View
        setStep={setStep}
        setPrompt={setPrompt}
        videoURL={videoURL}
        setVideoURL={setVideoURL}
      />
    </div>
  );
}
