import { useState } from "react"
import AssignmentList from "./AssignmentList";
import { API } from './config';

export default function TeacherDashboard() {
    const [title1, setTitle1] = useState('')
    const [d, setD] = useState('')
    const [dt, setDt] = useState('')

    const createA = async () => {
        let tok = localStorage.getItem('tok');
        await fetch(API + '/assignment/create', {
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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-indigo-800">📋 Teacher Dashboard</h1>
                <button className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-lg transition" onClick={logout}>Logout</button>
            </div>

            <div className="bg-white rounded-xl shadow p-5 mb-6 max-w-lg">
                <h3 className="font-bold text-lg text-gray-700 mb-3">Create New Assignment</h3>
                
                <label className="block text-sm font-medium text-gray-500 mb-1">Title</label>
                <input className="border border-gray-300 rounded-lg block w-full p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-400" value={title1} onChange={e => setTitle1(e.target.value)} placeholder="Assignment title"/>
                
                <label className="block text-sm font-medium text-gray-500 mb-1">Description</label>
                <textarea className="border border-gray-300 rounded-lg block w-full p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none" rows="3" value={d} onChange={e => setD(e.target.value)} placeholder="What is this assignment about?"/>
                
                <label className="block text-sm font-medium text-gray-500 mb-1">Due Date</label>
                <input type="date" className="border border-gray-300 rounded-lg block w-full p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400" value={dt} onChange={e => setDt(e.target.value)}/>
                
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition" onClick={createA}>+ Create Assignment</button>
            </div>
            
            <AssignmentList role="teacher" />
        </div>
    )
}
