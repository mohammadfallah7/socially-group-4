import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";
import { useCreatePost } from "@/hooks/use-create-post";
import { useUploadImage } from "@/hooks/use-upload-image";
import { useSessionStore } from "@/stores/session.store";
import { Image, LucideLoader2, Send, X } from "lucide-react";
import { useRef, useState } from "react";
import UserAvatar from "../UserAvatar";

export const CreatePostForm = () => {
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: createPost, isPending: isCreating } = useCreatePost();
  const { mutateAsync: uploadImage, isPending: isUploading } = useUploadImage();

  const { session } = useSessionStore();

  if (!session) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim() && !selectedFile) {
      toast.add({
        type: "error",
        description: "Post content cannot be empty",
      });
      return;
    }

    try {
      let imageKey: string | undefined = undefined;

      if (selectedFile) {
        const uploadRes: any = await uploadImage(selectedFile);
        // دقیقا منطق استخراج عکس مشابه EditProfileModal
        const imageUuid = uploadRes?.file || uploadRes?.id || uploadRes?.uuid;
        if (imageUuid) {
          imageKey = String(imageUuid)
            .replace(/^\/+|\/+$/g, "")
            .trim();
        }
      }

      createPost(
        { content, image: imageKey },
        {
          onSuccess: () => {
            setContent("");
            setSelectedFile(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
          },
        },
      );
    } catch {
      toast.add({
        type: "error",
        description: "Failed to upload image",
      });
    }
  };

  const isPending = isCreating || isUploading;

  return (
    <Card className="w-full">
      <CardContent className="pt-6 space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-start gap-3">
            <UserAvatar image={session.user.image} />
            <div className="w-full space-y-2">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's on your mind?"
                rows={3}
                className="w-full resize-none bg-transparent text-sm placeholder:text-sm placeholder:text-gray-500 focus:outline-none"
              />

              {selectedFile && (
                <div className="relative w-fit">
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    alt="preview"
                    className="max-h-40 rounded-xl object-cover border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFile(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="absolute top-1 right-1 p-1 bg-black/60 rounded-full text-white cursor-pointer"
                  >
                    <X className="size-3" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="w-full h-px bg-gray-300/50" />

          <div className="flex items-center justify-between">
            <div>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="hidden"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={isPending}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                <Image className="size-4 mr-1 text-blue-500" />
                Photo
              </Button>
            </div>

            <Button
              type="submit"
              disabled={isPending || (!content.trim() && !selectedFile)}
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
