import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const AuthCard = () => {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (mode === 'signup') {
        await signup(form.name, form.email, form.password);
      } else {
        await login(form.email, form.password);
      }
    } catch (apiError) {
      setError(apiError?.response?.data?.message || 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto mt-8 max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="mb-4 text-xl font-semibold">
        {mode === 'login' ? 'Login' : 'Create account'}
      </h2>

      <form onSubmit={submit} className="space-y-3">
        {mode === 'signup' ? (
          <input
            placeholder="Name"
            className="w-full rounded-md border border-slate-300 bg-transparent px-3 py-2"
            value={form.name}
            onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
          />
        ) : null}

        <input
          type="email"
          placeholder="Email"
          className="w-full rounded-md border border-slate-300 bg-transparent px-3 py-2"
          value={form.email}
          onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full rounded-md border border-slate-300 bg-transparent px-3 py-2"
          value={form.password}
          onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))}
        />

        {error ? <p className="text-sm text-rose-500">{error}</p> : null}

        <button
          className="w-full rounded-md bg-indigo-600 px-4 py-2 font-semibold text-white"
          disabled={loading}
        >
          {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Sign up'}
        </button>
      </form>

      <button
        className="mt-3 text-sm text-indigo-500"
        onClick={() => setMode((prev) => (prev === 'login' ? 'signup' : 'login'))}
      >
        {mode === 'login'
          ? "Don't have an account? Sign up"
          : 'Already have an account? Login'}
      </button>
    </section>
  );
};
