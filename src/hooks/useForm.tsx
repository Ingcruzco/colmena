import { Post } from "@/interfaces/post.interface";
import { useState, ChangeEvent } from "react";

interface FormValues {
  [key: string]: string;
}

const useForm = (initialValues: FormValues) => {
  const [values, setValues] = useState<FormValues>(initialValues);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const setInputValues = (data: FormValues) => {
    setValues({ title: data.title, body: data.body });
  };

  //   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     onSubmit(values);
  //   };

  return {
    values,
    handleChange,
    setInputValues
  };
};

export default useForm;
