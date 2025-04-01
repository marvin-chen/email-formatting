import React from 'react';
import { Editor } from '@tiptap/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBold,
  faItalic,
  faStrikethrough,
  faListUl,
  faListOl,
  faQuoteRight,
  faUndo,
  faRedo,
  faPalette
} from '@fortawesome/free-solid-svg-icons';

// Add all icons to the library
library.add(
  faBold, 
  faItalic, 
  faStrikethrough, 
  faListUl, 
  faListOl, 
  faQuoteRight, 
  faUndo, 
  faRedo, 
  faPalette
);

const MenuBar = ({ editor }: { editor: Editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="menu-bar">
      {/* Text formatting */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        <FontAwesomeIcon icon={faBold} className="menu-icon" size="sm" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        <FontAwesomeIcon icon={faItalic} className="menu-icon" size="sm" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        <FontAwesomeIcon icon={faStrikethrough} className="menu-icon" size="sm" />
      </button>

      {/* Lists */}
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        <FontAwesomeIcon icon={faListUl} className="menu-icon" size="sm" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        <FontAwesomeIcon icon={faListOl} className="menu-icon" size="sm" />
      </button>

      {/* Blockquote */}
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
      >
        <FontAwesomeIcon icon={faQuoteRight} className="menu-icon" size="sm" />
      </button>

      {/* Undo/Redo */}
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <FontAwesomeIcon icon={faUndo} className="menu-icon" size="sm" />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <FontAwesomeIcon icon={faRedo} className="menu-icon" size="sm" />
      </button>

      {/* Text color */}
      <button
        onClick={() => editor.chain().focus().setColor('#ff0000').run()}
        className={editor.isActive('textStyle', { color: '#ff0000' }) ? 'is-active' : ''}
      >
        <FontAwesomeIcon icon={faPalette} className="menu-icon" size="sm" style={{ color: '#ff0000' }} />
      </button>
    </div>
  );
};

export default MenuBar;