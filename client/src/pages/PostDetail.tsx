import { useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { usePosts } from "@/hooks/usePosts";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function PostDetail() {
  const [, navigate] = useLocation();
  const [match, params] = useRoute("/post/:id");
  const { posts, isLoading, fetchPostById } = usePosts();
  const { toast } = useToast();
  
  const postId = match && params ? parseInt(params.id, 10) : null;
  const post = postId ? posts?.find(p => p.id === postId) : null;
  
  useEffect(() => {
    if (postId && !post && !isLoading) {
      fetchPostById(postId).catch(() => {
        toast({
          title: "Error",
          description: "Failed to load the post details. Please try again.",
          variant: "destructive"
        });
        navigate("/");
      });
    }
  }, [postId, post, isLoading, fetchPostById, toast, navigate]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Button
          variant="link"
          className="p-0 text-primary-600 hover:text-primary-500"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to posts
        </Button>
      </div>

      {isLoading || !post ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-8">
            <Skeleton className="h-12 w-3/4 mb-6" />
            <Skeleton className="h-4 w-full mb-4" />
            <Skeleton className="h-4 w-full mb-4" />
            <Skeleton className="h-4 w-5/6 mb-4" />
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-8">
            <h1 className="text-3xl font-bold text-secondary-900 mb-6">{post.title}</h1>
            <div className="prose max-w-none text-secondary-700">
              {post.body.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
