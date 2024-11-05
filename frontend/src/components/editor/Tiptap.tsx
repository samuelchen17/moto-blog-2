// src/Tiptap.tsx
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import MenuBar from "./MenuBar";

// define your extension array
const extensions = [
  StarterKit.configure({
    heading: { levels: [1, 2, 3] },
    codeBlock: false,
    code: false,
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
];

const editorProps = {
  attributes: {
    class: "rounded-md border h-[12rem] border-input bg-back overflow-y-auto",
  },
};

const Tiptap = () => {
  const editor = useEditor({
    content: "<p>Hello World!</p>",
    editorProps,
    extensions,
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="">
      <MenuBar editor={editor}></MenuBar>
      <EditorContent editor={editor} />
      <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
    </div>
  );
};

export default Tiptap;
