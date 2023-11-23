import { Inter } from "next/font/google";
import Head from "next/head";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex h-screen items-center justify-center ${inter.className}`}
    >
      <Head>
        <title>Laboratorio Colmena</title>
      </Head>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          ¡Bienvenid@ a mi prueba técnica!
        </h1>
        <p className="text-gray-600 mb-5">Espero que disfrutes tu visita.</p>
        <Link
          className="mt-20 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          href="/listado"
        >
          ¡Explorar Ahora!
        </Link>
        <p className="mt-10 text-gray-600 mb-5">
          Esta aplicación presenta los datos del API
          https://jsonplaceholder.typicode.com/posts <br /> puedes ver el valor
          original de los post, además de insertar, editar y eliminar las
          publicaciones
        </p>
      </div>
    </main>
  );
}
