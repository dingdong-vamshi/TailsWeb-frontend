import { useState } from 'react';

export default function LoginPage() {
    const [e, setE] = useState('');
    const [p, setP] = useState('');

    const loginFun = async () => {
        let res = await fetch('http://localhost:5000/login', {
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
        }
    }

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold mb-4">Login Pls</h1>
            <div className="flex border p-4 flex-col w-[300px] bg-white">
                <input className="border mb-2 p-1" type="text" placeholder="email" value={e} onChange={(x) => setE(x.target.value)} />
                <input className="border mb-2 p-1" type="password" placeholder="pass" value={p} onChange={(x) => setP(x.target.value)} />
                <button className="bg-blue-500 text-white p-1" onClick={loginFun}>Submit</button>
            </div>
            <br/>
            <p className="text-sm">P.S. go to localhost:5000/initdb to create dummy users first</p>
        </div>
    )
}
