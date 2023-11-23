import { Post } from "@/interfaces/post.interface";
import { createContext } from "react";

interface FormValues {
  [key: string]: string;
}

interface ListContext {
  list: Post[];
  loading: boolean;
  deletePost: (id: number) => void;
  editPost: (id: number, change: FormValues) => void;
  insertPost: (change: FormValues) => void;
}

const ListContext = createContext<ListContext | undefined>(undefined);

export default ListContext;
