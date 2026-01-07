import { useState } from 'react';
import { useApp } from '../store/AppContext';

export function ForgotPasswordPage() {
  const { setCurrentPage } = useApp();
  const [username, setUsername] = useState('');
  const [sent, setSent] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock send
    setSent(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-6">
          <h2 className="text-3xl font-extrabold mb-3">FORGOT YOUR PASSWORD?</h2>
          <p className="text-gray-600 mb-6">Please enter your User ID below and we'll send password reset instructions to the email address in your profile.</p>

          {!sent ? (
            <form onSubmit={handleSend} className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm font-medium">* User Name</label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-2 w-full border border-gray-300 px-3 py-2 bg-white"
                />
              </div>

              <div className="flex items-center gap-4 mt-4">
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors">SEND EMAIL</button>
                <button type="button" onClick={() => setCurrentPage('signin')} className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded transition-colors">CANCEL</button>
              </div>
            </form>
          ) : (
            <div className="max-w-md">
              <div className="text-green-600 font-semibold">Password reset email sent.</div>
              <div className="mt-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors" onClick={() => setCurrentPage('signin')}>Back to Sign In</button>
              </div>
            </div>
          )}
        </div>

        <div className="col-span-6 flex items-center justify-center">
          <img src="/hero.svg" alt="team" className="w-3/4 object-cover" />
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
