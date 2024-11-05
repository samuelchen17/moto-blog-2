// src/Tiptap.tsx
import {
  useEditor,
  EditorContent,
  FloatingMenu,
  BubbleMenu,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "flowbite-react";
import { BsTypeH1 } from "react-icons/bs";
import { FaBold } from "react-icons/fa";

// define your extension array
const extensions = [
  StarterKit.configure({
    heading: { levels: [1, 2, 3] },
  }),
];

const content = "<p>Hello World!</p>";

const editorProps = {
  attributes: {
    class: "rounded-md border min-h-[150px] border-input bg-back",
  },
};

const Tiptap = () => {
  const editor = useEditor({
    extensions,
    content,
    editorProps,
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="">
      <EditorContent className="h-52" editor={editor} />
      <FloatingMenu className="flex flex-row" editor={editor}>
        <Button>
          <BsTypeH1 />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          bold
        </Button>
      </FloatingMenu>
      <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
    </div>
  );
};

export default Tiptap;
