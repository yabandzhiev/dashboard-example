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
  email: string;
  userPosts: UserPostsInterface[];
}

export interface ProviderProps {
  children: ReactNode;
}
