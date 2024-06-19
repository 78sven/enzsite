import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

const app = express();
const port = 3001;

// Enable CORS
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from your Vite development server
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Serve static files
const baseDirectory = process.cwd();
const musicDirectory = path.join(baseDirectory, 'public', 'vocals');

app.use(express.static(path.join(baseDirectory, 'public')));

const getFilesRecursively = (directory) => {
  let files = [];
  fs.readdirSync(directory).forEach(file => {
    const absolutePath = path.join(directory, file);
    if (fs.statSync(absolutePath).isDirectory()) {
      files = files.concat(getFilesRecursively(absolutePath));
    } else if (path.extname(file) === '.mp3') {
      files.push(absolutePath.replace(musicDirectory, ''));
    }
  });
  return files;
};

app.get('/tracks', (req, res) => {
  const person = req.query.person;
  const personDirectory = path.join(musicDirectory, person);

  if (!fs.existsSync(personDirectory)) {
    return res.status(404).json({ error: 'Person not found' });
  }

  try {
    const files = getFilesRecursively(personDirectory);
    res.json(files);
  } catch (err) {
    console.error('Error reading directory:', err);
    res.status(500).json({ error: 'Failed to read directory' });
  }
});

// Serve audio files with proper CORS headers
app.get('/vocals/:person/:track', (req, res) => {
  const { person, track } = req.params;
  const filePath = path.join(musicDirectory, person, track);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send('Track not found');
  }

  res.setHeader('Content-Type', 'audio/mpeg');
  res.setHeader('Access-Control-Allow-Origin', '*'); // Ensure this header is present
  res.sendFile(filePath);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
