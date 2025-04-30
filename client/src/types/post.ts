export interface Post {
  id: number;
  title: string;
  body: string;
  userId?: number;
  isNewlyAdded?: boolean;
}

export interface PostFormData {
  title: string;
  body: string;
}
