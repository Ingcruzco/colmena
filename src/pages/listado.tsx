import PostList from "@/components/PostList";
import { useList } from "@/contexts/ListProvider";
import { Spinner } from "flowbite-react";

export default function List() {
  const { list, loading } = useList();

  return (
    <main>
      {<PostList list={list} />}
      {loading && (
        <div className="flex justify-center w-full">
          <Spinner className="mx-auto" aria-label="Cargando" />
        </div>
      )}
    </main>
  );
}
