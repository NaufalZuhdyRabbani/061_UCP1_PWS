import express from 'express';
import Book from './models/book.js';

const app = express();
const PORT = 3000;

app.use(express.json());

// Endpoint untuk mendapatkan semua buku
app.get('/api/buku', (req, res) => {
  Book.getAll((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Endpoint untuk mendapatkan buku berdasarkan ID
app.get('/api/buku/:id', (req, res) => {
  const { id } = req.params;
  Book.getById(id, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Buku tidak ditemukan' });
    }
    res.json(results[0]);
  });
});

// Endpoint untuk menambah buku baru
app.post('/api/buku', (req, res) => {
  const { judul, pengarang, tahun_terbit, bidang } = req.body;
  if (!judul || !pengarang || !tahun_terbit || !bidang) {
    return res.status(400).json({ message: 'Semua field harus diisi' });
  }
  Book.create(req.body, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Buku berhasil ditambahkan', id: results.insertId });
  });
});

// Endpoint untuk update buku
app.put('/api/buku/:id', (req, res) => {
  const { id } = req.params;
  const { judul, pengarang, tahun_terbit, bidang } = req.body;
  if (!judul || !pengarang || !tahun_terbit || !bidang) {
    return res.status(400).json({ message: 'Semua field harus diisi' });
  }
  Book.update(id, req.body, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Buku tidak ditemukan' });
    }
    res.json({ message: 'Buku berhasil diupdate' });
  });
});

// Endpoint untuk delete buku
app.delete('/api/buku/:id', (req, res) => {
  const { id } = req.params;
  Book.delete(id, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Buku tidak ditemukan' });
    }
    res.json({ message: 'Buku berhasil dihapus' });
  });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
