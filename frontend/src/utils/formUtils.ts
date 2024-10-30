export const handleFormChange =
  <T extends Record<string, any>>(
    formData: T,
    setFormData: React.Dispatch<React.SetStateAction<T>>
  ) =>
  (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
