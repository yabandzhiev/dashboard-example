import { UserPostsInterface } from "../context/UserInitialStatesAndInterfaces";

export const loginService = async (email: string, password: string) => {
  const request = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${password}`
  );

  const userPosts: UserPostsInterface[] = await request.json();

  if (userPosts.length < 1) {
    return false;
  } else if (email.length < 3) {
    return false;
  } else {
    return userPosts;
  }
};
