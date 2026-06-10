import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Italic, List, ListOrdered, Link as LinkIcon } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm font-inter max-w-none focus:outline-none min-h-[150px] px-3 py-2',
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-[#E5E5E5] rounded-lg overflow-hidden bg-white">
      <div className="flex items-center gap-1 p-2 border-b border-[#E5E5E5] bg-[#F7F6F3]">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1.5 rounded hover:bg-[#E5E5E5] transition-colors ${editor.isActive('bold') ? 'bg-[#E5E5E5] text-black' : 'text-[#666666]'}`}
        >
          <Bold size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1.5 rounded hover:bg-[#E5E5E5] transition-colors ${editor.isActive('italic') ? 'bg-[#E5E5E5] text-black' : 'text-[#666666]'}`}
        >
          <Italic size={16} />
        </button>
        <div className="w-px h-4 bg-[#E5E5E5] mx-1"></div>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1.5 rounded hover:bg-[#E5E5E5] transition-colors ${editor.isActive('bulletList') ? 'bg-[#E5E5E5] text-black' : 'text-[#666666]'}`}
        >
          <List size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1.5 rounded hover:bg-[#E5E5E5] transition-colors ${editor.isActive('orderedList') ? 'bg-[#E5E5E5] text-black' : 'text-[#666666]'}`}
        >
          <ListOrdered size={16} />
        </button>
      </div>
      <EditorContent editor={editor} />
      <div className="px-3 py-1 bg-[#F7F6F3] border-t border-[#E5E5E5] text-right font-mono text-[11px] text-[#999999]">
        {editor.storage.characterCount?.characters() || 0} chars
      </div>
    </div>
  );
}
