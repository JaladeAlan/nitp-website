import { useState } from "react";

export default function useForm(initialValues = {}, onSubmit) {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(values);
  };

  const resetForm = () => setValues(initialValues);

  return { values, handleChange, handleSubmit, resetForm };
}
