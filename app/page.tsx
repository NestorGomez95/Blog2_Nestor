// app/page.tsx
import useAuth from '../hook/useAuth';

const HomePage = () => {
  const { isAdmin, isAuthenticated, logout } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h1>Welcome, Admin: {isAdmin ? 'Yes' : 'No'}</h1>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <h1>Please login</h1>
        </div>
      )}
    </div>
  );
};

export default HomePage;
