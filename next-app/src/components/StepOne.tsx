import { StepProps } from "@/app/page";
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

export default function StepOne({
  setStep,
  setVideoURL,
  setPrompt,
}: StepProps) {
  return (
    <Card className="max-w-[800px] mx-auto space-y-4">
      <CardHeader className="slace-y-4">
        <CardTitle>Generate a highlight reel</CardTitle>
        <CardDescription>
          Use YouTube videos to create a highlight reel of your favorite
          moments.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>YouTube link</Label>
          <Input
            placeholder="https://youtube.com/watch?your-video"
            onChange={(e) => {
              setVideoURL(e.target.value);
            }}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => {
            setStep((step) => step + 1);
          }}
        >
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
}
