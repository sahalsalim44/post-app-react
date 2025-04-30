import type { Post } from "../types/post";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

// Fetch all posts
export async function getPosts(): Promise<Post[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Limit to first 20 posts and map to our Post type
    return data.slice(0, 20).map((post: any) => ({
      ...post,
      isNewlyAdded: false,
    }));
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}

// Fetch a single post by ID
export async function getPostById(id: number): Promise<Post> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    return {
      ...data,
      isNewlyAdded: false,
    };
  } catch (error) {
    console.error(`Error fetching post ${id}:`, error);
    throw error;
  }
}

// Note: In a real application, these functions would actually send POST/PUT
// requests to a backend server. For this example, we're just simulating the API calls
// since JSONPlaceholder doesn't actually persist changes.

export async function createPost(postData: Omit<Post, "id">): Promise<Post> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create post: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    return {
      ...data,
      isNewlyAdded: true,
    };
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}

export async function updatePost(post: Post): Promise<Post> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update post: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    return {
      ...data,
      isNewlyAdded: true,
    };
  } catch (error) {
    console.error(`Error updating post ${post.id}:`, error);
    throw error;
  }
}
