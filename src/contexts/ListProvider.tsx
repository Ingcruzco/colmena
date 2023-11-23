import { useState, useContext, ReactNode, useEffect } from "react";
import ListContext from "./ListContext";
import { Post } from "@/interfaces/post.interface";
import { usePage } from "./PageProvider";
import { generateRandomNumber, getLocalStorage } from "@/utils";
import Swal from "sweetalert2";

interface ListProviderProps {
  children: ReactNode;
}

interface FormValues {
  [key: string]: string;
}

const URL_BASE = "https://jsonplaceholder.typicode.com/posts";

const ListProvider = ({ children }: ListProviderProps) => {
  const { currentPage } = usePage();
  const [list, setList] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${URL_BASE}?_page=${currentPage}`)
      .then(async (res: Response) => {
        if (!res.ok) throw new Error("Error obteniendo la informacion");
        return await res.json();
      })
      .then((data) => {
        if (data.length != 0) {
          setList((prevList) => prevList.concat(data));
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, [currentPage]);

  const deletePost = (id: number) => {
    fetch(`${URL_BASE}/${id}`, {
      method: "DELETE",
    })
      .then(async (res: Response) => {
        if (!res.ok) throw new Error("No se pudo eliminar la publicacion");
        return await res.json();
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "registro eliminado exitosamente",
        });
        setList((prevList) => prevList.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.log("no fue posible eliminar el post con id ", id);
      });
  };

  const editPost = (id: number, change: FormValues) => {
    fetch(`${URL_BASE}/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        title: change.title,
        body: change.body,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(async (res: Response) => {
        if (!res.ok) throw new Error("No se pudo Actualizar la publicacion");
        return await res.json();
      })
      .then((data) => {
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "registro actualizado exitosamente",
        });
        setList((prevList) =>
          prevList.map((item) => {
            if (item.id === id) {
              return data;
            }
            return item;
          })
        );
      })
      .catch((error) => {
        console.log("no fue posible Actualizar el post con id ", id);
      });
  };

  const insertPost = (change: FormValues) => {
    //no utilizo el endopoint por que me genera problema con el id
    const id = generateRandomNumber();
    const postToInsert = {
      title: change.title,
      body: change.body,
      id,
      userId: 1,
    };
    setList((prevList) => prevList.concat([postToInsert]));
    const postInserted: Post[] = getLocalStorage();
    const newValueToInsert = postInserted.concat([postToInsert]);
    localStorage.setItem("posts", JSON.stringify(newValueToInsert));
    Swal.fire({
      icon: "success",
      title: "Éxito",
      text: "registro insertado exitosamente",
    });
  };

  return (
    <ListContext.Provider
      value={{ list, loading, deletePost, editPost, insertPost }}
    >
      {children}
    </ListContext.Provider>
  );
};

const useList = () => {
  const context = useContext(ListContext);
  if (!context) {
    throw new Error("useList debe ser utilizado dentro de un ListProvider");
  }
  return context;
};

export { ListProvider, useList };
