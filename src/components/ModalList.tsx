import { useList } from "@/contexts/ListProvider";
import { Post } from "@/interfaces/post.interface";
import { getLocalStorage, isInLocalStorage } from "@/utils";
import { Button, Label, Modal, TextInput } from "flowbite-react";

export default function ModalList({
  idPost,
  openModal,
  setOpenModal,
  handleChange,
  values,
  actionType,
  setInitialPost,
}: any) {
  const { editPost, insertPost } = useList();

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpenModal(false);
    if (actionType === "edit") {
      editPost(idPost, values);
      if (isInLocalStorage(idPost)) {
        let postInserted: Post[] = getLocalStorage();
        let localStorageUpdated = postInserted.map((post) => {
          if (post.id === idPost) {
            return { ...post, title: values.title, body: values.body };
          }
          return post;
        });
        localStorage.setItem("posts", JSON.stringify(localStorageUpdated));
        setInitialPost(localStorageUpdated);
      }
    } else {
      insertPost(values);
    }
  };

  return (
    <Modal show={openModal} size="md" onClose={onCloseModal} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            {actionType === "edit" ? "Edite" : "Inserte"} la informacion de la
            publicacion
          </h3>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="title" value="Titulo" />
            </div>
            <TextInput
              id="title"
              name="title"
              placeholder="Modifique el titulo"
              value={values.title}
              onChange={(event) => handleChange(event)}
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="body" value="Descripcion" />
            </div>
            <TextInput
              placeholder="Modifique la descripcion"
              id="body"
              name="body"
              value={values.body}
              onChange={(event) => handleChange(event)}
              type="text"
              required
            />
          </div>
          <div className="w-full">
            <Button type="submit" onClick={handleSubmit}>
              Guardar
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
