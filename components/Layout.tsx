import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header className="bg-darkSurface p-4">
        <nav className="container mx-auto flex justify-between">
          <Link href="/">
            <a className="text-neonGreen text-xl">My Blog</a>
          </Link>
          <div>
            <Link href="/posts/create">
              <a className="text-neonBlue hover:text-neonPink transition-colors duration-300">Create Post</a>
            </Link>
          </div>
        </nav>
      </header>
      <main className="container mx-auto p-4">
        {children}
      </main>
      <footer className="bg-darkSurface text-neonPurple p-4 text-center">
        <p>&copy; 2023 My Blog</p>
      </footer>
    </div>
  );
}

