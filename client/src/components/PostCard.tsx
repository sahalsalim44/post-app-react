import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Edit } from "lucide-react";
import type { Post } from "@/types/post";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const [, navigate] = useLocation();

  const handleViewPost = () => {
    navigate(`/post/${post.id}`);
  };

  const handleEditPost = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/edit/${post.id}`);
  };

  return (
    <Card className="bg-white rounded-lg shadow-sm border border-secondary-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold text-secondary-900 mb-2 line-clamp-2">
          {post.title}
        </h2>
        <p className="text-secondary-600 mb-4 line-clamp-3">
          {post.body}
        </p>
        <div className="flex justify-between items-center">
          <Button 
            variant="link" 
            className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500 p-0"
            onClick={handleViewPost}
          >
            Read more
            <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
          
          {post.isNewlyAdded && (
            <Button
              variant="outline"
              size="sm"
              className="inline-flex items-center text-sm font-medium"
              onClick={handleEditPost}
            >
              <Edit className="mr-1 h-3 w-3" />
              Edit
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
