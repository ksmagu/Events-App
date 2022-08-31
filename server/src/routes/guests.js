const express = require('express');
const Joi = require('joi');
const mysql = require('mysql2/promise');
const DB_CONFIG = require('../../config');

const router = express.Router();

const updateSchema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
  name: Joi.string(),
  surname: Joi.string(),
  DOB: Joi.string(),
});

const registerSchema = Joi.object({
  events_id: Joi.number().required(),
  name: Joi.string().required(),
  surname: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
  DOB: Joi.string().required(),
});

router.get('/guests', async (req, res) => {
  try {
    const con = await mysql.createConnection(DB_CONFIG);
    const [rows] = await con.query(
      'SELECT * from finalexam.events JOIN finalexam.guests ON finalexam.events.id = finalexam.guests.events_id',
    );
    await con.end();
    return res.json(rows);
  } catch (err) {
    return res.status(500).json({
      status: 500,
      err,
    });
  }
});

// Get specific guest
router.get('/guest/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const con = await mysql.createConnection(DB_CONFIG);
    const [[rows]] = await con.query(
      `SELECT * from finalexam.guests WHERE id=${Number(id)}`,
    );
    await con.end();
    return res.json(rows || {});
  } catch (err) {
    return res.status(500).json({
      status: 500,
      err,
    });
  }
});

// Delete guest
router.delete('/guest/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const con = await mysql.createConnection(DB_CONFIG);
    const [resp] = await con.query(
      `DELETE FROM finalexam.guests WHERE id="${Number(id)}"`,
    );
    await con.end();
    return res.json(resp);
  } catch (err) {
    return res.status(500).json({
      status: 500,
      err,
    });
  }
});

// Update guest Information
router.patch('/guest/:id', async (req, res) => {
  const { id } = req.params;
  const { email, name, surname, DOB } = req.body;
  try {
    try {
      await updateSchema.validateAsync({ email, name, surname, DOB });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        err,
      });
    }

    const userData = {};
    if (email) userData.email = email;
    if (name) userData.name = name;
    if (surname) userData.surname = surname;
    if (DOB) userData.DOB = DOB;
    const con = await mysql.createConnection(DB_CONFIG);
    const [resp] = await con.query(
      `UPDATE finalexam.guests SET ? WHERE id="${Number(id)}"`,
      userData,
    );
    await con.end();
    return res.json(resp);
  } catch (err) {
    return res.status(500).json({
      status: 500,
      err,
    });
  }
});

// Register guest to the event
router.post('/register', async (req, res) => {
  const { events_id, name, surname, email, DOB } = req.body;
  try {
    try {
      await registerSchema.validateAsync({ events_id, name, surname, email, DOB });
    } catch (err) {
      return res.status(400).json(err);
    }
    const con = await mysql.createConnection(DB_CONFIG);
    const [rows] = await con.query(
      `SELECT * from finalexam.guests WHERE email="${email}"`,
    );
    if (rows.length > 0) {
      return res.status(400).json({ status: 400, err: 'Bad email!' });
    }
    const [resp] = await con.query('INSERT INTO finalexam.guests SET ?', {
      events_id,
      name,
      surname,
      email,
      DOB,
    });
    await con.end();
    return res.json(resp);
  } catch (err) {
    return res.status(500).json({
      status: 500,
      err,
    });
  }
});

module.exports = router;
