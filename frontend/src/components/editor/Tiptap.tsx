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
const extensions = [StarterKit];

const content = "<p>Hello World!</p>";

const Tiptap = () => {
  const editor = useEditor({
    extensions,
    content,
  });

  return (
    <div className="">
      <EditorContent className="h-52" editor={editor} />
      <FloatingMenu className="flex flex-row" editor={editor}>
        <Button>
          <BsTypeH1 />
        </Button>
        <Button>
          <FaBold />
        </Button>
      </FloatingMenu>
      <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
    </div>
  );
};

export default Tiptap;
