import { useEffect, useState } from "react"
import { API } from './config';

export default function AssignmentList({role}) {
    const [aList, setAList] = useState([]);
    const [ans, setAns] = useState({});
    const [subs, setSubs] = useState({});

    useEffect(() => {
        loadStuff();
    }, []);

    const loadStuff = async () => {
        let tok = localStorage.getItem('tok');
        let res = await fetch(API + '/assignment', {
            headers: {'Authorization': 'Bearer ' + tok}
        });
        let data1 = await res.json();
        setAList(data1);
    }

    const pub = async (id) => {
        let tok = localStorage.getItem('tok');
        await fetch(API + '/assignment/publish', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + tok
            },
            body: JSON.stringify({id: id})
        });
        loadStuff();
    }

    const del = async (id) => {
        let tok = localStorage.getItem('tok');
        await fetch(API + '/assignment/delete/' + id, {
            method: 'DELETE',
            headers: {'Authorization': 'Bearer ' + tok}
        });
        loadStuff();
    }

    const subAnswer = async (aid) => {
        let text123 = ans[aid];
        let tok = localStorage.getItem('tok');
        let r = await fetch(API + '/submission', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + tok
            },
            body: JSON.stringify({assignmentId: aid, answer: text123})
        });
        if(r.ok) {
            alert('submitted yay');
            loadStuff();
        } else {
            alert('error or already submitted');
        }
    }

    const vSub = async (aid) => {
        let tok = localStorage.getItem('tok');
        let res = await fetch(API + '/submission/' + aid, {
            headers: {'Authorization': 'Bearer ' + tok}
        });
        let val = await res.json();
        setSubs({...subs, [aid]: val});
    }

    const statusColor = (s) => {
        if(s === 'Draft') return 'bg-yellow-100 text-yellow-700';
        if(s === 'Published') return 'bg-green-100 text-green-700';
        return 'bg-gray-100 text-gray-600';
    }

    return (
        <div>
            <h2 className="font-bold text-xl mb-4 text-gray-700">Assignments ({aList.length})</h2>
            
            {aList.length === 0 && <p className="text-gray-400 text-sm">No assignments yet...</p>}
            
            <div className="grid gap-3 max-w-2xl">
                {aList.map(a => (
                    <div key={a._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-gray-800">{a.title}</h3>
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor(a.status)}`}>{a.status}</span>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">{a.description}</p>
                        <p className="text-xs text-gray-400 mb-3">Due: {a.dueDate || 'No date'}</p>
                        
                        {role === 'teacher' && a.status === 'Draft' && (
                            <div className="flex gap-2">
                                <button className="bg-indigo-500 hover:bg-indigo-600 text-white text-xs px-3 py-1 rounded-lg transition" onClick={() => pub(a._id)}>Publish</button>
                                <button className="bg-red-400 hover:bg-red-500 text-white text-xs px-3 py-1 rounded-lg transition" onClick={() => del(a._id)}>Delete</button>
                            </div>
                        )}

                        {role === 'teacher' && a.status !== 'Draft' && (
                            <div className="mt-2">
                                <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs px-3 py-1 rounded-lg transition" onClick={() => vSub(a._id)}>View Submissions</button>
                                {subs[a._id] && (
                                    <div className="mt-2 space-y-1">
                                        {subs[a._id].length === 0 && <p className="text-xs text-gray-400">No submissions yet</p>}
                                        {subs[a._id].map(s => (
                                            <div key={s._id} className="bg-gray-50 rounded-lg p-2 text-sm">
                                                <span className="text-gray-500 text-xs">Student {s.studentId.slice(-5)}:</span>
                                                <p className="text-gray-700">{s.answer}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {role === 'student' && (
                            <div className="mt-2 border-t pt-3">
                                <textarea placeholder="Type your answer here..." className="border border-gray-300 rounded-lg w-full p-2 mb-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400" rows="2" value={ans[a._id] || ''} onChange={(e) => setAns({...ans, [a._id]: e.target.value})} />
                                <button className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded-lg transition" onClick={() => subAnswer(a._id)}>Submit Answer</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
