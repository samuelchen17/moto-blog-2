import { useEditor, EditorContent, BubbleMenu, Editor } from "@tiptap/react";
import { extensions, editorProps } from "../../config/tiptap.config";
import { IPublishPostPayload } from "@shared/types/post";

import MenuBar from "./MenuBar";
import { useEffect } from "react";

interface ITiptapProps {
  editorRef: React.MutableRefObject<Editor | null>;
  setFormData: React.Dispatch<React.SetStateAction<IPublishPostPayload>>;
  formContent?: string;
}

const Tiptap = ({ editorRef, setFormData, formContent }: ITiptapProps) => {
  console.log(formContent);
  const editor = useEditor({
    content: formContent || "",
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

  // useEffect to set initial form content
  useEffect(() => {
    if (editor && formContent) {
      // Only set content if it's not already set
      if (editor.getHTML() !== formContent) {
        editor.commands.setContent(formContent);
      }
    }

    return () => {
      editorRef.current = null;
    };
  }, [editor, formContent]);

  // if (editorRef) {
  //   editorRef.current = editor;
  // }

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
