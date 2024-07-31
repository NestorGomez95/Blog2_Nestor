import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '../../../hook/useAuth';

export default function PostPage({ params }) {
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');
  const { isAdmin } = useAuth();
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${id}`);
        if (!response.ok) throw new Error('Failed to load post');
        const postData = await response.json();
        setPost(postData);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (!isAdmin) {
      setError('Unauthorized');
      return;
    }

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete post');
      router.push('/');
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) return <p>{error}</p>;
  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      {isAdmin && (
        <button onClick={handleDelete} className="bg-red-500 text-white p-2 rounded">
          Delete Post
        </button>
      )}
    </div>
  );
}
