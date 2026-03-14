import AssignmentList from "./AssignmentList";

export default function StudentDashboard() {
    const logout = () => {
        localStorage.removeItem('tok');
        window.location.href = '/';
    }

    return (
        <div className="p-5">
            <h1 className="text-2xl mb-5">Student Area <button className="text-sm bg-red-400 p-1" onClick={logout}>Logout</button></h1>
            <AssignmentList role="student" />
        </div>
    )
}
