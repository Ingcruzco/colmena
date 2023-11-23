import PostList from "@/components/PostList";
import { useList } from "@/contexts/ListProvider";
import { Spinner } from "flowbite-react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function List() {
  const router = useRouter();
  const { list, loading } = useList();

  return (
    <main>
      <Head>
        <link rel="icon" href="/logo_colmena.png" />
        <title>Lista de Posts</title>
      </Head>
      <svg
        onClick={() => router.push("/")}
        className="cursor-pointer ml-5 mt-3 w-6 h-6 text-gray-800 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 10"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 5H1m0 0 4 4M1 5l4-4"
        />
      </svg>
      {<PostList list={list} />}
      {loading && (
        <div className="flex justify-center w-full">
          <Spinner className="mx-auto" aria-label="Cargando" />
        </div>
      )}
    </main>
  );
}
