import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import FontFamily from '@tiptap/extension-font-family';
import FontSize from '@tiptap/extension-font-size';  
import Image from '@tiptap/extension-image';
import Color from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import Underline from '@tiptap/extension-underline';
import MenuBar from './MenuBar';

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: { keepMarks: true },
        orderedList: { keepMarks: true },
      }),
      TextStyle,
      FontSize,
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      FontFamily.configure({
        types: [TextStyle.name],
      }),
      Image,
      Underline,
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