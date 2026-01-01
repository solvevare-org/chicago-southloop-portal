import { useState } from 'react';
import { useApp } from '../store/AppContext';

export function RequestAccountPage() {
  const { setCurrentPage } = useApp();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [branch, setBranch] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // basic validation
    if (!firstName || !lastName || !email || email !== confirmEmail) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow flex items-center justify-center py-12 px-6">
        <div className="w-full max-w-6xl bg-white drop-shadow-md rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
          <div className="p-10 flex flex-col justify-center">
            <div className="mb-6">
              <h1 className="text-3xl font-extrabold text-gray-900">Request New Account</h1>
              <p className="mt-2 text-gray-600">Fill out the form and we'll review your request within 24 hours.</p>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                  <input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="mt-2 w-full rounded-md border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} className="mt-2 w-full rounded-md border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                </div>

                <div>
                  <label htmlFor="branch" className="block text-sm font-medium text-gray-700">Branch</label>
                  <input id="branch" value={branch} onChange={(e) => setBranch(e.target.value)} className="mt-2 w-full rounded-md border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded-md border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                </div>

                <div>
                  <label htmlFor="confirmEmail" className="block text-sm font-medium text-gray-700">Re-enter Email</label>
                  <input id="confirmEmail" type="email" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} className="mt-2 w-full rounded-md border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                </div>

                <div className="flex items-center gap-4 mt-4">
                  <button type="submit" className="inline-flex items-center justify-center rounded-md bg-indigo-600 text-white px-6 py-2 hover:bg-indigo-700">Submit Request</button>
                  <button type="button" onClick={() => setCurrentPage('signin')} className="inline-flex items-center justify-center rounded-md bg-gray-100 text-indigo-600 px-6 py-2 hover:bg-gray-200">Cancel</button>
                </div>
              </form>
            ) : (
              <div className="max-w-md">
                <div className="text-green-600 font-semibold">Request submitted. You'll receive an email within 24 hours.</div>
                <div className="mt-4">
                  <button className="inline-flex items-center justify-center rounded-md bg-indigo-600 text-white px-6 py-2" onClick={() => setCurrentPage('signin')}>Back to Sign In</button>
                </div>
              </div>
            )}
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

export default RequestAccountPage;
