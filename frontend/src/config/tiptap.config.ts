import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";

export const extensions = [
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
  Placeholder.configure({ placeholder: "Write something ..." }),
];

export const editorProps = {
  attributes: {
    class:
      "rounded-md border h-[12rem] border-input bg-back overflow-y-auto prose max-w-none",
  },
};
