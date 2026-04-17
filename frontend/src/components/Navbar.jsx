import { Moon, Sun } from 'lucide-react';

export const Navbar = ({ darkMode, onToggleTheme, user, onLogout }) => (
  <header className="sticky top-0 z-20 border-b border-slate-300/50 bg-white/90 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
    <div className="mx-auto flex max-w-7xl items-center justify-between">
      <div>
        <h1 className="text-xl font-bold">Kimi Agent – QuakeGuard</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Smart Earthquake Detection & Alert System
        </p>
      </div>

      <div className="flex items-center gap-3">
        {user ? (
          <>
            <span className="hidden text-sm md:block">Hi, {user.name}</span>
            <button
              className="rounded-lg bg-slate-200 px-3 py-1 text-sm dark:bg-slate-700"
              onClick={onLogout}
            >
              Logout
            </button>
          </>
        ) : null}

        <button
          onClick={onToggleTheme}
          className="rounded-lg border border-slate-300 p-2 dark:border-slate-700"
          aria-label="toggle theme"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </div>
  </header>
);
