import CardPost from "@/components/CardPost";
import { Post } from "@/interfaces/post.interface";
import { getLocalStorage, isInLocalStorage } from "@/utils";
import { useEffect, useState } from "react";

interface QueryParams {
  query: {
    id: number;
  };
}

interface Props {
  data: Post;
  error: boolean;
  image: string;
}

export default function PostDetail({ data, error, image }: Props) {
  return (
    <main className="flex items-center justify-center h-screen w-screen bg-gray-300">
      {!error && <CardPost image={image} data={data} />}
      {error && <h2>Esta pagina utiliza getServerSideProps, por este motivo solo muestra datos del API https://jsonplaceholder.typicode.com </h2>}
    </main>
  );
}

function getRandomId(max: number) {
  return Math.floor(Math.random() * max) + 1;
}

async function getImage() {
  try {
    const imageUrl = `https://jsonplaceholder.typicode.com/albums/1/photos`;
    const responsePhoto = await fetch(imageUrl);
    const albums = await responsePhoto.json();
    const { thumbnailUrl } = await albums[getRandomId(albums.length - 1)];

    return thumbnailUrl;
  } catch (error) {
    console.error(error);
  }
}

export async function getServerSideProps({ query }: QueryParams) {
  try {
    const url = `https://jsonplaceholder.typicode.com/posts/${query.id}`;
    const response = await fetch(url);
    const data = await response.json();

    if (Object.keys(data).length === 0) throw new Error("No hay información");

    return {
      props: {
        data,
        error: false,
        image: await getImage(),
      },
    };
  } catch (error) {
    return {
      props: {
        data: { id: query.id, title: "", userId: 1 },
        error: true,
        image: await getImage(),
      },
    };
  }
}
