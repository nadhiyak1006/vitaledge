import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();
const dataPath = path.join(__dirname, '..', 'data');
const profileFilePath = path.join(dataPath, 'profile.json');

router.get('/', (req, res) => {
  fs.readFile(profileFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading profile data' });
    }
    res.json(JSON.parse(data));
  });
});

router.post('/', (req, res) => {
  const newProfile = req.body;
  fs.writeFile(profileFilePath, JSON.stringify(newProfile, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error writing profile data' });
    }
    res.status(201).json(newProfile);
  });
});

router.put('/', (req, res) => {
    const updatedProfile = req.body;
    fs.writeFile(profileFilePath, JSON.stringify(updatedProfile, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error writing profile data' });
      }
      res.json(updatedProfile);
    });
  });

export default router;
