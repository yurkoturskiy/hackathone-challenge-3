import { z } from "zod";
import {
  AbsoluteFill,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Video,
} from "remotion";
import { CompositionProps } from "../../types/constants";
import { loadFont, fontFamily } from "@remotion/google-fonts/Inter";
import React, { useMemo } from "react";
import { Rings } from "./Rings";
import { TextFade } from "./TextFade";
import { useSearchParams } from "next/navigation";

loadFont();

const container: React.CSSProperties = {
  backgroundColor: "white",
};

const logo: React.CSSProperties = {
  justifyContent: "center",
  alignItems: "center",
  transform: "translateY(-2%)",
};

export const Main = ({ title }: z.infer<typeof CompositionProps>) => {
  const searchParams = useSearchParams();
  const videoUrl = searchParams.get("videoUrl");
  const start = searchParams.get("start") as string;
  const end = searchParams.get("end") as string;
  const text = searchParams.get("title");
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const transitionStart = 2 * fps;
  const transitionDuration = 1 * fps;

  const logoOut = spring({
    fps,
    frame,
    config: {
      damping: 200,
    },
    durationInFrames: transitionDuration,
    delay: transitionStart,
  });

  const titleStyle: React.CSSProperties = useMemo(() => {
    return { fontFamily, fontSize: 70 };
  }, []);

  const clipDurationInFrames = (parseInt(end) - parseInt(start)) * fps;
  const introDurationInFrames = transitionStart + transitionDuration;

  return (
    <AbsoluteFill style={container}>
      <Sequence durationInFrames={transitionStart + transitionDuration}>
        <Rings outProgress={logoOut}></Rings>
        <AbsoluteFill style={logo}>
          <TextFade>
            <div
              style={{
                fontSize: 36,
                color: "grey",
                fontFamily,
                lineHeight: "36px",
              }}
            >
              Name
            </div>
            <h1 style={titleStyle}>{text}</h1>
          </TextFade>
          {/* <NextLogo outProgress={logoOut}></NextLogo> */}
        </AbsoluteFill>
      </Sequence>
      <Sequence
        from={transitionStart + transitionDuration}
        durationInFrames={clipDurationInFrames}
      >
        <Video
          src={videoUrl as string}
          startFrom={parseInt(start) * fps}
          endAt={parseInt(end) * fps}
        />
      </Sequence>
      <Sequence from={introDurationInFrames + clipDurationInFrames}>
        <TextFade>
          <h1 style={titleStyle}>SportRecap.com</h1>
          <p
            style={{
              fontFamily,
              fontSize: 24,
              textAlign: "center",
              lineHeight: "24px",
            }}
          >
            TwelveLabs Hackathon – 2024
            <br />
            <br />
            The Sunburn Team
          </p>
        </TextFade>
      </Sequence>
    </AbsoluteFill>
  );
};
