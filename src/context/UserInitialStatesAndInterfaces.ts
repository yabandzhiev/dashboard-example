import { ReactNode } from "react";

export interface UserPostsInterface {
  userId: string;
  id: string;
  title: string;
  body: string;
}

export interface UserContextInterface {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoggedIn: boolean;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  showSuccess: string;
  setShowSuccess: React.Dispatch<React.SetStateAction<string>>;
  userPosts: UserPostsInterface[];
}

export interface ProviderProps {
  children: ReactNode;
}

export const initialPosts = [
  {
    userId: "",
    id: "",
    title: "",
    body: "",
  },
];

export const initialPost = {
  post: {
    userId: "",
    id: "",
    title: "",
    body: "",
  },
  comments: [{ id: "", name: "", email: "", body: "" }],
};

export interface initialPostInterface {
  post: {
    userId: string;
    id: string;
    title: string;
    body: string;
  };
  comments: { id: string; name: string; email: string; body: string }[];
}

export interface locationInterface {
  state: {
    id: string;
    title: string;
    body: string;
  };
}
