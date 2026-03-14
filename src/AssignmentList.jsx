import { useEffect, useState } from "react"

export default function AssignmentList({role}) {
    const [aList, setAList] = useState([]);
    const [ans, setAns] = useState({});
    const [subs, setSubs] = useState({});

    useEffect(() => {
        loadStuff();
    }, []);

    const loadStuff = async () => {
        let tok = localStorage.getItem('tok');
        let res = await fetch('http://localhost:5000/assignment', {
            headers: {'Authorization': 'Bearer ' + tok}
        });
        let data1 = await res.json();
        setAList(data1);
    }

    const pub = async (id) => {
        let tok = localStorage.getItem('tok');
        await fetch('http://localhost:5000/assignment/publish', {
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
        await fetch('http://localhost:5000/assignment/delete/' + id, {
            method: 'DELETE',
            headers: {'Authorization': 'Bearer ' + tok}
        });
        loadStuff();
    }

    const subAnswer = async (aid) => {
        let text123 = ans[aid];
        let tok = localStorage.getItem('tok');
        let r = await fetch('http://localhost:5000/submission', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + tok
            },
            body: JSON.stringify({assignmentId: aid, answer: text123})
        });
        if(r.ok) {
            alert('submitted yay');
        } else {
            alert('error or already submitted');
        }
    }

    const vSub = async (aid) => {
        let tok = localStorage.getItem('tok');
        let res = await fetch('http://localhost:5000/submission/' + aid, {
            headers: {'Authorization': 'Bearer ' + tok}
        });
        let val = await res.json();
        setSubs({...subs, [aid]: val});
    }

    return (
        <div>
            <h2 className="font-bold text-xl mb-3">Assignments ({aList.length})</h2>
            {aList.map(a => (
                <div key={a._id} className="border p-2 mb-2 bg-yellow-50 max-w-xl">
                    <p><b>{a.title}</b> ({a.status})</p>
                    <p className="text-sm">{a.description}</p>
                    <p className="text-xs text-gray-500">Due: {a.dueDate}</p>
                    
                    {role === 'teacher' && a.status === 'Draft' && (
                        <div>
                            <button className="bg-blue-400 p-1 mr-1 text-xs" onClick={() => pub(a._id)}>Publish</button>
                            <button className="bg-red-400 p-1 text-xs" onClick={() => del(a._id)}>Delete</button>
                        </div>
                    )}

                    {role === 'teacher' && a.status !== 'Draft' && (
                        <div className="mt-2 text-sm">
                            <button className="bg-gray-300 p-1 mb-1" onClick={() => vSub(a._id)}>View Submissions</button>
                            {subs[a._id] && subs[a._id].map(s => (
                                <div key={s._id} className="border-t pl-2">
                                    Student {s.studentId}: {s.answer}
                                </div>
                            ))}
                        </div>
                    )}

                    {role === 'student' && (
                        <div className="mt-2 text-sm border-t pt-2">
                            <input placeholder="type ans here" className="border w-full p-1 mb-1" value={ans[a._id] || ''} onChange={(e) => setAns({...ans, [a._id]: e.target.value})} />
                            <button className="bg-green-400 p-1" onClick={() => subAnswer(a._id)}>Submit Answer</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}
