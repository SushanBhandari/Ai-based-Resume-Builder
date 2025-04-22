"use client";

import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Start writing here...",
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      if (typeof onChange === "function") {
        onChange(editor.getHTML());
      } else {
        console.warn("RichTextEditor: onChange is not a function");
      }
    },
  });

  // Sync external value with editor (avoid infinite loop)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, false); // Prevents history stack from recording
    }
  }, [value, editor]);

  if (!editor) return null;

  const buttonClass = (isActive) =>
    `px-2 py-1 border rounded text-sm transition ${
      isActive
        ? "bg-gray-300 dark:bg-gray-700 font-semibold"
        : "hover:bg-gray-100 dark:hover:bg-gray-800"
    }`;

  return (
    <div className="border rounded-md p-4">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 mb-3">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={buttonClass(editor.isActive("bold"))}
          aria-label="Bold"
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={buttonClass(editor.isActive("italic"))}
          aria-label="Italic"
        >
          I
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={buttonClass(editor.isActive("underline"))}
          aria-label="Underline"
        >
          U
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={buttonClass(editor.isActive("bulletList"))}
          aria-label="Bullet List"
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={buttonClass(editor.isActive("orderedList"))}
          aria-label="Numbered List"
        >
          1. List
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().unsetAllMarks().clearNodes().run()
          }
          className={buttonClass(false)}
          aria-label="Clear Formatting"
        >
          Clear
        </button>
      </div>

      {/* Editor Content */}
      <EditorContent
        editor={editor}
        className="min-h-[150px] border p-3 rounded text-sm focus:outline-none"
      />
    </div>
  );
}
