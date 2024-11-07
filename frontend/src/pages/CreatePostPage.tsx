import { Button, FileInput, Label, Select, TextInput } from "flowbite-react";
import Tiptap from "../components/editor/Tiptap";
import { useRef, useState } from "react";
import { Editor } from "@tiptap/react";
import { IPublishPostPayload } from "@shared/types/post";
import { IErrorRes } from "@shared/types/res";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import DOMPurify from "dompurify";

// need to prevent injection attacks
// implement dom purify

// type PostResponse = ISuccessRes | IErrorRes;
const clearForm: IPublishPostPayload = { title: "", content: "" };

const CreatePostPage = () => {
  const editorRef = useRef<Editor | null>(null);
  const [formData, setFormData] = useState<IPublishPostPayload>(clearForm);
  const { currentUser } = useAppSelector(
    (state: RootState) => state.persisted.user
  );

  if (!currentUser) {
    throw new Error("Auth missing");
  }

  const handlePostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handlePostPublish = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // get html content from tiptap
    const rawContent = editorRef.current?.getHTML() || "";
    const sanitizedContent = DOMPurify.sanitize(rawContent);

    // more specific rules for sanitization
    // const clean = DOMPurify.sanitize(dirty, {
    //     ALLOWED_TAGS: ['p', 'b', 'i', 'a', 'span'],
    //     ALLOWED_ATTR: ['href', 'title', 'src', 'alt']
    //   });

    const updatedFormData = { ...formData, content: sanitizedContent };
    setFormData(updatedFormData);

    const payload: IPublishPostPayload = { ...formData };

    console.log(payload);

    const res: Response = await fetch(
      `/api/post/create/${currentUser.user.id}`,
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await res.json();
    console.log(data);

    try {
    } catch (err) {
      console.error("Error:", err);
    }
  };

  console.log(formData);
  return (
    <div>
      <h1>Create a post</h1>
      <hr />
      <form className="flex flex-col gap-4" onSubmit={handlePostPublish}>
        <TextInput
          type="text"
          required
          id="title"
          placeholder="Title"
          onChange={handlePostChange}
        />
        <Select>
          <option value="placeholder" disabled>
            Category
          </option>
          <option value="placeholder" id="category">
            create config .map implement
          </option>
        </Select>
        {/* file upload */}
        <div className="flex w-full items-center justify-center">
          <Label
            htmlFor="dropzone-file"
            className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <svg
                className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <FileInput id="dropzone-file" className="hidden" accept="image/*" />
          </Label>
        </div>
        {/* Text editing */}
        <Tiptap editorRef={editorRef} setFormData={setFormData} />

        <Button type="submit">Publish</Button>
      </form>
    </div>
  );
};

export default CreatePostPage;
