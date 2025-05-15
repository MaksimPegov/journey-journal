import express, { json } from 'express';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// GET /journeys - get all journeys
// response: [{ id, title, distance, dataAndTime }]
app.get('/journeys', async (_req, res) => {
  try {
    const result = await pool.query(
      'SELECT title, distance, dataAndTime FROM journeys ORDER BY id DESC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch journeys: ', err });
  }
});

// POST /journeys - create a new journey
// request body: { title, distance, dataAndTime }
// response: { id, title, distance, dataAndTime }
app.post('/journeys', async (req, res) => {
  const { title, distance, dataAndTime } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO journeys (title, distance, dataAndTime) VALUES ($1, $2, $3) RETURNING *',
      [title, distance, dataAndTime]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create journey: ', err });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Journeys API running at http://localhost:${port}`);
});