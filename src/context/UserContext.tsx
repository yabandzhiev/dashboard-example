import { createContext, FC, useState } from "react";

import {
  UserPostsInterface,
  UserContextInterface,
  ProviderProps,
  initialPosts,
} from "./UserInitialStatesAndInterfaces";
import { EMAIL, POSTS } from "../common/constants";
import { loginService } from "../services/login";

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
      ? (localStorage.setItem(EMAIL, updateEmail),
        localStorage.setItem(POSTS, JSON.stringify(posts)))
      : (localStorage.removeItem(EMAIL), localStorage.removeItem(POSTS));
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
