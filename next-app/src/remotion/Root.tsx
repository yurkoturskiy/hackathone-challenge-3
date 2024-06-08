import React from "react";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";

export const RemotionRoot: React.FC = () => {
    return (
        <div>


            <Composition
                id="Empty"
                component={MyComposition}
                durationInFrames={60 * 24}
                fps={24}
                width={1280}
                height={720}
            />
        </div>
    );
};