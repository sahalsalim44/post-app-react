import { useEffect, useState } from "react";
import { useRoute, useLocation } from "wouter";
import { usePosts } from "@/hooks/usePosts";
import PostForm from "@/components/PostForm";
import type { Post, PostFormData } from "@/types/post";
import { useToast } from "@/hooks/use-toast";

export default function NewPost() {
  const [, navigate] = useLocation();
  const [matchEdit, params] = useRoute("/edit/:id");
  const { posts, addPost, updatePost } = usePosts();
  const { toast } = useToast();
  
  const [initialData, setInitialData] = useState<Post | null>(null);
  const isEditMode = matchEdit && params?.id;

  // Find the post to edit if in edit mode
  useEffect(() => {
    if (isEditMode && posts) {
      const postId = parseInt(params.id, 10);
      const postToEdit = posts.find(p => p.id === postId);
      
      if (postToEdit) {
        setInitialData(postToEdit);
      } else {
        toast({
          title: "Error",
          description: "Post not found. You can only edit posts you've added.",
          variant: "destructive"
        });
        navigate("/");
      }
    }
  }, [isEditMode, params, posts, navigate, toast]);

  const handleSubmit = (formData: PostFormData) => {
    if (isEditMode && initialData) {
      updatePost({
        ...initialData,
        ...formData
      });
      toast({
        title: "Success",
        description: "Post updated successfully",
      });
    } else {
      addPost(formData);
      toast({
        title: "Success",
        description: "New post added successfully",
      });
    }
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="pb-5 border-b border-secondary-200 mb-8">
        <h1 className="text-3xl font-bold leading-tight text-secondary-900">
          {isEditMode ? "Edit Post" : "Add New Post"}
        </h1>
        <p className="mt-2 max-w-4xl text-sm text-secondary-500">
          {isEditMode ? "Update your post." : "Create a new post to share with others."}
        </p>
      </div>

      <PostForm 
        initialData={initialData ? {
          title: initialData.title,
          body: initialData.body
        } : undefined}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isEditMode={!!isEditMode}
      />
    </div>
  );
}
