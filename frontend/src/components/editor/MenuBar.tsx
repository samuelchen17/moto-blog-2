import { Editor } from "@tiptap/react";
import { BsTypeH1, BsTypeH2, BsTypeH3 } from "react-icons/bs";
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatStrikethrough,
  MdFormatUnderlined,
} from "react-icons/md";

interface IMenuBar {
  editor: Editor;
}

const menuItemSize = 30;

const MenuBar = ({ editor }: IMenuBar) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="border rounded-md flex items-center flex-wrap gap-x-4 p-4">
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={
          editor.isActive("heading", { level: 1 }) ? "tiptap-is-active" : ""
        }
      >
        <BsTypeH1 size={menuItemSize} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={
          editor.isActive("heading", { level: 2 }) ? "tiptap-is-active" : ""
        }
      >
        <BsTypeH2 size={menuItemSize} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={
          editor.isActive("heading", { level: 3 }) ? "tiptap-is-active" : ""
        }
      >
        <BsTypeH3 size={menuItemSize} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "tiptap-is-active" : ""}
      >
        <MdFormatBold size={menuItemSize} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "tiptap-is-active" : ""}
      >
        <MdFormatItalic size={menuItemSize} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive("underline") ? "tiptap-is-active" : ""}
      >
        <MdFormatUnderlined size={menuItemSize} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "tiptap-is-active" : ""}
      >
        <MdFormatStrikethrough size={menuItemSize} />
      </button>

      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        Undo
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        Redo
      </button>

      <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        Clear marks
      </button>
      <button onClick={() => editor.chain().focus().clearNodes().run()}>
        Clear nodes
      </button>
      {/* <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive("paragraph") ? "tiptap-is-active" : ""}
      >
        Paragraph
      </button> */}

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "tiptap-is-active" : ""}
      >
        Bullet list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "tiptap-is-active" : ""}
      >
        Ordered list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "tiptap-is-active" : ""}
      >
        Blockquote
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        Horizontal rule
      </button>
      <button onClick={() => editor.chain().focus().setHardBreak().run()}>
        Hard break
      </button>
    </div>
  );
};

export default MenuBar;
