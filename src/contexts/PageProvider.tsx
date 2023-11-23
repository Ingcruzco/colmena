import { useState, useContext, ReactNode } from "react";
import PageContext from "./PageContext";
import { Post } from "@/interfaces/post.interface";

interface PageProviderProps {
  children: ReactNode;
}

const PageProvider = ({ children }: PageProviderProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const updatePage = (page: number) => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <PageContext.Provider value={{ currentPage, updatePage }}>
      {children}
    </PageContext.Provider>
  );
};

const usePage = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("useList debe ser utilizado dentro de un PageProvider");
  }
  return context;
};

export { PageProvider, usePage };
