import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api/axios";

import Navbar from "../components/Navbar";

function CreateTicket() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    subject: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================================
  // SUBMIT FORM
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await API.post(
        "/tickets",
        formData
      );

      alert(
        `Ticket Created Successfully\nTicket ID: ${response.data.ticket_id}`
      );

      navigate("/");
    } catch (error) {
      console.error(error);

      alert("Failed to create ticket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-3xl mx-auto p-6">

        <div className="bg-white border border-slate-200 rounded-2xl p-8">

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800">
              Create New Ticket
            </h1>

            <p className="text-slate-500 mt-2">
              Submit a new customer support request.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* CUSTOMER NAME */}

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Customer Name
              </label>

              <input
                type="text"
                name="customer_name"
                placeholder="John Doe"
                value={formData.customer_name}
                onChange={handleChange}
                required
                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-300"
              />
            </div>

            {/* CUSTOMER EMAIL */}

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Customer Email
              </label>

              <input
                type="email"
                name="customer_email"
                placeholder="john@example.com"
                value={formData.customer_email}
                onChange={handleChange}
                required
                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-300"
              />
            </div>

            {/* SUBJECT */}

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Subject
              </label>

              <input
                type="text"
                name="subject"
                placeholder="Unable to login"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-300"
              />
            </div>

            {/* DESCRIPTION */}

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Description
              </label>

              <textarea
                rows="6"
                name="description"
                placeholder="Describe the issue..."
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-300 resize-none"
              />
            </div>

            {/* SUBMIT BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white py-3 rounded-xl font-medium hover:bg-slate-700 transition disabled:opacity-50"
            >
              {loading
                ? "Creating Ticket..."
                : "Create Ticket"}
            </button>

          </form>

        </div>

      </div>
    </>
  );
}

export default CreateTicket;