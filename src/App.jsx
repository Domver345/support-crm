import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import CreateTicket from "./pages/CreateTicket";
import TicketDetails from "./pages/TicketDetails";

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateTicket />} />
        <Route path="/ticket/:ticket_id" element={<TicketDetails />} />
      </Routes>
    </div>
  );
}

export default App;