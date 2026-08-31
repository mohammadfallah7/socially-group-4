import { getUsernameFromEmail } from "@/lib/utils";
import type { RecommendedUser } from "@/types/user.type";
import { Link } from "react-router";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useToggleFollow } from "@/hooks/use-toggle-follow";
import UserAvatar from "../UserAvatar";

const RecommendedUserCard = ({ user }: { user: RecommendedUser }) => {
  const { mutate, isPending } = useToggleFollow();

  return (
    <div className="flex items-center justify-between">
      <Link
        to={`/profile/${getUsernameFromEmail(user.email)}`}
        className="flex items-center gap-3"
      >
        <UserAvatar image={user.image} />

        <div>
          <p className="text-md font-medium">{user.name}</p>

          <p className="text-sm text-muted-foreground">
            {user._count.followers} followers
          </p>
        </div>
      </Link>
      <Button
        variant="outline"
        className="cursor-pointer"
        onClick={() => mutate(user.id)}
      >
        {isPending ? <Loader2 className="size-4 animate-spin" /> : "Follow"}
      </Button>
    </div>
  );
};

export default RecommendedUserCard;
