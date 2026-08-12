import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export const CreatePostForm = () => {
  return (
    <Card className="w-full">
      <CardContent className="pt-6 space-y-4">
        <form className="space-y-4">
          <div className="flex items-start gap-3">
            <img
              src="/user_profile.svg"
              alt="Avatar"
              className="size-10 rounded-full object-cover"
            />
            <textarea
              placeholder="Whats on your mind?"
              rows={3}
              className="w-full resize-none bg-transparent text-sm placeholder:text-gray-500 focus:outline-none"
            />
          </div>

          <div className="w-full h-px bg-gray-300/50" />

          <div className="flex justify-end">
            <Button
              type="submit"
              size="sm"
              variant="outline"
              className="gap-2 bg-white text-black hover:bg-gray-200"
            >
              <Send className="size-4" />
              Post
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreatePostForm;
