import { createContext, FC, useState } from "react";

import {
  UserPostsInterface,
  UserContextInterface,
  ProviderProps,
} from "./UserInterfaces";

const initialPosts = [
  {
    userId: "",
    id: "",
    title: "",
    body: "",
  },
];

export const UserContext = createContext({} as UserContextInterface);

export const UserProvider: FC<ProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userPosts, setUserPosts] =
    useState<UserPostsInterface[]>(initialPosts);
  const [email, setEmail] = useState<string>("");

  const login = async (userEmail: string, password: string) => {
    const request = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${password}`
    );

    const userPostsJson: UserPostsInterface[] = await request.json();

    if (userPostsJson.length < 1) {
      return false;
    } else if (userEmail.length < 3) {
      return false;
    } else {
      updateStates(true, userPostsJson, userEmail);
      return true;
    }
  };

  const logout = () => {
    updateStates(false, initialPosts, "");
  };

  const updateStates = (
    isLogin: boolean,
    posts: UserPostsInterface[],
    updateEmail: string
  ) => {
    isLogin
      ? (localStorage.setItem("email", updateEmail),
        localStorage.setItem("posts", JSON.stringify(posts)))
      : (localStorage.removeItem("email"), localStorage.removeItem("posts"));
    setIsLoggedIn(isLogin);
    setUserPosts(posts);
    setEmail(updateEmail);
  };

  return (
    <UserContext.Provider
      value={{ isLoggedIn, login, logout, userPosts, email }}
    >
      {children}
    </UserContext.Provider>
  );
};
