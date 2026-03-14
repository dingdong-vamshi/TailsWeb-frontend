import AssignmentList from "./AssignmentList";

export default function StudentDashboard() {
    const logout = () => {
        localStorage.removeItem('tok');
        window.location.href = '/';
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-emerald-800">Student Dashboard</h1>
                <button className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-lg transition" onClick={logout}>Logout</button>
            </div>
            <p className="text-gray-500 text-sm mb-4">Submit your answers for published assignments below.</p>
            <AssignmentList role="student" />
        </div>
    )
}
