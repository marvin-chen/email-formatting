import React, { useState } from 'react';
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
  faPalette,
  faUnderline,
  faTextHeight,
  faImage,
  faCaretDown,
  faFont
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
  faPalette,
  faUnderline,
  faTextHeight,
  faImage,
  faCaretDown,
  faFont
);

// Font size options
const FONT_SIZES = [
  { name: 'Small', value: '10px' },
  { name: 'Normal', value: '14px' },
  { name: 'Medium', value: '18px' },
  { name: 'Large', value: '24px' }, 
  { name: 'Huge', value: '36px' }
];

// Font family options
const FONT_FAMILIES = [
  { name: 'Arial', value: 'Arial, sans-serif' },
  { name: 'Times New Roman', value: 'Times New Roman, serif' },
  { name: 'Courier New', value: 'Courier New, monospace' },
  { name: 'Georgia', value: 'Georgia, serif' },
  { name: 'Verdana', value: 'Verdana, sans-serif' },
  { name: 'Helvetica', value: 'Helvetica, sans-serif' }
];

const MenuBar = ({ editor }: { editor: Editor }) => {
  const [showFontSizeDropdown, setShowFontSizeDropdown] = useState(false);
  const [showFontFamilyDropdown, setShowFontFamilyDropdown] = useState(false);
  
  if (!editor) {
    return null;
  }
  
  // Ensure the Image extension is added to the editor
  if (!editor.extensionManager.extensions.some(ext => ext.name === 'image')) {
    console.error('Image extension is not added to the editor.');
    // Continue with other functionality
  }

  const handleImageUpload = async (file: File) => {
    try {
      // Create a data URL for testing purposes
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    } catch (error) {
      console.error('Upload failed:', error);
      return null;
    }
  };

  const toggleUnderline = () => {
    editor.chain().focus().toggleMark('underline').run();
  };

  // Get current font size
  const getCurrentFontSize = () => {
    for (const sizeObj of FONT_SIZES) {
      if (editor.isActive('textStyle', { fontSize: sizeObj.value })) {
        return sizeObj.name;
      }
    }
    return 'Normal'; // Default size name
  };

  // Set font size
  const setFontSize = (size: string) => {
    // First remove any existing font size
    editor.chain().focus().unsetMark('textStyle').run();
    // Then set the new font size
    editor.chain().focus().setMark('textStyle', { fontSize: size }).run();
    setShowFontSizeDropdown(false);
  };

  // Get current font family
  const getCurrentFontFamily = () => {
    for (const font of FONT_FAMILIES) {
      if (editor.isActive('textStyle', { fontFamily: font.value }) || 
          editor.isActive({ fontFamily: font.value })) {
        return font.name;
      }
    }
    return 'Arial'; // Default font
  };

  // Set font family
  const setFontFamily = (fontFamily: string) => {
    editor.chain().focus().setFontFamily(fontFamily).run();
    setShowFontFamilyDropdown(false);
  };

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
        onClick={toggleUnderline}
        className={editor.isActive('underline') ? 'is-active' : ''}
      >
        <FontAwesomeIcon icon={faUnderline} className="menu-icon" size="sm" />
      </button>
      
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        <FontAwesomeIcon icon={faStrikethrough} className="menu-icon" size="sm" />
      </button>

      {/* Font family dropdown */}
      <div className="dropdown-container">
        <button 
          className="dropdown-button"
          onClick={() => setShowFontFamilyDropdown(!showFontFamilyDropdown)}
        >
          <FontAwesomeIcon icon={faFont} className="menu-icon" size="sm" />
          <span className="dropdown-label">{getCurrentFontFamily()}</span>
          <FontAwesomeIcon icon={faCaretDown} className="menu-icon caret" size="sm" />
        </button>
        
        {showFontFamilyDropdown && (
          <div className="dropdown-menu font-family-menu">
            {FONT_FAMILIES.map(font => (
              <button 
                key={font.name} 
                onClick={() => setFontFamily(font.value)}
                className={editor.isActive('textStyle', { fontFamily: font.value }) ? 'is-active' : ''}
                style={{ fontFamily: font.value }}
              >
                {font.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Font size dropdown */}
      <div className="dropdown-container">
        <button 
          className="dropdown-button"
          onClick={() => setShowFontSizeDropdown(!showFontSizeDropdown)}
        >
          <FontAwesomeIcon icon={faTextHeight} className="menu-icon" size="sm" />
          <span className="dropdown-label">{getCurrentFontSize()}</span>
          <FontAwesomeIcon icon={faCaretDown} className="menu-icon caret" size="sm" />
        </button>
        
        {showFontSizeDropdown && (
          <div className="dropdown-menu font-size-menu">
            {FONT_SIZES.map(sizeObj => (
              <button 
                key={sizeObj.name} 
                onClick={() => setFontSize(sizeObj.value)}
                className={editor.isActive('textStyle', { fontSize: sizeObj.value }) ? 'is-active' : ''}
              >
                <span style={{ fontSize: sizeObj.value }}>{sizeObj.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

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

      {/* Image upload */}
      <button
        onClick={() => document.getElementById('editor-image-upload')?.click()}
      >
        <FontAwesomeIcon icon={faImage} className="menu-icon" size="sm" />
        <input
          type="file"
          id="editor-image-upload"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (file) {
              const url = await handleImageUpload(file);
              if (url) {
                editor.chain().focus().setImage({ src: url }).run();
              }
            }
          }}
        />
      </button>
    </div>
  );
};

export default MenuBar;