import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        <Link
          to="/"
          className="text-2xl font-bold text-slate-800"
        >
          Support CRM
        </Link>

        <Link
          to="/create"
          className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition"
        >
          New Ticket
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;