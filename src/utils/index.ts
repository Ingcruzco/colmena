import { Post } from "@/interfaces/post.interface";

const MAX = 10000000;

export const generateRandomNumber = () => {
  return Math.floor(Math.random() * MAX) + 101;
};

export const isInLocalStorage = (id: number) => {
  let postInserted: Post[] =
    localStorage.getItem("posts") !== null
      ? JSON.parse(localStorage.getItem("posts")!)
      : [];
  return postInserted.some((item) => item.id === id);
};

export const getLocalStorage = () => {
  return localStorage.getItem("posts") !== null
    ? JSON.parse(localStorage.getItem("posts")!)
    : [];
};
