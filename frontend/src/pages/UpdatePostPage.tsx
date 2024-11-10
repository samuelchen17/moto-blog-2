import {
  Alert,
  Button,
  FileInput,
  Label,
  Select,
  TextInput,
} from "flowbite-react";
import Tiptap from "../components/editor/Tiptap";
import { useRef, useState, useEffect } from "react";
import { Editor } from "@tiptap/react";
import { IPostResponse, IPublishPostPayload } from "@shared/types/post";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import DOMPurify from "dompurify";
import { postCategory } from "../config/postCategory.config";
import { useNavigate, useParams } from "react-router-dom";

// need to prevent injection attacks
// implement dom purify

// type PostResponse = ISuccessRes | IErrorRes;
const clearForm: IPublishPostPayload = { title: "", content: "" };

const UpdatePostPage = () => {
  const editorRef = useRef<Editor | null>(null);
  const [formData, setFormData] = useState<IPublishPostPayload>(clearForm);
  const [publishErrMsg, setPublishErrMsg] = useState<string | null>(null);
  const { currentUser } = useAppSelector(
    (state: RootState) => state.persisted.user
  );
  const navigate = useNavigate();
  const { postId } = useParams();

  if (!currentUser) {
    throw new Error("Auth missing");
  }

  // fetch post data
  useEffect(() => {
    const fetchPostById = async () => {
      try {
        setPublishErrMsg(null);
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data: IPostResponse = await res.json();
        if (res.ok) {
          setFormData(data.posts[0]);
        }
      } catch (err) {
        console.error("Error:", err);
        setPublishErrMsg("Failed to find post, internal error");
      }
    };

    if (currentUser?.user.admin) {
      fetchPostById();
    }
  }, [postId]);

  const handlePostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handlePostPublish = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // get html content from tiptap and prevent xss
      const rawContent = editorRef.current?.getHTML() || "";
      const sanitizedContent = DOMPurify.sanitize(rawContent);

      const updatedFormData = { ...formData, content: sanitizedContent };
      setFormData(updatedFormData);

      const payload: IPublishPostPayload = { ...formData };

      const res: Response = await fetch(
        `/api/post/create/${currentUser.user.id}`,
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setPublishErrMsg(data.message);
        throw new Error(data.message);
      }

      setPublishErrMsg(null);
      // redirect needs to be fixed implement
      // navigate(`/blogs/${data.slug}`);
      navigate(`/blogs`);
    } catch (err) {
      console.error("Error:", err);

      if (err instanceof Error) {
        setPublishErrMsg(err.message);
      } else {
        setPublishErrMsg("An unknown error occurred");
      }
    }
  };

  return (
    <div>
      <h1>Update post</h1>
      <hr />
      <form className="flex flex-col gap-4" onSubmit={handlePostPublish}>
        <TextInput
          type="text"
          required
          id="title"
          placeholder="Title"
          onChange={handlePostChange}
          value={formData.title}
        />
        <Select
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setFormData({ ...formData, category: e.target.value });
          }}
          value={formData.category}
        >
          {postCategory.map((item) => (
            <option key={item.name} value={item.value}>
              {item.name}
            </option>
          ))}
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
        <Tiptap
          editorRef={editorRef}
          setFormData={setFormData}
          formContent={formData.content}
        />

        <Button type="submit">Publish</Button>

        {publishErrMsg && <Alert color="failure">{publishErrMsg}</Alert>}
      </form>
    </div>
  );
};

export default UpdatePostPage;
