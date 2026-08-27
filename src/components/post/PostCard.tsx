import { cn, getUsernameFromEmail } from "@/lib/utils";
import { useSessionStore } from "@/stores/session.store";
import type { Post } from "@/types/post.type";
import { formatDistanceToNow } from "date-fns";
import { useDeletePost } from "@/hooks/use-delete-post";
import {
  Heart,
  LucideTrash2,
  MessageCircle,
  Send,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { useToggleLike } from "@/hooks/use-toggle-like";
import UserAvatar from "../UserAvatar";
import { toast } from "../ui/toast";
import { Link } from "react-router";

type PostCardProps = {
  post: Post;
};

const PostCard = ({ post }: PostCardProps) => {
  const [addComment, setAddComment] = useState(false);
  const { mutate: toggleLike, isPending: isLikeLoading } = useToggleLike();

  const { session } = useSessionStore();

  const isLiked = post.likes.some((l) => l.userId === session?.user.id);
  const { mutate: deletePost, isPending: isDeletePending } = useDeletePost();
  const handleDelete = () => {
    deletePost(post.id);
  };

  const [isOwnPostLoading, setIsOwnPostLoading] = useState(false);

  const isLikeButtonLoading = isLikeLoading || isOwnPostLoading;

  const handleLike = () => {
    if (session?.user.id === post.authorId) {
      toast.add({
        type: "error",
        description: "You can't like or dislike your post",
      });

      setIsOwnPostLoading(true);

      setTimeout(() => {
        setIsOwnPostLoading(false);
      }, 500);

      return;
    }

    toggleLike(post.id);
  };

  return (
    <Card className="shadow-md shadow-muted">
      <CardContent className="flex flex-col gap-5">
        {/* Post Header */}
        <div className="flex items-center justify-between">
          <Link
            to={`/profile/${getUsernameFromEmail(post.author.email)}`}
            className="flex items-center gap-3"
          >
            <UserAvatar image={post.author.image} />

            <div className="flex items-center gap-4">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                <h2 className="text-lg font-medium">{post.author.name}</h2>
                <span className="text-muted-foreground">
                  @{getUsernameFromEmail(post.author.email)}
                </span>
              </div>

              <span className="text-muted-foreground">
                {formatDistanceToNow(new Date(post.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
          </Link>
          {session?.user.id === post.authorId && (
            <Button
              variant="ghost"
              onClick={handleDelete}
              disabled={isDeletePending}
            >
              {isDeletePending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <LucideTrash2 />
              )}
            </Button>
          )}
        </div>

        {/* Post */}
        <p>{post.content}</p>

        {post.image && (
          <img
            src={`https://79gcelddzk.ucarecd.net/${post.image}/`}
            className="object-cover rounded-xl aspect-square h-80 w-2/3"
          />
        )}

        {/* Actions */}
        <div className="flex gap-6 text-muted-foreground">
          <Button
            variant="ghost"
            className={cn(
              "cursor-pointer",
              isLiked && "text-red-500 hover:text-red-500",
              isLikeButtonLoading && "opacity-50",
            )}
            disabled={isLikeButtonLoading}
            onClick={handleLike}
          >
            {isLikeButtonLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Heart className={cn(isLiked && "fill-red-500")} />
            )}

            {post._count.likes}
          </Button>

          <Button
            variant="ghost"
            className={cn(
              "cursor-pointer",
              addComment && "text-blue-500 hover:text-blue-500",
            )}
            onClick={() => setAddComment((prev) => !prev)}
          >
            <MessageCircle
              className={cn(addComment && "fill-blue-500 text-blue-500")}
            />
            {post._count.comments}
          </Button>
        </div>

        {/* Comments */}
        {addComment && (
          <div className="flex flex-col gap-5 border-t pt-5">
            {post.comments.map((comment) => (
              <div key={comment.id} className="flex flex-col gap-3">
                <Link
                  to={`/profile/${getUsernameFromEmail(comment.author.email)}`}
                  className="flex items-center gap-3"
                >
                  <UserAvatar image={comment.author.image} />

                  <div className="flex items-center gap-3">
                    <h3 className="font-medium">{comment.author.name}</h3>

                    <span className="text-sm text-muted-foreground">
                      @{getUsernameFromEmail(comment.author.email)}
                    </span>

                    <span className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(comment.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </Link>

                <p className="text-sm">{comment.content}</p>
              </div>
            ))}

            {/* Add Comment */}
            <div className="flex items-start gap-3 border-t pt-5">
              <img
                src="/user_profile.svg"
                alt="Avatar"
                className="size-8 rounded-full object-cover"
              />

              <textarea
                placeholder="Write a comment..."
                className="min-h-[65px] flex-1 resize-none rounded-lg border p-3 text-sm outline-none focus:border-gray-400"
              />
            </div>

            <div className="flex justify-end">
              <Button className="cursor-pointer bg-black text-white hover:bg-black/90">
                <Send />
                Comment
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PostCard;
