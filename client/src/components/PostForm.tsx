import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import type { PostFormData } from "@/types/post";

const postSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }).max(100),
  body: z.string().min(10, { message: "Content must be at least 10 characters" }),
});

interface PostFormProps {
  onSubmit: (data: PostFormData) => void;
  onCancel: () => void;
  initialData?: PostFormData;
  isEditMode?: boolean;
}

export default function PostForm({ onSubmit, onCancel, initialData, isEditMode = false }: PostFormProps) {
  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: initialData?.title || "",
      body: initialData?.body || "",
    },
  });

  // Update form values if initialData changes (e.g., when switching from create to edit)
  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  const handleSubmit = (values: z.infer<typeof postSchema>) => {
    onSubmit(values);
  };

  return (
    <Card className="bg-white shadow-sm rounded-lg overflow-hidden">
      <CardContent className="px-6 py-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter post title" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Write your post content here..." 
                      rows={8}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button type="submit">
                {isEditMode ? "Update Post" : "Create Post"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
