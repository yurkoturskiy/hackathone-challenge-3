import { StepProps } from "@/app/page";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function StepOne({
  setStep,
  setVideoURL,
  setPrompt,
}: StepProps) {
  return (
    <Card className="max-w-[800px] mx-auto space-y-4">
      <CardHeader className="slace-y-4 pb-0">
        <CardTitle>Generate a highlight reel</CardTitle>
        <CardDescription>
          Use YouTube videos to create a highlight reel of your favorite
          moments.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 mt-0">
        <div>
          <Label>YouTube link</Label>
          <div className="flex gap-2">
            <Input
              placeholder="https://youtube.com/watch?your-video"
              onChange={(e) => {
                setVideoURL(e.target.value);
              }}
            />
            <Button
              onClick={() => {
                setStep((step) => step + 1);
              }}
            >
              Continue
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
