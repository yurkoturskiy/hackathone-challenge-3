import { StepProps } from "@/app/page";
import Iframe from "react-iframe";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import YouTubeEmbed from "./YouTubeEmbeded";

export default function StepTwo(props: StepProps) {
  const { videoURL, setVideoURL, setPrompt, setStep } = props;

  return (
    <Card className="max-w-[800px] mx-auto space-y-4">
      <CardHeader className="slace-y-4 pb-0">
        <CardTitle>What would you like to do?</CardTitle>
        <CardDescription>
          Use YouTube videos to create a highlight reel of your favorite
          moments.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 mt-0">
        <div className="flex gap-2">
          <Textarea
            placeholder="Create a highlight reel of Roger Federer discussing his retirement"
            className="resize-none h-10"
            rows={1}
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
            style={{
              scrollPaddingBlock: "68px",
            }}
          />
          <Button
            onClick={() => {
              setStep((step) => step + 1);
            }}
          >
            Generate
          </Button>
        </div>
        <YouTubeEmbed url={videoURL} />
      </CardContent>
    </Card>
  );
}
