import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideLink, LucideMapPin } from "lucide-react";
import { useParams } from "react-router";
import { LucideCalendar } from "lucide-react";
import { useState } from "react";
import PostCard from "@/components/post/PostCard";
const ProfilePage = () => {
  const { username } = useParams();
  const [activeTab, setActiveTab] = useState<"posts" | "likes">("posts");

  return (
    <div className="space-y-6">
      <Card className="w-full max-w-lg mx-auto shadow-muted shadow-md">
        <CardHeader className="flex flex-col items-center gap-3">
          <img
            src="/user_profile.svg"
            alt="Avatar"
            className="size-18 rounded-full object-cover"
          />

          <div className="flex flex-col items-center gap-1.5 text-center">
            <h1 className="text-xl font-semibold">Mohammad Fallah</h1>
            <p className="text-sm text-muted-foreground">Mohammad</p>
          </div>

          <p className="text-sm text-muted-foreground text-center"></p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center">
              <h3 className="font-semibold">3</h3>
              <p className="text-sm text-muted-foreground">Following</p>
            </div>

            <div className="flex flex-col items-center">
              <h3 className="font-semibold">4</h3>
              <p className="text-sm text-muted-foreground">Followers</p>
            </div>

            <div className="flex flex-col items-center">
              <h3 className="font-semibold">5</h3>
              <p className="text-sm text-muted-foreground">Posts</p>
            </div>
          </div>

          <Button className="w-full">Edit Profile</Button>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <LucideMapPin className="size-4" />
              <p className="text-sm">No Location</p>
            </div>

            <div className="flex items-center gap-1.5 text-muted-foreground">
              <LucideLink className="size-4" />
              <p className="text-sm">No Website</p>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <LucideCalendar className="size-4" />
              <p className="text-sm">6 days ago</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="space-y-6 py">
        {/* Posts / Likes */}
        <div className="flex h-9 w-full rounded-lg bg-muted p-1">
  <button
    onClick={() => setActiveTab("posts")}
    className={`flex-1 rounded-md text-sm font-semibold text-foreground transition-all ${
      activeTab === "posts"
        ? "bg-background shadow-sm"
        : ""
    }`}
  >
    Posts
  </button>

  <button
    onClick={() => setActiveTab("likes")}
    className={`flex-1 rounded-md text-sm font-semibold text-foreground transition-all ${
      activeTab === "likes"
        ? "bg-background shadow-sm"
        : ""
    }`}
  >
    Likes
  </button>
</div>

        {/* Posts */}
        {activeTab === "posts" && (
          <div>
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
          </div>
        )}

        {/* Likes */}
        {activeTab === "likes" && (
          <div>
            <PostCard />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
