import { getUsernameFromEmail } from "@/lib/utils";
import type { Post } from "@/types/post.type";
import { formatDistanceToNow } from "date-fns";
import { Heart, MessageCircle, Send, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

type PostCardProps = {
  post: Post;
};

const PostCard = ({ post }: PostCardProps) => {
  const [addComment, setAddComment] = useState(false);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(false);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const queryClient = useQueryClient();

  const commentMutation = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post(
        `/api/posts/${post.id}/comment`,
        {
          content: comment,
        },
      );

      return response.data;
    },

    onSuccess: async () => {
      setComment("");
      setCommentError(false);

      await queryClient.invalidateQueries({
        queryKey: ["posts"],
      });

      setIsCommentLoading(false);
    },
  });

  const handleComment = () => {
    setIsCommentLoading(true);

    if (comment.trim().length < 5) {
      setCommentError(true);

      setTimeout(() => {
        setIsCommentLoading(false);
      }, 500);

      return;
    }

    setCommentError(false);
    commentMutation.mutate();
  };

  return (
    <Card className="shadow-md shadow-muted">
      <CardContent className="flex flex-col gap-5">
        {/* Post Header */}
        <div className="flex items-center gap-3">
          <img
            src="/user_profile.svg"
            alt="Avatar"
            className="size-8 rounded-full object-cover"
          />

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
        </div>

        {/* Post */}
        <p>{post.content}</p>

        {/* Actions */}
        <div className="flex gap-6 text-muted-foreground">
          <Button variant="ghost" className="cursor-pointer">
            <Heart />
            {post._count.likes}
          </Button>

          <Button
            variant="ghost"
            className="cursor-pointer"
            onClick={() => setAddComment((prev) => !prev)}
          >
            <MessageCircle />
            {post._count.comments}
          </Button>
        </div>

        {/* Comments */}
        {addComment && (
          <div className="border-t pt-5 flex flex-col gap-5">
            {post.comments.map((comment) => (
              <div key={comment.id} className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={comment.author.image || "/user_profile.svg"}
                    alt="Avatar"
                    className="size-8 rounded-full object-cover"
                  />

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
                </div>

                <p className="text-sm">{comment.content}</p>
              </div>
            ))}

            {/* Add Comment */}
            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-3">
                <img
                  src="/user_profile.svg"
                  alt="Avatar"
                  className="size-8 rounded-full object-cover"
                />

                <textarea
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                    setCommentError(false);
                  }}
                  placeholder="Write a comment..."
                  className="min-h-[65px] flex-1 resize-none rounded-lg border p-3 text-sm outline-none focus:border-gray-400"
                />
              </div>

              {commentError && (
                <p className="text-xs text-red-500 px-11 py-2">
                  Content is too short, minimum 5 characters
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <Button onClick={handleComment} disabled={isCommentLoading}>
                {isCommentLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Send />
                )}

                {isCommentLoading ? "Comment" : "Comment"}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PostCard;
