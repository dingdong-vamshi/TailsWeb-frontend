import { useState } from "react"
import AssignmentList from "./AssignmentList";

export default function TeacherDashboard() {
    const [title1, setTitle1] = useState('')
    const [d, setD] = useState('')
    const [dt, setDt] = useState('')

    const createA = async () => {
        let tok = localStorage.getItem('tok');
        await fetch('http://localhost:5000/assignment/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + tok
            },
            body: JSON.stringify({
                title: title1,
                description: d,
                dueDate: dt
            })
        });
        alert('created');
        window.location.reload();
    }

    const logout = () => {
        localStorage.removeItem('tok');
        window.location.href = '/';
    }

    return (
        <div className="p-5">
            <h1 className="text-2xl mb-5">Teacher Area <button className="text-sm bg-red-400 p-1" onClick={logout}>Logout</button></h1>

            <div className="border p-3 mb-5 max-w-md bg-white">
                <h3 className="font-bold">Create New Assignment</h3>
                Title: <input className="border block w-full mb-1" value={title1} onChange={e => setTitle1(e.target.value)}/>
                Desc: <input className="border block w-full mb-1" value={d} onChange={e => setD(e.target.value)}/>
                Date: <input className="border block w-full mb-2" value={dt} onChange={e => setDt(e.target.value)}/>
                <button className="bg-green-500 p-1 text-white" onClick={createA}>Create</button>
            </div>
            
            <AssignmentList role="teacher" />
        </div>
    )
}
