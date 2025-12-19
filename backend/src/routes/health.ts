import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();
const dataPath = path.join(__dirname, '..', 'data');
const healthRecordsFilePath = path.join(dataPath, 'health-records.json');

router.get('/', (req, res) => {
  fs.readFile(healthRecordsFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading health records' });
    }
    res.json(JSON.parse(data));
  });
});

router.post('/', (req, res) => {
  const newRecord = req.body;
  fs.readFile(healthRecordsFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading health records' });
    }
    const records = JSON.parse(data);
    records.push(newRecord);
    fs.writeFile(healthRecordsFilePath, JSON.stringify(records, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error writing health records' });
      }
      res.status(201).json(newRecord);
    });
  });
});

export default router;
