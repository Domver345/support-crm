import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import API from "../api/axios";

import Navbar from "../components/Navbar";
import StatusBadge from "../components/Statusbadge";

function TicketDetails() {
  const { ticket_id } = useParams();

  const [ticket, setTicket] = useState(null);
  const [notes, setNotes] = useState([]);

  const [status, setStatus] = useState("");
  const [noteText, setNoteText] = useState("");

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // ==========================================
  // FETCH SINGLE TICKET
  // ==========================================

  const fetchTicket = async () => {
    try {
      setLoading(true);

      const response = await API.get(`/tickets/${ticket_id}`);

      setTicket(response.data.ticket);
      setNotes(response.data.notes);

      setStatus(response.data.ticket.status);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTicket();
  }, [ticket_id]);

  // ==========================================
  // UPDATE TICKET
  // ==========================================

  const handleUpdate = async () => {
    try {
      setUpdating(true);

      await API.put(`/tickets/${ticket_id}`, {
        status,
        note_text: noteText,
      });

      setNoteText("");

      await fetchTicket();

      alert("Ticket updated successfully");
    } catch (error) {
      console.error(error);

      alert("Failed to update ticket");
    } finally {
      setUpdating(false);
    }
  };

  // ==========================================
  // LOADING STATE
  // ==========================================

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-white rounded-2xl p-8 border border-slate-200">
            <p className="text-slate-500">
              Loading ticket...
            </p>
          </div>
        </div>
      </>
    );
  }

  // ==========================================
  // NOT FOUND
  // ==========================================

  if (!ticket) {
    return (
      <>
        <Navbar />

        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-white rounded-2xl p-8 border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              Ticket not found
            </h2>

            <Link
              to="/"
              className="text-blue-600 hover:underline"
            >
              Go back
            </Link>
          </div>
        </div>
      </>
    );
  }

  // ==========================================
  // MAIN UI
  // ==========================================

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto p-6">

        {/* HEADER */}

        <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-6">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>
              <p className="text-sm text-slate-400 mb-2">
                {ticket.ticket_id}
              </p>

              <h1 className="text-3xl font-bold text-slate-800">
                {ticket.subject}
              </h1>
            </div>

            <StatusBadge status={ticket.status} />

          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-6">

            <div>
              <p className="text-sm text-slate-400 mb-1">
                Customer Name
              </p>

              <p className="text-slate-700 font-medium">
                {ticket.customer_name}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-400 mb-1">
                Customer Email
              </p>

              <p className="text-slate-700 font-medium">
                {ticket.customer_email}
              </p>
            </div>

          </div>

          <div className="mt-8">
            <p className="text-sm text-slate-400 mb-2">
              Description
            </p>

            <div className="bg-slate-50 rounded-xl p-5 text-slate-700 leading-relaxed">
              {ticket.description}
            </div>
          </div>

        </div>

        {/* UPDATE SECTION */}

        <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-6">

          <h2 className="text-xl font-semibold text-slate-800 mb-6">
            Update Ticket
          </h2>

          <div className="space-y-5">

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Status
              </label>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-300"
              >
                <option value="Open">Open</option>
                <option value="In Progress">
                  In Progress
                </option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Add Note
              </label>

              <textarea
                rows="5"
                placeholder="Write a comment or update..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-300 resize-none"
              />
            </div>

            <button
              onClick={handleUpdate}
              disabled={updating}
              className="bg-slate-900 text-white px-6 py-3 rounded-xl hover:bg-slate-700 transition disabled:opacity-50"
            >
              {updating ? "Updating..." : "Update Ticket"}
            </button>

          </div>

        </div>

        {/* NOTES SECTION */}

        <div className="bg-white rounded-2xl border border-slate-200 p-8">

          <h2 className="text-xl font-semibold text-slate-800 mb-6">
            Notes & Activity
          </h2>

          {notes.length === 0 ? (
            <p className="text-slate-500">
              No notes added yet.
            </p>
          ) : (
            <div className="space-y-4">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="border border-slate-200 rounded-xl p-5"
                >
                  <p className="text-slate-700">
                    {note.note_text}
                  </p>

                  <p className="text-sm text-slate-400 mt-3">
                    {new Date(note.created_at).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </>
  );
}

export default TicketDetails;