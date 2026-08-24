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
import { LucideLoader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface EditProfileModalProps {
  user: {
    id: string;
    name: string;
    bio?: string | null;
    location?: string | null;
    website?: string | null;
  };
}

export const EditProfileModal = ({ user }: EditProfileModalProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [location, setLocation] = useState(user?.location || "");
  const [website, setWebsite] = useState(user?.website || "");

  useEffect(() => {
    if (open) {
      setName(user?.name || "");
      setBio(user?.bio || "");
      setLocation(user?.location || "");
      setWebsite(user?.website || "");
    }
  }, [open, user]);

  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.add({
        type: "error",
        description: "Name cannot be empty",
      });
      return;
    }

    updateProfile(
      {
        userId: user.id,
        name,
        bio: bio || undefined,
        location: location || undefined,
        website: website || undefined,
      },
      {
        onSuccess: (data) => {
          setOpen(false);
          toast.add({
            type: "success",
            description: data.message || "Profile updated successfully",
          });
        },
        onError: (error: any) => {
          toast.add({
            type: "error",
            description:
              error.response?.data?.error || "Failed to update profile",
          });
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
                <LucideLoader2 className="size-4 animate-spin mr-1" />
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