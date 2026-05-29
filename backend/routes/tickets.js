const express = require("express");
const router = express.Router();

const db = require("../database");

// ======================================================
// CREATE NEW TICKET
// POST /api/tickets
// ======================================================

router.post("/", (req, res) => {
  const {
    customer_name,
    customer_email,
    subject,
    description,
  } = req.body;

  // Validation
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

  // Generate Ticket ID
  const ticket_id = `TKT-${Date.now()}`;

  const sql = `
    INSERT INTO tickets (
      ticket_id,
      customer_name,
      customer_email,
      subject,
      description,
      status
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const values = [
    ticket_id,
    customer_name,
    customer_email,
    subject,
    description,
    "Open",
  ];

  db.run(sql, values, function (err) {
    if (err) {
      console.error(err);

      return res.status(500).json({
        success: false,
        message: "Failed to create ticket",
      });
    }

    res.status(201).json({
      success: true,
      ticket_id,
      created_at: new Date(),
    });
  });
});

// ======================================================
// GET ALL TICKETS
// GET /api/tickets
// Supports:
// ?status=Open
// ?search=suman
// ======================================================

router.get("/", (req, res) => {
  const { status, search } = req.query;

  let sql = `SELECT * FROM tickets WHERE 1=1`;
  let params = [];

  // Filter by status
  if (status) {
    sql += ` AND status = ?`;
    params.push(status);
  }

  // Search functionality
  if (search) {
    sql += `
      AND (
        ticket_id LIKE ?
        OR customer_name LIKE ?
        OR customer_email LIKE ?
        OR subject LIKE ?
        OR description LIKE ?
      )
    `;

    const searchValue = `%${search}%`;

    params.push(
      searchValue,
      searchValue,
      searchValue,
      searchValue,
      searchValue
    );
  }

  // Sort latest first
  sql += ` ORDER BY created_at DESC`;

  db.all(sql, params, (err, rows) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch tickets",
      });
    }

    res.json({
      success: true,
      tickets: rows,
    });
  });
});

// ======================================================
// GET SINGLE TICKET
// GET /api/tickets/:ticket_id
// ======================================================

router.get("/:ticket_id", (req, res) => {
  const { ticket_id } = req.params;

  const ticketSql = `
    SELECT * FROM tickets
    WHERE ticket_id = ?
  `;

  db.get(ticketSql, [ticket_id], (err, ticket) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch ticket",
      });
    }

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    // Fetch notes/comments
    const notesSql = `
      SELECT * FROM notes
      WHERE ticket_id = ?
      ORDER BY created_at DESC
    `;

    db.all(notesSql, [ticket_id], (err, notes) => {
      if (err) {
        console.error(err);

        return res.status(500).json({
          success: false,
          message: "Failed to fetch notes",
        });
      }

      res.json({
        success: true,
        ticket,
        notes,
      });
    });
  });
});

// ======================================================
// UPDATE TICKET
// PUT /api/tickets/:ticket_id
// ======================================================

router.put("/:ticket_id", (req, res) => {
  const { ticket_id } = req.params;
  const { status, note_text } = req.body;

  // Update ticket status
  const updateSql = `
    UPDATE tickets
    SET
      status = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE ticket_id = ?
  `;

  db.run(updateSql, [status, ticket_id], function (err) {
    if (err) {
      console.error(err);

      return res.status(500).json({
        success: false,
        message: "Failed to update ticket",
      });
    }

    // Optional note/comment
    if (note_text && note_text.trim() !== "") {
      const noteSql = `
        INSERT INTO notes (
          ticket_id,
          note_text
        )
        VALUES (?, ?)
      `;

      db.run(noteSql, [ticket_id, note_text], (err) => {
        if (err) {
          console.error(err);

          return res.status(500).json({
            success: false,
            message: "Status updated but failed to save note",
          });
        }

        return res.json({
          success: true,
          message: "Ticket updated successfully",
        });
      });
    } else {
      return res.json({
        success: true,
        message: "Ticket updated successfully",
      });
    }
  });
});

module.exports = router;