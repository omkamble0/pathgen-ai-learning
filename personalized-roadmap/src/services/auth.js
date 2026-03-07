const USERS_KEY = 'pathgen_users';
const SESSION_KEY = 'pathgen_current_user';

export const authService = {
  // 1. Get all registered users
  getUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  },

  // 2. Register a new user
  register(username, email, password) {
    const users = this.getUsers();
    
    // Check if user (email OR username) already exists
    if (users.find(u => u.email === email || u.username === username)) {
      return { success: false, message: 'User already exists!' };
    }

    // Create new user
    const newUser = {
      username,
      email,
      password,
      xp: 0,
      streak: 1,
      role: 'Student',
      joinedDate: new Date().toISOString()
    };

    // Save to Local Storage
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    // Auto-login
    this.login(email, password);
    return { success: true };
  },

  // 3. Login (Accepts Email OR Username)
  login(identifier, password) {
    const users = this.getUsers();
    
    // Check if identifier matches Email OR Username
    const user = users.find(u => 
      (u.email === identifier || u.username === identifier) && 
      u.password === password
    );

    if (user) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(user));
      return { success: true, user };
    }
    return { success: false, message: 'Invalid credentials' };
  },

  // 4. Get currently logged in user
  getCurrentUser() {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  },

  // 5. Logout
  logout() {
    localStorage.removeItem(SESSION_KEY);
  }
};
