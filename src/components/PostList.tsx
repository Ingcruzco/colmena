import { useRouter } from "next/router";
import { Post } from "../interfaces/post.interface";
import { useList } from "@/contexts/ListProvider";
import { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import useForm from "@/hooks/useForm";
import { usePage } from "@/contexts/PageProvider";
import ModalList from "./ModalList";
import { getLocalStorage, isInLocalStorage } from "@/utils";

interface Props {
  list: Post[];
}

export default function PostList({ list }: Props) {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [initialPost, setInitialPost] = useState<Post[]>([]);
  const { currentPage, updatePage } = usePage();
  const [idPost, setIdPost] = useState(-1);
  const [filterPost, setFilterPost] = useState("");
  const [actionType, setActionType] = useState("");
  const { deletePost } = useList();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data =
        localStorage.getItem("posts") !== null
          ? JSON.parse(localStorage.getItem("posts")!)
          : [];
      setInitialPost(data);
    } else {
      setInitialPost([]);
    }
  }, []);

  const { values, handleChange, setInputValues } = useForm({
    title: "",
    body: "",
  });

  const handlePostDetail = (id: number) => {
    router.push(`/posts/${id}`);
  };

  const updatePost = (data: Post) => {
    setOpenModal(true);
    setIdPost(data.id);
    setActionType("edit");
    setInputValues({
      title: data.title,
      body: data.body,
    });
  };

  const handleOnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterPost(e.target.value);
  };

  const handleLoadMoreData = () => {
    updatePage(currentPage + 1);
  };

  const insertPost = () => {
    setOpenModal(true);
    setActionType("insert");
    setInputValues({
      title: "",
      body: "",
    });
  };

  const deleteFromLocalStorage = (id: number) => {
    deletePost(id);
    if (isInLocalStorage(id)) {
      let postInserted: Post[] = getLocalStorage();
      let localStorageFiltered = postInserted.filter((post) => post.id !== id);
      localStorage.setItem("posts", JSON.stringify(localStorageFiltered));
      setInitialPost(localStorageFiltered);
    }
  };

  const postFiltered =
    filterPost !== ""
      ? initialPost
          .concat([...list])
          .filter((post) => post.body.includes(filterPost))
      : initialPost.concat([...list]);

  return (
    <section>
      <div className="flex justify-between items-center ml-5 pb-4 bg-white dark:bg-gray-900">
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative mt-1">
          <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            onChange={handleOnInputChange}
            value={filterPost}
            type="text"
            id="table-search"
            className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-50 sm:w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Filtrar por descripcion"
          />
        </div>
        <Button
          onClick={insertPost}
          className="mr-5 mt-5"
          gradientDuoTone="redToYellow"
        >
          Insertar
        </Button>
      </div>
      <div className="flex flex-col items-center">
        {postFiltered.length > 0 && (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 hidden md:table-cell">
                  Ver Original
                </th>
                <th scope="col" className="px-6 py-3 sm:w-1/3">
                  Titulo
                </th>
                <th scope="col" className="px-6 py-3">
                  Descripcion
                </th>
                <th scope="col" className="px-6 py-3 hidden md:table-cell">
                  Accion
                </th>
              </tr>
            </thead>
            <tbody>
              {postFiltered.map((item) => {
                return (
                  <tr
                    key={item.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="w-4 p-4 hidden md:table-cell">
                      <svg
                        onClick={() => handlePostDetail(item.id)}
                        className="cursor-pointer w-6 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 14"
                      >
                        <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                      </svg>
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 sm:w-1/3 font-medium text-gray-900 dark:text-white"
                    >
                      {item.title}
                    </th>
                    <td className="px-6 py-4">{item.body}</td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <div className="flex flex-row justify-between">
                        <svg
                          name="edit"
                          className=" cursor-pointer w-[16px] h-[16px] text-gray-800 dark:text-white"
                          onClick={() => updatePost(item)}
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 18"
                        >
                          <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" />
                          <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z" />
                        </svg>
                        <svg
                          name="delete"
                          onClick={() => deleteFromLocalStorage(item.id)}
                          className="cursor-pointer w-[16px] h-[16px] text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 20"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"
                          />
                        </svg>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {postFiltered.length > 0 && currentPage <= 10 && (
          <button
            type="button"
            onClick={handleLoadMoreData}
            className="text-white sm:w-2/3 md:w-1/3 lg:w-1/4  mt-5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Cargar mas resultados
          </button>
        )}
      </div>
      {!postFiltered.length && (
        <h2 className="w-full mx-auto text-center font-bold">
          No se ha encontrado información
        </h2>
      )}
      <ModalList
        idPost={idPost}
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleChange={handleChange}
        values={values}
        actionType={actionType}
        setInitialPost={setInitialPost}
      />
    </section>
  );
}
