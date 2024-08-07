"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import PostForm from '@/components/Postform';
import useAuth from '@/hook/useAuth';

const EditPostPage = ({ params }: { params: { id: string } }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [post, setPost] = useState<{ title: string; content: string } | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`http://localhost:3001/api/posts/${params.id}`);
      const data = await response.json();
      setPost(data);
    };
    fetchPost();
  }, [params.id]);

  if (!isAuthenticated) {
    return <div>Please log in to edit this post.</div>;
  }

  const handleSubmit = async (data: { title: string; content: string }) => {
    try {
      const response = await fetch(`http://localhost:3001/api/posts/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push('/');
      } else {
        throw new Error('Failed to update post');
      }
    } catch (error) {
      console.error('Failed to update post', error);
    }
  };

  return post ? <PostForm initialTitle={post.title} initialContent={post.content} onSubmit={handleSubmit} /> : <div>Loading...</div>;
};

export default EditPostPage;
