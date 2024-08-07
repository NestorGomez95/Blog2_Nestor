"use client";

import { useRouter } from 'next/navigation';
import PostForm from '../../../components/Postform';
import useAuth from '../../../hook/useAuth';

const CreatePostPage = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  if (!isAuthenticated) {
    return <div>Please log in to create a post.</div>;
  }

  const handleSubmit = async (data: { title: string; content: string }) => {
    try {
      const response = await fetch('http://localhost:3001/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push('/');
      } else {
        throw new Error('Failed to create post');
      }
    } catch (error) {
      console.error('Failed to create post', error);
    }
  };

  return <PostForm onSubmit={handleSubmit} />;
};

export default CreatePostPage;
