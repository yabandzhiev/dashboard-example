import { UserPostsInterface } from "../context/UserInterfaces";

interface commentsInterface {
  postId: string;
  id: string;
  name: string;
  email: string;
  body: string;
}

export const getPostAndComments = async (id: string) => {
  const requestPost = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  const requestComments = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}/comments`
  );

  const userPost: UserPostsInterface = await requestPost.json();
  const postComments: commentsInterface[] = await requestComments.json();

  const postAndComments = {
    post: userPost,
    comments: postComments,
  };
  if (Object.keys(userPost).length === 0) {
    return false;
  } else {
    return postAndComments;
  }
};

export const editPost = async (id: string, title: string, body: string) => {
  const requestEdit = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    {
      method: "PUT",
      body: JSON.stringify({
        id,
        title,
        body,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );

  return requestEdit;
};
