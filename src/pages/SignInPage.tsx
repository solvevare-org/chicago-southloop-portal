import { useState } from 'react';
import { useApp } from '../store/AppContext';

export function SignInPage() {
  const { login, setCurrentPage } = useApp();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await login(username.trim(), password);
    if (ok) {
      setError(null);
      setCurrentPage('home');
    } else {
      setError('Invalid username or password.');
    }
  };

  const fillDemo = () => {
    setUsername('demo');
    setPassword('Password123!');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow flex items-center justify-center py-12 px-6">
        <div className="w-full max-w-6xl bg-white drop-shadow-md rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
          <div className="p-10 flex flex-col justify-center">
            <div className="mb-8">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Welcome back</h1>
              <p className="mt-2 text-gray-600">Sign in to access your account and continue shopping.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Email or Username</label>
                <input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-2 w-full rounded-md border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 w-full rounded-md border border-gray-200 px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-300"
                />
              </div>

              {error && <div className="text-sm text-red-600">{error}</div>}

              <div className="flex items-center justify-between">
                <button type="submit" className="inline-flex items-center justify-center rounded-md bg-orange-600 text-white px-6 py-2 hover:bg-orange-700">Sign in</button>
                <button type="button" onClick={fillDemo} className="text-sm text-orange-600 hover:underline">Use demo credentials</button>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setCurrentPage('request-account')} className="text-sm text-orange-600 font-medium hover:underline">Request New Account</button>
              </div>
            </form>
          </div>

          <div className="hidden md:flex items-center justify-center bg-gradient-to-tr from-indigo-50 to-white p-8">
            <div className="w-64">
              <img src="/hero.svg" alt="illustration" className="w-full h-auto object-contain" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SignInPage;
