import PostCard from "./PostCard";
import CreatePostForm from "./CreatePostForm";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import type { Post } from "@/types/post.type";
import type { Response } from "@/types/response.type";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const PostSkeleton = () => {
  return (
    <Card>
      <CardContent className="flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <Skeleton className="size-8 rounded-full" />

          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        <div className="flex gap-6">
          <Skeleton className="h-8 w-12" />
          <Skeleton className="h-8 w-12" />
        </div>
      </CardContent>
    </Card>
  );
};

const PostList = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await axiosInstance.get<Response<Post[]>>("/api/posts");

      return response.data;
    },
  });


  if (isError) {
    return <div>Something went wrong.</div>;
  }

  return (
    <div className="col-span-12 lg:col-span-8 space-y-6">
      <CreatePostForm />

{isPending ? (
  <>
    <PostSkeleton />
    <PostSkeleton />
    <PostSkeleton />
  </>
) : (
  data.data.map((post) => (
    <PostCard key={post.id} post={post} />
  ))
)}
    </div>
  );
};

export default PostList;
