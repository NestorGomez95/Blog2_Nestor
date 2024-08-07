"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/LoginForm';

const HomePage = () => {
  const { isAuthenticated, logout } = useAuth();
  const [posts, setPosts] = useState<{ id: number; title: string; content: string }[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('http://localhost:3001/api/posts');
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {isAuthenticated ? (
        <div>
          <button onClick={logout} className="bg-red-500 text-white p-2 rounded mb-4">
            Logout
          </button>
          <h1 className="text-4xl font-bold mb-6">Blog Posts</h1>
          <Link href="/posts/create" className="bg-blue-500 text-white p-2 rounded mb-4 inline-block">
            Create New Post
          </Link>
          <ul className="space-y-4">
            {posts.map((post) => (
              <li key={post.id} className="bg-white p-4 rounded shadow">
                <h2 className="text-2xl font-bold">{post.title}</h2>
                <p>{post.content}</p>
                <Link href={`/posts/${post.id}/edit`} className="text-blue-500 hover:underline">
                  Edit
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};

export default HomePage;
