import { createContext, FC, useState } from "react";
import { loginService } from "../services/login";

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
  const [error, setError] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState<string>("");

  const login = async (userEmail: string, password: string) => {
    const loginResult = await loginService(userEmail, password);
    if (Array.isArray(loginResult)) {
      updateStates(true, loginResult, userEmail);
      return true;
    } else {
      return false;
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
  };

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        userPosts,
        error,
        setError,
        showSuccess,
        setShowSuccess,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
