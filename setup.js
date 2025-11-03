import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT
});

connection.connect((err) => {
  if (err) {
    console.error('Koneksi gagal:', err);
    return;
  }
  console.log('Terhubung ke MySQL!');

  // Buat database
  connection.query('CREATE DATABASE IF NOT EXISTS perpustakaan_ucp', (err, results) => {
    if (err) {
      console.error('Error creating database:', err);
      connection.end();
      return;
    }
    console.log('Database perpustakaan_ucp berhasil dibuat atau sudah ada.');

    // Gunakan database
    connection.query('USE perpustakaan_ucp', (err) => {
      if (err) {
        console.error('Error using database:', err);
        connection.end();
        return;
      }

      // Buat tabel buku
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS buku (
          id INT AUTO_INCREMENT PRIMARY KEY,
          judul VARCHAR(45) NOT NULL,
          pengarang VARCHAR(45) NOT NULL,
          tahun_terbit CHAR(4) NOT NULL,
          bidang VARCHAR(45) NOT NULL
        )
      `;
      connection.query(createTableQuery, (err, results) => {
        if (err) {
          console.error('Error creating table:', err);
        } else {
          console.log('Tabel buku berhasil dibuat.');
        }
        connection.end();
      });
    });
  });
});
