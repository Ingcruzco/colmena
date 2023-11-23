import { ReactNode } from "react";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface CardProps {
  image: string;
  data: Post;
}

export interface FormValues {
  [key: string]: string;
}

export interface ListContextProps {
  list: Post[];
  loading: boolean;
  deletePost: (id: number) => void;
  editPost: (id: number, change: FormValues) => void;
  insertPost: (change: FormValues) => void;
}

export interface ListProviderProps {
  children: ReactNode;
}

export interface PageContextProps {
  currentPage: number;
  updatePage: (page: number) => void;
}

export interface QueryParams {
  query: {
    id: number;
  };
}

export interface Props {
  data: Post;
  error: boolean;
  image: string;
}
