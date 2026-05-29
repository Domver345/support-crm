import { useEffect, useState } from "react";

import API from "../api/axios";

import Navbar from "../components/Navbar";
import TicketCard from "../components/TicketCard";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";

function Home() {
  const [tickets, setTickets] = useState([]);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [loading, setLoading] = useState(true);

  // ==========================================
  // FETCH TICKETS
  // ==========================================

  const fetchTickets = async () => {
    try {
      setLoading(true);

      const response = await API.get("/tickets", {
        params: {
          search,
          status,
        },
      });

      setTickets(response.data.tickets);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [search, status]);

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">

        {/* HEADER */}

        <div className="mb-8">

          <h1 className="text-4xl font-bold text-slate-800">
            Support Tickets
          </h1>

          <p className="text-slate-500 mt-2">
            Manage customer issues and track ticket status.
          </p>

        </div>

        {/* SEARCH + FILTER */}

        <SearchBar
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
        />

        {/* LOADING */}

        {loading ? (
          <Loader />
        ) : tickets.length === 0 ? (

          /* EMPTY STATE */

          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">

            <h2 className="text-2xl font-semibold text-slate-700 mb-2">
              No Tickets Found
            </h2>

            <p className="text-slate-500">
              Try changing your search or filters.
            </p>

          </div>

        ) : (

          /* TICKETS */

          <div className="grid gap-5">
            {tickets.map((ticket) => (
              <TicketCard
                key={ticket.ticket_id}
                ticket={ticket}
              />
            ))}
          </div>

        )}

      </div>
    </>
  );
}

export default Home;