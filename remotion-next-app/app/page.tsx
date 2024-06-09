"use client";

import { Player } from "@remotion/player";
import type { NextPage } from "next";
import React, { useMemo, useState } from "react";
import { Main } from "../remotion/MyComp/Main";
import {
  CompositionProps,
  defaultMyCompProps,
  DURATION_IN_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "../types/constants";
import { z } from "zod";
import { RenderControls } from "../components/RenderControls";
import { Tips } from "../components/Tips/Tips";
import { Spacing } from "../components/Spacing";
import { useSearchParams } from "next/navigation";

const container: React.CSSProperties = {
  maxWidth: 768,
  margin: "auto",
  marginBottom: 20,
};

const outer: React.CSSProperties = {
  borderRadius: "var(--geist-border-radius)",
  overflow: "hidden",
  boxShadow: "0 0 200px rgba(0, 0, 0, 0.15)",
  marginBottom: 40,
  marginTop: 60,
};

const player: React.CSSProperties = {
  width: "100%",
};

const Home: NextPage = () => {
  const [text, setText] = useState<string>(defaultMyCompProps.title);
  const searchParams = useSearchParams();
  const videoUrl = searchParams.get("videoUrl");
  const start = searchParams.get("start") as string;
  const end = searchParams.get("end") as string;
  const title = searchParams.get("title");
  const duration =
    60 + 30 + 30 + 120 + (parseInt(end) - parseInt(start)) * VIDEO_FPS;

  const inputProps: z.infer<typeof CompositionProps> = useMemo(() => {
    return {
      title: text,
    };
  }, [text]);

  return (
    <div>
      <div style={container}>
        <div className="cinematics" style={outer}>
          <Player
            component={Main}
            inputProps={inputProps}
            // durationInFrames={DURATION_IN_FRAMES}
            durationInFrames={duration}
            fps={VIDEO_FPS}
            compositionHeight={VIDEO_HEIGHT}
            compositionWidth={VIDEO_WIDTH}
            style={player}
            controls
            loop
          />
        </div>
        {/* <RenderControls
          text={text}
          setText={setText}
          inputProps={inputProps}
        ></RenderControls> */}
      </div>
    </div>
  );
};

export default Home;
