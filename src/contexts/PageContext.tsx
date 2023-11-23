import { createContext } from "react";

interface PageContextProps {
  currentPage: number;
  updatePage: (page: number) => void;
}

const PageContext = createContext<PageContextProps | undefined>(undefined);

export default PageContext;
