import React, { useState, useContext, createContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts, getPostById } from "../lib/api";
import { queryClient } from "../lib/queryClient";
import type { Post, PostFormData } from "../types/post";

interface PostsContextType {
  posts: Post[];
  isLoading: boolean;
  error: Error | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  addPost: (postData: PostFormData) => void;
  updatePost: (post: Post) => void;
  fetchPostById: (id: number) => Promise<Post>;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export function PostsProvider({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [localPosts, setLocalPosts] = useState<Post[]>([]);

  // Fetch posts from the API
  const { data: apiPosts, isLoading, error } = useQuery({
    queryKey: ["/api/posts"],
    queryFn: getPosts,
  });

  // Combine API posts with local posts
  const posts = apiPosts
    ? [...localPosts, ...apiPosts].sort((a, b) => b.id - a.id)
    : [];

  // Function to add a new post
  const addPost = (postData: PostFormData) => {
    const newPost: Post = {
      id: Date.now(), // Use timestamp as unique ID
      title: postData.title,
      body: postData.body,
      isNewlyAdded: true,
    };
    
    setLocalPosts((prev) => [newPost, ...prev]);
    
    // Update the cache
    queryClient.setQueryData(["/api/posts"], (oldData: Post[] | undefined) => {
      if (!oldData) return [newPost];
      return [newPost, ...oldData];
    });
  };

  // Function to update an existing post
  const updatePost = (updatedPost: Post) => {
    setLocalPosts((prev) =>
      prev.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
    
    // Update the cache
    queryClient.setQueryData(["/api/posts"], (oldData: Post[] | undefined) => {
      if (!oldData) return [updatedPost];
      return oldData.map((post) => (post.id === updatedPost.id ? updatedPost : post));
    });
  };

  // Function to fetch a single post by ID
  const fetchPostById = async (id: number): Promise<Post> => {
    // First check if it's a local post
    const localPost = localPosts.find(p => p.id === id);
    if (localPost) return localPost;
    
    // If not, check if it's already in the cache
    const cachedPosts = queryClient.getQueryData<Post[]>(["/api/posts"]);
    const cachedPost = cachedPosts?.find(p => p.id === id);
    if (cachedPost) return cachedPost;
    
    // If not in cache, fetch from API
    return getPostById(id);
  };

  const value = {
    posts,
    isLoading,
    error: error as Error | null,
    searchQuery,
    setSearchQuery,
    addPost,
    updatePost,
    fetchPostById,
  };

  return React.createElement(
    PostsContext.Provider,
    { value },
    children
  );
}

export function usePosts() {
  const context = useContext(PostsContext);
  if (context === undefined) {
    throw new Error("usePosts must be used within a PostsProvider");
  }
  return context;
}