import { useEffect, useState } from 'react';
import { useApp } from '../store/AppContext';
import { User, MapPin, Phone, CreditCard, List } from 'lucide-react';

type Address = { id: number; street: string; city: string; state: string; zip: string; type: string };
type Phone = { id: number; phone: string; type: string };

export function MyAccountPage() {
  const { userName, profile, updateProfile } = useApp();
  const [tab, setTab] = useState<'dashboard'|'address'|'phone'|'allowance'|'orders'>('dashboard');

  // addresses and phones persisted to localStorage
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [phones, setPhones] = useState<Phone[]>([]);

  useEffect(() => {
    const a = localStorage.getItem('mock_addresses');
    const p = localStorage.getItem('mock_phones');
    if (a) {
      try { setAddresses(JSON.parse(a)); } catch {}
    } else {
      const defaults: Address[] = [
        { id: 1, street: '340 COMMERCE DRIVE', city: 'CRYSTAL LAKE', state: 'Illinois', zip: '60014', type: 'Billing' },
        { id: 2, street: '2125 POINT BLVD', city: 'ELGIN', state: 'Illinois', zip: '60123-7956', type: 'Shipping' },
      ];
      setAddresses(defaults);
      localStorage.setItem('mock_addresses', JSON.stringify(defaults));
    }
    if (p) {
      try { setPhones(JSON.parse(p)); } catch {}
    } else {
      const defaults: Phone[] = [ { id: 1, phone: '(847) 697-7643 x811', type: 'Land' } ];
      setPhones(defaults);
      localStorage.setItem('mock_phones', JSON.stringify(defaults));
    }
  }, []);

  const saveAddresses = (next: Address[]) => {
    setAddresses(next);
    localStorage.setItem('mock_addresses', JSON.stringify(next));
  };

  const savePhones = (next: Phone[]) => {
    setPhones(next);
    localStorage.setItem('mock_phones', JSON.stringify(next));
  };

  // Change password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwMessage, setPwMessage] = useState<string | null>(null);

  const passwordRules = (pw: string) => {
    return {
      lower: /[a-z]/.test(pw),
      upper: /[A-Z]/.test(pw),
      number: /[0-9]/.test(pw),
      special: /[^A-Za-z0-9]/.test(pw),
      min: pw.length >= 8,
    };
  };

  const handleChangePassword = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!profile) return setPwMessage('No profile loaded');
    if (currentPassword !== profile.password) return setPwMessage('Current password is incorrect');
    if (newPassword !== confirmPassword) return setPwMessage('New password and confirm do not match');
    const rules = passwordRules(newPassword);
    if (!rules.lower || !rules.upper || !rules.number || !rules.special || !rules.min) {
      return setPwMessage('Password does not meet requirements');
    }
    updateProfile({ password: newPassword });
    setCurrentPassword(''); setNewPassword(''); setConfirmPassword('');
    setPwMessage('Password updated successfully');
  };

  // Email
  const [currentEmail, setCurrentEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [emailMsg, setEmailMsg] = useState<string | null>(null);

  useEffect(() => {
    setCurrentEmail(profile?.email ?? '');
  }, [profile]);

  const handleChangeEmail = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!profile) return setEmailMsg('No profile');
    if (currentEmail !== profile.email) return setEmailMsg('Current email does not match');
    if (!newEmail || newEmail !== confirmEmail) return setEmailMsg('New email and confirm do not match');
    updateProfile({ email: newEmail });
    setNewEmail(''); setConfirmEmail('');
    setEmailMsg('Email updated');
  };

  // Security question
  const [securityQuestion, setSecurityQuestion] = useState(profile?.securityQuestion ?? '');
  const [securityAnswer, setSecurityAnswer] = useState(profile?.securityAnswer ?? '');
  const [secMsg, setSecMsg] = useState<string | null>(null);

  useEffect(() => {
    setSecurityQuestion(profile?.securityQuestion ?? '');
    setSecurityAnswer(profile?.securityAnswer ?? '');
  }, [profile]);

  const handleUpdateSecurity = (e?: React.FormEvent) => {
    e?.preventDefault();
    updateProfile({ securityQuestion, securityAnswer });
    setSecMsg('Security question updated');
  };

  // Address CRUD
  const addAddress = () => {
    const next: Address = { id: Date.now(), street: '', city: '', state: '', zip: '', type: 'Shipping' };
    saveAddresses([next, ...addresses]);
  };

  const updateAddress = (id: number, patch: Partial<Address>) => {
    const next = addresses.map(a => a.id === id ? { ...a, ...patch } : a);
    saveAddresses(next);
  };

  const deleteAddress = (id: number) => {
    saveAddresses(addresses.filter(a => a.id !== id));
  };

  // Phone CRUD
  const addPhone = () => {
    const next: Phone = { id: Date.now(), phone: '', type: 'Mobile' };
    savePhones([next, ...phones]);
  };

  const updatePhone = (id: number, patch: Partial<Phone>) => {
    const next = phones.map(p => p.id === id ? { ...p, ...patch } : p);
    savePhones(next);
  };

  const deletePhone = (id: number) => {
    savePhones(phones.filter(p => p.id !== id));
  };

  // Mock transactions and orders
  const transactions = [
    { date: '02/01/2025', type: 'Allotment Deposit', order: '', amount: 999.99, balance: 999.99, tx: '12919833' },
    { date: '03/06/2024', type: 'Order', order: '26025467', amount: -72.85, balance: 927.14, tx: '10709557' },
  ];

  const orders = [
    { id: '20134567', cust: 'ALLOWANCE', username: 'KRLUSER678', date: '03/06/2024', status: 'Cancelled', total: 72.86 },
    { id: '20134568', cust: 'ALLOWANCE', username: 'KRLUSER678', date: '02/11/2022', status: 'Complete', total: 321.24 },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold">Account Dashboard</h1>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <aside className="col-span-12 md:col-span-3">
          <div className="md:sticky md:top-20">
            <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
              <div className="px-4 py-4 flex items-center gap-3 border-b">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm font-semibold">{userName ?? profile?.username ?? 'Valued Customer'}</div>
                  <div className="text-xs text-gray-500">Manage account & settings</div>
                </div>
              </div>

              <nav className="p-2">
                <ul className="flex flex-col">
                  <li>
                    <button
                      onClick={() => setTab('dashboard')}
                      className={`w-full text-left flex items-center gap-3 px-3 py-3 rounded-md transition ${
                        tab === 'dashboard' ? 'bg-orange-50 text-orange-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <User className="w-5 h-5 text-gray-500" />
                      <span className="text-sm">Account Dashboard</span>
                    </button>
                  </li>

                  <li>
                    <button
                      onClick={() => setTab('address')}
                      className={`w-full text-left flex items-center gap-3 px-3 py-3 rounded-md transition ${
                        tab === 'address' ? 'bg-orange-50 text-orange-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <MapPin className="w-5 h-5 text-gray-500" />
                      <span className="text-sm">Address Book</span>
                    </button>
                  </li>

                  <li>
                    <button
                      onClick={() => setTab('phone')}
                      className={`w-full text-left flex items-center gap-3 px-3 py-3 rounded-md transition ${
                        tab === 'phone' ? 'bg-orange-50 text-orange-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Phone className="w-5 h-5 text-gray-500" />
                      <span className="text-sm">Phone Book</span>
                    </button>
                  </li>

                  <li>
                    <button
                      onClick={() => setTab('allowance')}
                      className={`w-full text-left flex items-center gap-3 px-3 py-3 rounded-md transition ${
                        tab === 'allowance' ? 'bg-orange-50 text-orange-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <CreditCard className="w-5 h-5 text-gray-500" />
                      <span className="text-sm">Allowance Tracking</span>
                    </button>
                  </li>

                  <li>
                    <button
                      onClick={() => setTab('orders')}
                      className={`w-full text-left flex items-center gap-3 px-3 py-3 rounded-md transition ${
                        tab === 'orders' ? 'bg-orange-50 text-orange-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <List className="w-5 h-5 text-gray-500" />
                      <span className="text-sm">Order History</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </aside>

        <main className="col-span-12 md:col-span-9">
          <div className="bg-white border rounded-lg shadow-sm p-6">
            {tab === 'dashboard' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Account Dashboard</h2>
                <p className="text-gray-700 mb-2">Welcome, <span className="font-medium">{userName ?? profile?.username ?? 'Valued Customer'}</span>.</p>

                <section className="mb-8">
                  <h3 className="font-semibold mb-3">CHANGE PASSWORD</h3>
                    <form onSubmit={handleChangePassword} className="space-y-3 max-w-2xl">
                      <div>
                        <label className="block text-sm text-gray-600">Current Password</label>
                        <input type="password" value={currentPassword} onChange={(e)=>setCurrentPassword(e.target.value)} className="mt-1 block w-full border px-3 py-2 rounded text-sm" />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600">New Password</label>
                        <input type="password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} className="mt-1 block w-full border px-3 py-2 rounded text-sm" />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600">Confirm Password</label>
                        <input type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} className="mt-1 block w-full border px-3 py-2 rounded text-sm" />
                      </div>
                      <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                      <div>Password rules:</div>
                      <ul className="list-disc ml-5">
                        <li>Lowercase letter</li>
                        <li>Uppercase letter</li>
                        <li>Number</li>
                        <li>Special character</li>
                        <li>Minimum 8 characters</li>
                      </ul>
                    </div>
                    {pwMessage && <div className="text-sm text-green-600">{pwMessage}</div>}
                    <div>
                      <button className="bg-orange-600 text-white px-4 py-2 rounded">UPDATE PASSWORD</button>
                    </div>
                  </form>
                </section>

                <section className="mb-8">
                  <h3 className="font-semibold mb-3">CHANGE EMAIL</h3>
                    <form onSubmit={handleChangeEmail} className="space-y-3 max-w-2xl">
                      <div>
                        <label className="block text-sm text-gray-600">Current Email</label>
                        <input value={currentEmail} onChange={(e)=>setCurrentEmail(e.target.value)} className="mt-1 block w-full border px-3 py-2 rounded text-sm" />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600">New Email</label>
                        <input value={newEmail} onChange={(e)=>setNewEmail(e.target.value)} className="mt-1 block w-full border px-3 py-2 rounded text-sm" />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600">Confirm Email</label>
                        <input value={confirmEmail} onChange={(e)=>setConfirmEmail(e.target.value)} className="mt-1 block w-full border px-3 py-2 rounded text-sm" />
                      </div>
                      {emailMsg && <div className="text-sm text-green-600">{emailMsg}</div>}
                      <div>
                        <button className="bg-orange-600 text-white px-4 py-2 rounded">UPDATE EMAIL</button>
                      </div>
                    </form>
                </section>

                <section>
                  <h3 className="font-semibold mb-3">SECURITY QUESTION</h3>
                  <form onSubmit={handleUpdateSecurity} className="space-y-3 max-w-2xl">
                    <div>
                      <label className="block text-sm text-gray-600">Security Question</label>
                      <select value={securityQuestion} onChange={(e)=>setSecurityQuestion(e.target.value)} className="mt-1 block w-full border px-3 py-2 rounded text-sm">
                        <option value="">Select</option>
                        <option value="mother_maiden">What is your mother's maiden name?</option>
                        <option value="first_pet">What was the name of your first pet?</option>
                        <option value="first_school">What was your first school?</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600">Answer</label>
                      <input value={securityAnswer} onChange={(e)=>setSecurityAnswer(e.target.value)} className="mt-1 block w-full border px-3 py-2 rounded text-sm" />
                    </div>
                    {secMsg && <div className="text-sm text-green-600">{secMsg}</div>}
                    <div>
                      <button className="bg-orange-600 text-white px-4 py-2 rounded">UPDATE SECURITY QUESTION</button>
                    </div>
                  </form>
                </section>
              </div>
            )}

            {tab === 'address' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">ADDRESS BOOK</h2>
                <div className="flex justify-end mb-4">
                  <button onClick={addAddress} className="bg-orange-600 text-white px-3 py-2">ADD NEW</button>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">PERSONAL</h3>
                  <div className="mb-4 text-sm text-gray-500">No personal addresses on file.</div>

                  <h3 className="font-semibold mb-2">BUSINESS</h3>
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-2 text-left">Edit</th>
                        <th className="p-2 text-left">Delete</th>
                        <th className="p-2 text-left">Street</th>
                        <th className="p-2 text-left">City</th>
                        <th className="p-2 text-left">State</th>
                        <th className="p-2 text-left">Zip</th>
                        <th className="p-2 text-left">Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {addresses.map(a => (
                        <tr key={a.id} className="border-t">
                          <td className="p-2">
                            <button onClick={() => updateAddress(a.id, {})} className="text-blue-600">✎</button>
                          </td>
                          <td className="p-2">
                            <button onClick={() => deleteAddress(a.id)} className="text-red-600">✖</button>
                          </td>
                          <td className="p-2">
                            <input value={a.street} onChange={(e)=>updateAddress(a.id,{street:e.target.value})} className="w-full border px-1 py-1 text-sm" />
                          </td>
                          <td className="p-2"><input value={a.city} onChange={(e)=>updateAddress(a.id,{city:e.target.value})} className="w-full border px-1 py-1 text-sm" /></td>
                          <td className="p-2"><input value={a.state} onChange={(e)=>updateAddress(a.id,{state:e.target.value})} className="w-full border px-1 py-1 text-sm" /></td>
                          <td className="p-2"><input value={a.zip} onChange={(e)=>updateAddress(a.id,{zip:e.target.value})} className="w-full border px-1 py-1 text-sm" /></td>
                          <td className="p-2"><input value={a.type} onChange={(e)=>updateAddress(a.id,{type:e.target.value})} className="w-full border px-1 py-1 text-sm" /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {tab === 'phone' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">PHONE BOOK</h2>
                <div className="flex justify-end mb-4">
                  <button onClick={addPhone} className="bg-orange-600 text-white px-3 py-2">ADD NEW</button>
                </div>
                <h3 className="font-semibold mb-2">PERSONAL</h3>
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2">Edit</th>
                      <th className="p-2">Delete</th>
                      <th className="p-2">Phone</th>
                      <th className="p-2">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {phones.map(pn => (
                      <tr key={pn.id} className="border-t">
                        <td className="p-2"><button onClick={() => updatePhone(pn.id, {})} className="text-blue-600">✎</button></td>
                        <td className="p-2"><button onClick={() => deletePhone(pn.id)} className="text-red-600">✖</button></td>
                        <td className="p-2"><input value={pn.phone} onChange={(e)=>updatePhone(pn.id,{phone:e.target.value})} className="w-full border px-1 py-1 text-sm" /></td>
                        <td className="p-2"><input value={pn.type} onChange={(e)=>updatePhone(pn.id,{type:e.target.value})} className="w-full border px-1 py-1 text-sm" /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <h3 className="font-semibold mt-6 mb-2">BUSINESS</h3>
                <div className="text-sm text-gray-500">No business phones on file.</div>
              </div>
            )}

            {tab === 'allowance' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">ALLOWANCE TRACKING</h2>
                <div className="mb-6">
                  <div className="bg-gray-50 border p-4 rounded text-sm">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <div className="text-gray-500">Total</div>
                        <div className="font-semibold">$999.99</div>
                      </div>
                      <div className="text-center">
                        <div className="text-gray-500">Used</div>
                        <div className="font-semibold">$0.00</div>
                      </div>
                      <div className="text-center">
                        <div className="text-gray-500">Available</div>
                        <div className="font-semibold">$999.99</div>
                      </div>
                    </div>
                  </div>
                </div>

                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2 text-left">Date</th>
                      <th className="p-2 text-left">Transaction Type</th>
                      <th className="p-2 text-left">Order #</th>
                      <th className="p-2 text-left">Amount</th>
                      <th className="p-2 text-left">Balance</th>
                      <th className="p-2 text-left">Transaction #</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((t, idx) => (
                      <tr key={idx} className="border-t">
                        <td className="p-2">{t.date}</td>
                        <td className="p-2">{t.type}</td>
                        <td className="p-2">{t.order}</td>
                        <td className="p-2">{t.amount}</td>
                        <td className="p-2">{t.balance}</td>
                        <td className="p-2">{t.tx}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

              </div>
            )}

            {tab === 'orders' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">ORDER HISTORY</h2>
                <div className="mb-4">
                  <form className="grid grid-cols-12 gap-3 items-end text-sm">
                    <div className="col-span-12 sm:col-span-6 md:col-span-5">
                      <label className="block text-xs text-gray-500">Order Date</label>
                      <input className="mt-1 block w-full border px-3 py-2 rounded text-sm" />
                    </div>
                    <div className="col-span-12 sm:col-span-6 md:col-span-4">
                      <label className="block text-xs text-gray-500">TO</label>
                      <input className="mt-1 block w-full border px-3 py-2 rounded text-sm" />
                    </div>
                    <div className="col-span-12 sm:col-span-6 md:col-span-2">
                      <label className="block text-xs text-gray-500">Order #</label>
                      <input className="mt-1 block w-full border px-3 py-2 rounded text-sm" />
                    </div>
                    <div className="col-span-12 sm:col-span-6 md:col-span-1 flex items-center md:items-end">
                      <button className="w-full md:w-auto bg-blue-600 text-white px-3 py-2 rounded text-sm whitespace-nowrap">SEARCH</button>
                    </div>
                  </form>
                </div>

                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-3 text-left">Order#</th>
                      <th className="p-3 text-center">Cust PO</th>
                      <th className="p-3 text-center">Username</th>
                      <th className="p-3 text-center">Date</th>
                      <th className="p-3 text-center">Status</th>
                      <th className="p-3 text-right">Total</th>
                      <th className="p-3 text-center">View</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(o => (
                      <tr key={o.id} className="border-t">
                        <td className="p-3">{o.id}</td>
                        <td className="p-3 text-center">ALLOWANCE</td>
                        <td className="p-3 text-center">{o.username}</td>
                        <td className="p-3 text-center">{o.date}</td>
                        <td className="p-3 text-center">{o.status}</td>
                        <td className="p-3 text-right">{o.total}</td>
                        <td className="p-3 text-center"><button className="bg-blue-600 text-white px-3 py-1 rounded">View Order</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>

              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}

export default MyAccountPage;
