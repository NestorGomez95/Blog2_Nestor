import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '../../../hook/useAuth';

export default function CreatePostPage() {
  const { isAdmin } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  if (!isAdmin) {
    router.push('/auth/login');
    return null;
  }

  const handleCreatePost = async (e) => {
    e.preventDefault();
    // Lógica para enviar el post al backend
  };

  return (
    <div>
      <h1>Create a New Post</h1>
      <form onSubmit={handleCreatePost}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}
