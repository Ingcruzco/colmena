import { PageContextProps } from "@/interfaces/post.interface";
import { createContext } from "react";

const PageContext = createContext<PageContextProps | undefined>(undefined);

export default PageContext;
