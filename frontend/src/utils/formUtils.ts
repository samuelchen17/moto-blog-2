export const handleFormChange =
  (
    formData: Record<string, any>,
    setFormData: React.Dispatch<React.SetStateAction<Record<string, any>>>
  ) =>
  (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
