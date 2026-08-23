import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";
import { useCreatePost } from "@/hooks/use-create-post";
import { useSessionStore } from "@/stores/session.store";
import { LucideLoader2, Send } from "lucide-react";
import { useState } from "react";

export const CreatePostForm = () => {
  const [content, setContent] = useState("");
  const { mutate: createPost, isPending } = useCreatePost();

  const { session } = useSessionStore();

  if (!session) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      toast.add({
        type: "error",
        description: "Post content cannot be empty",
      });
      return;
    }

    createPost(content, {
      onSuccess: () => {
        setContent("");
      },
    });
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6 space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-start gap-3">
            <img
              src={session.user.image || "/user_profile.svg"}
              alt="Avatar"
              className="size-8 rounded-full object-cover"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              rows={3}
              className="w-full resize-none bg-transparent text-sm placeholder:text-sm placeholder:text-gray-500 focus:outline-none"
            />
          </div>

          <div className="w-full h-px bg-gray-300/50" />

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isPending || !content.trim()}
              className="cursor-pointer"
            >
              {isPending ? (
                <LucideLoader2 className="size-4 animate-spin mr-1" />
              ) : (
                <Send className="size-4 mr-1" />
              )}
              Post
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreatePostForm;
