import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

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
  Underline,
];

const editorProps = {
  attributes: {
    class:
      "rounded-md border h-[12rem] border-input bg-back overflow-y-auto prose max-w-none",
  },
};

const Tiptap = ({ editorRef }: { editorRef: React.MutableRefObject<null> }) => {
  const editor = useEditor({
    content: "<p>Hello World!</p>",
    editorProps,
    extensions,
  });

  if (!editor) {
    return null;
  }

  if (editorRef) {
    editorRef.current = editor;
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
