import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig } from "remotion";

import { OffthreadVideo, staticFile } from "remotion";




// Variables

const search = async ({ query, index }: { query: string, index: string }) => {

    const baseUrl = "https://api.twelvelabs.io/v1.2"
    const apiKey = "tlk_0YE7AN50A7JJ0M2MNPRBG1A9GZNM"
    const data = {
        "index_id": "6664a350e6fb7df29de0ef20",
        "page_limit": 12,
        "query": "victory",
        "search_options": [
            "visual",
            "conversation",
        ],
        "threshold": "high",
        "group_by": "clip"
    }

    // Send request
    const response = await fetch(baseUrl + "/search", {
        method: "POST",
        headers: { "x-api-key": apiKey, "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    const json = await response.json()
    return json
}





const SequenceFromSearchResults = ({ data }) => {
    const { fps, durationInFrames, width, height } = useVideoConfig();

    let acc = 0;
    return <>
        {data.map((item) => {
            acc += (item.end - item.start)

            return <Sequence
                key={item.video_id}
                durationInFrames={Math.ceil((item.end - item.start) * fps)}
                from={Math.floor(acc * fps)}
            >

                <OffthreadVideo
                    src={staticFile("tiger_woods.mp4")}
                    // src={staticFile(`${item.video_id}.mp4`)}
                    startFrom={Math.floor(item.start * fps)}
                    endAt={Math.ceil(item.end * fps)}
                />
                <AbsoluteFill style={{
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: 100,
                    color: "white"
                }}>
                    Tiger Woods
                </AbsoluteFill>

            </Sequence>
        })
        }

    </>
}

const dd = [
    {
        "score": 84.81,
        "start": 824.479,
        "end": 832.51,
        "metadata": [
            {
                "type": "conversation",
                "text": "did you Did you, uh, does it feel a little more special to win this when you're so young, as opposed to, you know, having a fight on for more years?"
            },
            {
                "type": "visual"
            }
        ],
        "video_id": "6664a409d22b3a3c97bf1876",
        "confidence": "high",
        "thumbnail_url": "https://project-one-thumbnail.s3.us-west-2.amazonaws.com/6664a409d22b3a3c97bf1876/825.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAYRWJPOVHW6XGLKFV%2F20240608%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240608T213550Z&X-Amz-Expires=604799&X-Amz-SignedHeaders=host&x-id=GetObject&X-Amz-Signature=9e9baf84639682e2ef5e1671e85fc0dc0d46383e3bb387762e35a4bc1a115724",
        "modules": [
            {
                "type": "",
                "confidence": "low"
            },
            {
                "type": "",
                "confidence": "high"
            }
        ]
    },
    {
        "score": 84.58,
        "start": 349.000000000062,
        "end": 379.0000000000859,
        "metadata": [
            {
                "type": "text_in_video",
                "text": "Listen to analysis of Liverpool's 3-1 away victory at Fulham in the latest episode of"
            },
            {
                "type": "conversation",
                "text": "yet here you are, trophy in the Cabinet, very much thicker in the title race. How proud are you of this score?"
            }
        ],
        "video_id": "6664a3d8d22b3a3c97bf1873",
        "confidence": "high",
        "thumbnail_url": "https://project-one-thumbnail.s3.us-west-2.amazonaws.com/6664a3d8d22b3a3c97bf1873/350.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAYRWJPOVHW6XGLKFV%2F20240608%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240608T213550Z&X-Amz-Expires=604799&X-Amz-SignedHeaders=host&x-id=GetObject&X-Amz-Signature=c8f98c92be18278130a9f78df46611a8f382e90f39781e1da0aa3aad6f4bd532",
        "modules": [
            {
                "type": "text_in_video",
                "confidence": "high"
            },
            {
                "type": "",
                "confidence": "low"
            }
        ]
    },
    {
        "score": 84.08,
        "start": 45.38,
        "end": 49.959,
        "metadata": [
            {
                "type": "conversation",
                "text": "Like, what, what does it mean to just capture your second victory, make history and, and get to take a job?"
            }
        ],
        "video_id": "6664a3f5d22b3a3c97bf1875",
        "confidence": "high",
        "thumbnail_url": "https://project-one-thumbnail.s3.us-west-2.amazonaws.com/6664a3f5d22b3a3c97bf1875/46.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAYRWJPOVHW6XGLKFV%2F20240608%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240608T213550Z&X-Amz-Expires=604799&X-Amz-SignedHeaders=host&x-id=GetObject&X-Amz-Signature=9d26d7f9a57d5701945c16cb8b7efa8531f7768cd3dffa30742d1756badb9a57",
        "modules": [
            {
                "type": "",
                "confidence": "high"
            }
        ]
    }
]

export const MyComposition = () => {
    const frame = useCurrentFrame();

    const { fps, durationInFrames, width, height } = useVideoConfig();


    const data = dd;

    return (
        <>
            <SequenceFromSearchResults data={data} />
            {/* <Sequence durationInFrames={20}>
                <OffthreadVideo src={staticFile("tiger_woods.mp4")} startFrom={40 * fps} endAt={60 * fps} />;
            </Sequence>
            <Sequence durationInFrames={30} from={20}>

                <OffthreadVideo src={staticFile("tiger_woods.mp4")} startFrom={90 * fps} endAt={120 * fps} />;
            </Sequence> */}
            {/* <AbsoluteFill
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: 100,
                    backgroundColor: "white",
                }}
            >
                This {width}x{height}px video is {durationInFrames / fps} seconds long.

                The current frame is {frame}.
            </AbsoluteFill> */}
        </>
    );
};