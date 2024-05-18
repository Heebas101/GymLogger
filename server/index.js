const express = require('express');
const app = express();
require('dotenv').config();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

//add an exercise
app.post('/api/create/:tablename', (req, res) => {
  const { exercise, sets, reps, weight } = req.body;
  const { tablename } = req.params;

  db.query(
    `INSERT INTO ${tablename} (exercise, sets, reps, weight) VALUES (?, ?, ?, ?)`,
    [exercise, sets, reps, weight],
    (err, result) => {
      if (err) {
        console.error('Error creating exercise:', err);
        res.status(500).send('Error creating exercise');
      } else {
        res.status(201).send('Exercise created successfully');
      }
    }
  );
});



//Get exercises
app.get('/api/tables/demo', (req, res) => {
  const { tableName } = req.params;
  db.query(`SELECT * FROM ${tableName}`, (err, result) => {
    if (err) {
      console.error('Error fetching exercises:', err);
      res.status(500).send('Error fetching exercises');
    } else {
      res.status(200).send(result);
    }
  });
});




//delete exercise
app.delete('/api/tables/:tableName/delete/:id', (req, res) => {
  const { id, tableName } = req.params;

  db.query(`DELETE FROM ${tableName} WHERE id = ?`, [id], (err, result) => {
    if (err) {
      console.error('Error deleting exercise:', err);
      res.status(500).send('Error deleting exercise');
    } else if (result.affectedRows === 0) {
      res.status(404).send('Exercise not found');
    } else {
      res.status(200).send('Exercise deleted successfully');
    }
  });
});


//Retrieving all table names 
app.get('/api/tables', (req, res) => {
  // Query to show all tables
  db.query('SHOW TABLES', (err, result) => {
    if (err) {
      console.error('Error fetching tables:', err);
      res.status(500).send('Error fetching tables');
      return;
    }
    // Extract table names from result
    const tables = result.map(row => row[`Tables_in_${db.config.database}`]);
    res.json(tables); // Send table names as JSON response
  });
});

//Create new Table
app.post('/api/newWorkout/:tablename', (req, res) => {
  const tableName = req.body.tableName; 
  const sql = `CREATE TABLE ${tableName} (id INT AUTO_INCREMENT PRIMARY KEY, Exercise VARCHAR(100), Sets INT, Reps VARCHAR(40), Weight VARCHAR(40))`;
  console.log("creating new table")
  db.query(sql, (err, result) => {
      if (err) {
          console.error('Error creating table:', err);
          return res.status(500).json({ error: 'An error occurred while creating the table.' });
      }
      console.log('Table created successfully');
      return res.status(200).send('Exercise deleted successfully');
  });
});

// Update exercise
app.put('/api/tables/:tableName/edit/:id', (req, res) => {
  const { id, tableName } = req.params;
  const { exercise, sets, reps, weight } = req.body;
  
  db.query(
    `UPDATE ${tableName} SET exercise = ?, sets = ?, reps = ?, weight = ? WHERE id = ?`,
    [exercise, sets, reps, weight, id],
    (err, result) => {
      if (err) {
        console.error('Error updating exercise:', err);
        res.status(500).send('Error updating exercise');
        console.log(req.body);
      } else if (result.affectedRows === 0) {
        res.status(404).send('Exercise not found');
      } else {
        res.status(200).send('Exercise updated successfully');
      }
    }
  );
});


const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running and listening on port ${port}`);
});
