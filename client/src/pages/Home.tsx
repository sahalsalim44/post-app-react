import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { usePosts } from "@/hooks/usePosts";
import PostCard from "@/components/PostCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import type { Post } from "@/types/post";

export default function Home() {
  const [, navigate] = useLocation();
  const { posts, isLoading } = usePosts();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (posts) {
      if (searchQuery) {
        setFilteredPosts(
          posts.filter((post) =>
            post.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
      } else {
        setFilteredPosts(posts);
      }
    }
  }, [posts, searchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="pb-5 border-b border-secondary-200 mb-8">
        <h1 className="text-3xl font-bold leading-tight text-secondary-900">Posts</h1>
        <p className="mt-2 max-w-4xl text-sm text-secondary-500">
          Browse through our collection of posts or add your own.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-6">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="rounded-lg bg-white shadow-sm border border-secondary-100 overflow-hidden"
              >
                <div className="p-6">
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <Skeleton className="h-3 w-full mb-2" />
                  <Skeleton className="h-3 w-5/6" />
                </div>
              </div>
            ))}
        </div>
      ) : (
        <>
          {filteredPosts.length === 0 ? (
            <div className="col-span-full py-12 flex flex-col items-center justify-center text-center">
              <div className="rounded-full bg-primary-100 p-3 mb-4">
                <Search className="text-primary-600 h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-secondary-900">No posts found</h3>
              <p className="mt-1 text-secondary-500 max-w-md">
                We couldn't find any posts matching your search. Try adjusting your search terms or add a new post.
              </p>
              <Button
                className="mt-6"
                onClick={() => navigate("/new")}
              >
                Add New Post
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
