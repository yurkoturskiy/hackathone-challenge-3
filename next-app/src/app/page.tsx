import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

export default function Home() {
  return (
    <div className="max-w-[800px] mx-auto space-y-4">
      <div>
        <Label>YouTube link</Label>
        <Input placeholder="https://youtube.com/watch?your-video" />
      </div>
      <div>
        <Label>Promp</Label>
        <Textarea placeholder="Create a highlight reel of Roger Federer discussing his retirement" />
      </div>

      <Button>Generate</Button>
    </div>
  );
}
