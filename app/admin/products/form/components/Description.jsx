'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import { useEffect } from 'react';

export default function Description({ data, handleData }) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                blockquote: true,
                bulletList: true,
                orderedList: true,
            }),
            Link.configure({
                openOnClick: false,
            }),
        ],
        content: data?.description || '',
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            handleData('description', html);
        },
    });

    // Sync if data is loaded async
    useEffect(() => {
        if (editor && data?.description && editor.getHTML() !== data.description) {
            editor.commands.setContent(data.description);
        }
    }, [data?.description]);

    return (
        <section className="flex flex-col gap-3 bg-white border p-4 rounded-xl h-full">
            <h1 className="font-semibold">Descripción</h1>

            {/* Toolbar simple */}
            <div className="flex gap-2 border-b pb-2 mb-2 text-sm">
                <button onClick={() => editor.chain().focus().toggleBold().run()} className="font-bold">B</button>
                <button onClick={() => editor.chain().focus().toggleItalic().run()} className="italic">I</button>
                <button onClick={() => editor.chain().focus().toggleUnderline().run()}>U</button>
                <button onClick={() => editor.chain().focus().toggleStrike().run()}>S</button>
                <button onClick={() => editor.chain().focus().toggleBlockquote().run()}>“”</button>
                <button onClick={() => editor.chain().focus().toggleBulletList().run()}>• Lista</button>
                <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>1. Lista</button>
                <button onClick={() => {
                    const url = prompt('Insertar enlace');
                    if (url) {
                        editor.chain().focus().setLink({ href: url }).run();
                    }
                }}>🔗</button>
                <button onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}>🧹</button>
            </div>

            <div className="min-h-[150px] border rounded-md p-2 w-full max-w-3xl">
                <EditorContent editor={editor} className="editor-content" />
            </div>
        </section>
    );
}
