'use client';

import { useRef, useMemo, useEffect, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill-new');
    return ({ forwardedRef, ...props }: any) => <RQ ref={forwardedRef} {...props} />;
  },
  {
    ssr: false,
    loading: () => <p>Loading editor...</p>,
  }
);

const MAX_LINKS = 5;

export default function QuillEditor() {
  // This ref now works perfectly with dynamic import
  const quillRef = useRef<any>(null);

  const [value, setValue] = useState('');
  const [linkCount, setLinkCount] = useState(0);

  const countLinks = useCallback(() => {
    const quill = quillRef.current?.getEditor?.();
    if (!quill) return 0;

    const contents = quill.getContents();
    let count = 0;
    contents.ops?.forEach((op: any) => {
      if (op.attributes?.link) count++;
    });
    return count;
  }, []);

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link'],
        ['clean'],
      ],
      handlers: {
        link: function (this: any, value: boolean | string) {
          const quill = this.quill;

          if (!value) {
            quill.format('link', false);
            return;
          }

          if (countLinks() >= MAX_LINKS) {
            alert(`Maximum ${MAX_LINKS} links allowed.`);
            return;
          }

          const href = prompt('Enter the URL:');
          if (href) {
            quill.format('link', href);
          }
        },
      },
    },
  }), [countLinks]);

  // Update live counter + enforce limit on any change
  useEffect(() => {
    const quill = quillRef.current?.getEditor?.();
    console.log(quill);
    
    if (!quill) return;

    const handleTextChange = () => {
      const current = countLinks();
      setLinkCount(current);
      console.log("From Quill Editor", current, quill);

      if (current > MAX_LINKS) {
        alert(`Link limit of ${MAX_LINKS} exceeded!`);
      }
    };

    quill.on('text-change', handleTextChange);

    return () => {
      quill.off('text-change', handleTextChange);
    };
  }, [countLinks]);

  return (
    <div>
      <ReactQuill
        forwardedRef={quillRef}  
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
        placeholder={`Write here... (Maximum ${MAX_LINKS} links)`}
      />

      <p style={{ marginTop: '10px', color: linkCount > MAX_LINKS ? 'red' : '#666' }}>
        Links used: {linkCount} / {MAX_LINKS}
      </p>
    </div>
  );
}