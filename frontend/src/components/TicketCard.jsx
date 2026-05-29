import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge.jsx";

function TicketCard({ ticket }) {
  return (
    <Link
      to={`/ticket/${ticket.ticket_id}`}
      className="block bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg transition"
    >
      <div className="flex justify-between items-start">
        
        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            {ticket.subject}
          </h2>

          <p className="text-slate-500 mt-1">
            {ticket.customer_name}
          </p>

          <p className="text-sm text-slate-400 mt-2">
            {ticket.ticket_id}
          </p>
        </div>

        <StatusBadge status={ticket.status} />
      </div>
    </Link>
  );
}

export default TicketCard;