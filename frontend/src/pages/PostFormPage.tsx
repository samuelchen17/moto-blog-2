import { useEffect, useRef, useState } from "react";
import { Editor } from "@tiptap/react";
import { IPost, IPostResponse, IPublishPostPayload } from "src/types";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import DOMPurify from "dompurify";
import { postCategory } from "../config/postCategory.config";
import { useNavigate } from "react-router-dom";
import { storage } from "../config/firebase.config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import { _get, _patch, _post } from "@/api/axiosClient";

import { Alert, FileInput, Select, Spinner } from "flowbite-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const clearForm: IPublishPostPayload = { title: "", content: "" };

interface IPostFormPageProps {
  postId?: String;
}

// implement persist form upon failure to submit

const PostFormPage: React.FC<IPostFormPageProps> = ({ postId }) => {
  const editorRef = useRef<Editor | null>(null);
  const [formData, setFormData] = useState<IPublishPostPayload>(clearForm);
  const [publishErrMsg, setPublishErrMsg] = useState<string | null>(null);
  const [imageUploading, setImageUploading] = useState<boolean>(false);

  const { currentUser } = useAppSelector(
    (state: RootState) => state.persisted.user
  );
  const navigate = useNavigate();

  if (!currentUser) {
    throw new Error("Auth missing");
  }

  // fetch post data if there is a param
  useEffect(() => {
    const fetchPostById = async () => {
      if (postId) {
        try {
          setPublishErrMsg(null);
          const res = await _get<IPostResponse>(
            `/post/getposts?postId=${postId}`
          );
          const data = res.data;

          setFormData(data.posts[0]);
        } catch (err) {
          console.error("Error:", err);
          setPublishErrMsg("Failed to load post data, internal error");
        }
      }
    };

    if (postId && currentUser?.user.admin) {
      fetchPostById();
    }
  }, [postId, currentUser?.user.admin]);

  // handle title and category changes
  const handlePostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleContentChange = (newContent: any) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      content: newContent,
    }));
  };

  // handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setImageUploading(true);
      setPublishErrMsg(null);
      const imageRef = ref(
        storage,
        `posts/${currentUser.user.id}/${new Date().getTime()}_${file.name}`
      );
      const snapshot = await uploadBytes(imageRef, file);

      const downloadURL = await getDownloadURL(snapshot.ref);
      setFormData((prevData) => ({ ...prevData, image: downloadURL }));
    } catch (err) {
      console.error("Error uploading image:", err);
      setPublishErrMsg("Failed to upload image.");
    } finally {
      setImageUploading(false);
    }
  };

  // handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // get html content from tiptap and prevent xss
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

      // post new or update existing depending on post id
      const url = postId
        ? `/post/update/${postId}/${currentUser.user.id}`
        : `/post/create/${currentUser.user.id}`;

      const res = postId
        ? await _patch<IPost>(url, payload)
        : await _post<IPost>(url, payload);

      const data = res.data;

      setPublishErrMsg(null);

      navigate(`/blogs/post/${data.slug}`);
    } catch (err) {
      console.error("Error:", err);

      if (err instanceof Error) {
        setPublishErrMsg(err.message);
      } else {
        setPublishErrMsg("An unknown error occurred");
      }
    }
  };

  // console.log(formData);

  return (
    <div className="max-w-screen-lg mx-auto">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            required
            id="title"
            placeholder="Title"
            value={formData.title}
            onChange={handlePostChange}
          />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Select
            id="category"
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
        </div>

        {/* file upload */}
        <div>
          <Label>Banner Image</Label>
          <div className="flex w-full items-center justify-center">
            <Label
              htmlFor="dropzone-file"
              className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              {imageUploading ? (
                <div className="flex justify-center items-center text-center gap-2">
                  <span>Uploading...</span>
                  <Spinner />
                </div>
              ) : (
                <>
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
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <FileInput
                    id="dropzone-file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </>
              )}
            </Label>
          </div>
        </div>

        {/* preview image */}
        {formData.image && (
          <div>
            <Label>Banner Preview</Label>
            <img
              src={formData.image}
              alt="Selected image"
              className="image-preview w-full"
            />
          </div>
        )}

        {/* Text editing */}
        <div>
          <Label>Post Content</Label>
          <MinimalTiptapEditor
            value={formData.content}
            onChange={handleContentChange}
            className="w-full"
            editorContentClassName="p-5"
            output="html"
            placeholder="Type your description here..."
            autofocus={true}
            editable={true}
            editorClassName="focus:outline-none"
          />
        </div>

        <Button type="submit" disabled={imageUploading}>
          {postId ? "Update Post" : "Publish"}
        </Button>

        {publishErrMsg && <Alert color="failure">{publishErrMsg}</Alert>}
      </form>
    </div>
  );
};

export default PostFormPage;
