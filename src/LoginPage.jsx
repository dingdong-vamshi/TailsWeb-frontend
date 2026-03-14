import { useState } from 'react';

export default function LoginPage() {
    const [e, setE] = useState('');
    const [p, setP] = useState('');
    const [loading, setLoading] = useState(false);

    const loginFun = async () => {
        setLoading(true);
        let res = await fetch('http://localhost:5001/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: e, password: p})
        });
        let data1 = await res.json();
        
        if(data1.token) {
            localStorage.setItem('tok', data1.token);
            if(data1.role == 'teacher') {
                window.location.href = '/teacher';
            } else {
                window.location.href = '/student';
            }
        } else {
            alert('login fail');
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-lg p-8 w-[380px]">
                <h1 className="text-2xl font-bold text-center mb-1 text-indigo-700">📚 Assignment Portal</h1>
                <p className="text-center text-gray-400 text-sm mb-6">Login to continue</p>
                
                <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                <input className="border border-gray-300 rounded-lg w-full p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-400" type="text" placeholder="email@example.com" value={e} onChange={(x) => setE(x.target.value)} />
                
                <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
                <input className="border border-gray-300 rounded-lg w-full p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400" type="password" placeholder="••••••" value={p} onChange={(x) => setP(x.target.value)} />
                
                <button className="bg-indigo-600 hover:bg-indigo-700 transition text-white w-full p-2 rounded-lg font-medium" onClick={loginFun} disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>

                <div className="mt-4 text-xs text-gray-400 text-center">
                    <p>Teacher: teacher@test.com / 123</p>
                    <p>Student: student@test.com / 123</p>
                </div>
            </div>
        </div>
    )
}
