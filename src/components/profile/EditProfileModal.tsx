import { useState, useRef } from "react";
import { LucideLoader2, Camera } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { useUpdateProfile } from "@/hooks/use-update-profile";
import { useUploadImage } from "@/hooks/use-upload-image";

interface EditProfileModalProps {
  user: {
    id: string;
    name: string;
    image?: string | null;
    bio?: string | null;
    location?: string | null;
    website?: string | null;
  };
}

export const EditProfileModal = ({ user }: EditProfileModalProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user?.bio ?? "");
  const [location, setLocation] = useState(user?.location ?? "");
  const [website, setWebsite] = useState(user?.website ?? "");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();
  const { mutateAsync: uploadImage, isPending: isUploading } = useUploadImage();

  const isPending = isUpdating || isUploading;

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      setName(user.name);
      setBio(user?.bio ?? "");
      setLocation(user?.location ?? "");
      setWebsite(user?.website ?? "");
      setSelectedFile(null);
      setPreviewUrl(null);
    }
    setOpen(newOpen);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.add({
        type: "error",
        description: "Name cannot be empty",
      });
      return;
    }

    try {
      let finalImageUrl = user.image || undefined;

      if (selectedFile) {
        const uploadRes: any = await uploadImage(selectedFile);

        const imageUuid = uploadRes?.file || uploadRes?.id || uploadRes?.uuid;

        if (imageUuid) {
          const cleanUuid = String(imageUuid)
            .replace(/^\/+|\/+$/g, "")
            .trim();
          finalImageUrl = `https://1p5nep1spk.ucarecd.net/${cleanUuid}/`;
        }
      }

      updateProfile(
        {
          userId: user.id,
          name: name.trim(),
          bio: bio.trim(),
          location: location.trim(),
          website: website.trim(),
          image: finalImageUrl,
        },
        {
          onSuccess: (data) => {
            setOpen(false);
            toast.add({
              type: "success",
              description: data.message || "Profile updated successfully",
            });
          },
          onError: (error) => {
            toast.add({
              type: "error",
              description: error.message || "Failed to update profile",
            });
          },
        },
      );
    } catch (error: any) {
      toast.add({
        type: "error",
        description: error?.message || "Failed to upload image",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger className="w-full">
        <Button type="button" className="w-full cursor-pointer">
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="flex flex-col items-center justify-center gap-2">
            <div
              className="relative cursor-pointer group"
              onClick={() => fileInputRef.current?.click()}
            >
              <img
                src={previewUrl || user.image || "/user_profile.svg"}
                alt="Profile Preview"
                className="size-20 rounded-full object-cover border-2 border-muted"
              />
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="size-6 text-white" />
              </div>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <span className="text-xs text-muted-foreground">
              Click photo to change
            </span>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Enter your bio"
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter your location"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="Enter your website"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending && (
                <LucideLoader2 className="mr-1 size-4 animate-spin" />
              )}
              Save changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
