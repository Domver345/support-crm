const express = require("express");
const router = express.Router();

const fs = require("fs");
const path = require("path");

const filePath = path.join(
  __dirname,
  "../data/tickets.json"
);

// ======================================
// HELPERS
// ======================================

const readTickets = () => {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};

const writeTickets = (tickets) => {
  fs.writeFileSync(
    filePath,
    JSON.stringify(tickets, null, 2)
  );
};

// ======================================
// CREATE TICKET
// ======================================

router.post("/", (req, res) => {
  try {
    const {
      customer_name,
      customer_email,
      subject,
      description,
    } = req.body;

    if (
      !customer_name ||
      !customer_email ||
      !subject ||
      !description
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const tickets = readTickets();

    const newTicket = {
      id: Date.now(),
      ticket_id: `TKT-${Date.now()}`,
      customer_name,
      customer_email,
      subject,
      description,
      status: "Open",
      notes: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    tickets.push(newTicket);

    writeTickets(tickets);

    res.status(201).json({
      success: true,
      ticket_id: newTicket.ticket_id,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create ticket",
    });
  }
});

// ======================================
// GET ALL TICKETS
// ======================================

router.get("/", (req, res) => {
  try {
    const { status, search } = req.query;

    let tickets = readTickets();

    // Filter status
    if (status) {
      tickets = tickets.filter(
        (ticket) => ticket.status === status
      );
    }

    // Search
    if (search) {
      const term = search.toLowerCase();

      tickets = tickets.filter((ticket) =>
        ticket.ticket_id
          .toLowerCase()
          .includes(term) ||
        ticket.customer_name
          .toLowerCase()
          .includes(term) ||
        ticket.customer_email
          .toLowerCase()
          .includes(term) ||
        ticket.subject
          .toLowerCase()
          .includes(term) ||
        ticket.description
          .toLowerCase()
          .includes(term)
      );
    }

    res.json({
      success: true,
      tickets,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch tickets",
    });
  }
});

// ======================================
// GET SINGLE TICKET
// ======================================

router.get("/:ticket_id", (req, res) => {
  try {
    const { ticket_id } = req.params;

    const tickets = readTickets();

    const ticket = tickets.find(
      (t) => t.ticket_id === ticket_id
    );

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    res.json({
      success: true,
      ticket,
      notes: ticket.notes || [],
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch ticket",
    });
  }
});

// ======================================
// UPDATE TICKET
// ======================================

router.put("/:ticket_id", (req, res) => {
  try {
    const { ticket_id } = req.params;
    const { status, note_text } = req.body;

    const tickets = readTickets();

    const ticketIndex = tickets.findIndex(
      (t) => t.ticket_id === ticket_id
    );

    if (ticketIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    tickets[ticketIndex].status = status;
    tickets[ticketIndex].updated_at =
      new Date().toISOString();

    if (note_text && note_text.trim() !== "") {
      tickets[ticketIndex].notes.push({
        id: Date.now(),
        note_text,
        created_at: new Date().toISOString(),
      });
    }

    writeTickets(tickets);

    res.json({
      success: true,
      message: "Ticket updated successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update ticket",
    });
  }
});

// ======================================
// DELETE TICKET
// ======================================

router.delete("/:ticket_id", (req, res) => {
  try {
    const { ticket_id } = req.params;

    let tickets = readTickets();

    tickets = tickets.filter(
      (t) => t.ticket_id !== ticket_id
    );

    writeTickets(tickets);

    res.json({
      success: true,
      message: "Ticket deleted successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete ticket",
    });
  }
});

module.exports = router;