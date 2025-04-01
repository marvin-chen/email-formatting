import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import MenuBar from './MenuBar';

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: { keepMarks: true },
        orderedList: { keepMarks: true },
      }),
      TextStyle,
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
    ],
    content: `
      <p>This is a <em>basic</em> example of <strong>Tiptap</strong>.</p>
    `,
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="editor-container">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
