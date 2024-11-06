import { useEditor, EditorContent, BubbleMenu, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { IPublishPostPayload } from "@shared/types/post";

import MenuBar from "./MenuBar";
import { useEffect } from "react";

interface ITiptapProps {
  editorRef: React.MutableRefObject<Editor | null>;
  setFormData: React.Dispatch<React.SetStateAction<IPublishPostPayload>>;
}

// define your extension array
const extensions = [
  StarterKit.configure({
    heading: { levels: [1, 2, 3] },
    codeBlock: false,
    code: false,
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
  Underline,
];

const editorProps = {
  attributes: {
    class:
      "rounded-md border h-[12rem] border-input bg-back overflow-y-auto prose max-w-none",
  },
};

const Tiptap = ({ editorRef, setFormData }: ITiptapProps) => {
  const editor = useEditor({
    content: "<p>Hello World!</p>",
    editorProps,
    extensions,
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      setFormData((prevData) => ({
        ...prevData,
        content,
      }));
    },
  });

  // if (editorRef) {
  //   editorRef.current = editor;
  // }

  useEffect(() => {
    if (editor) {
      editorRef.current = editor;
    }
    return () => {
      editorRef.current = null;
    };
  }, [editor, editorRef]);

  if (!editor) return null;

  return (
    <div className="">
      <MenuBar editor={editor}></MenuBar>
      <EditorContent editor={editor} />
      <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
    </div>
  );
};

export default Tiptap;
