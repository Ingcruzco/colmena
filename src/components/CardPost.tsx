import { CardProps, Post } from "@/interfaces/post.interface";
import { Button, Card } from "flowbite-react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function CardPost({ image, data }: CardProps) {
  const router = useRouter();

  const onReturn = () => {
    router.push("/listado");
  };
  return (
    <Card className=" lg:w-1/3 lg:h-2/3 md:w-1/3 sm:w-1/2 w-80 p-4 rounded-md p-4">
      <Image
        className="mx-auto custom-image"
        src={image}
        alt="post_datail_image"
        width={150}
        height={150}
        placeholder="empty"
        priority
      />
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {data.title}
      </h5>
      <p className="text-justify font-normal text-gray-700 dark:text-gray-400">
        {data.body}
      </p>
      <Button
        onClick={onReturn}
        className="mx-auto lg:w-1/2 mt-5"
        gradientDuoTone="cyanToBlue"
      >
        Regresar
      </Button>
    </Card>
  );
}
