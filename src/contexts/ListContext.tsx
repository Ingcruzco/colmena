import { ListContextProps } from "@/interfaces/post.interface";
import { createContext } from "react";

const ListContext = createContext<ListContextProps | undefined>(undefined);

export default ListContext;
