class AuthService {
    private isAdmin: boolean = false;
    private isAuthenticated: boolean = false;
  
    constructor() {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
          this.verifyToken(token);
        }
      }
    }
  
    private async verifyToken(token: string) {
      try {
        const response = await fetch('http://localhost:3001/api/auth/verify', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.isAuthenticated) {
          this.isAuthenticated = true;
          this.isAdmin = data.isAdmin;
        } else {
          this.logout();
        }
      } catch (error) {
        this.logout();
      }
    }
  
    public async login(username: string, password: string) {
      try {
        const response = await fetch('http://localhost:3001/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
  
        if (response.ok) {
          const data = await response.json();
          this.isAdmin = data.isAdmin;
          this.isAuthenticated = true;
          if (typeof window !== 'undefined') {
            localStorage.setItem('token', data.token);
          }
        } else {
          throw new Error('Login failed');
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    }
  
    public logout() {
      this.isAdmin = false;
      this.isAuthenticated = false;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }
    }
  
    public getAuthStatus() {
      return {
        isAdmin: this.isAdmin,
        isAuthenticated: this.isAuthenticated,
      };
    }
  }
  
  const authService = new AuthService();
  export default authService;
  