import { useState } from 'react';

type PostFormProps = {
  onSubmit: (data: { title: string; content: string }) => void;
  initialData?: { title: string; content: string };
};

export default function PostForm({ onSubmit, initialData }: PostFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, content });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-neonGreen">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 block w-full p-2 bg-darkSurface border-none text-white rounded-md focus:ring-2 focus:ring-neonBlue"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="content" className="block text-sm font-medium text-neonGreen">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="mt-1 block w-full p-2 bg-darkSurface border-none text-white rounded-md focus:ring-2 focus:ring-neonBlue"
          rows={5}
        />
      </div>
      <button type="submit" className="w-full bg-neonGreen text-black p-2 rounded-md hover:bg-neonPink transition-all duration-300">
        Submit
      </button>
    </form>
  );
}
