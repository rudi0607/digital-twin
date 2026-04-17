import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Dashboard } from './pages/Dashboard';
import { AuthCard } from './pages/AuthCard';

const AppBody = () => {
  const { user, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(() => {
    const pref = localStorage.getItem('quakeguard_dark');
    return pref ? pref === 'true' : true;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('quakeguard_dark', String(darkMode));
  }, [darkMode]);

  return (
    <>
      <Navbar
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode((v) => !v)}
        user={user}
        onLogout={logout}
      />
      {user ? <Dashboard /> : <AuthCard />}
    </>
  );
};

const App = () => (
  <AuthProvider>
    <AppBody />
  </AuthProvider>
);

export default App;
