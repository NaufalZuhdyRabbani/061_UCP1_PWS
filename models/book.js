import db from '../config/database.js';

class Book {
  static getAll(callback) {
    db.query('SELECT * FROM buku', callback);
  }

  static getById(id, callback) {
    db.query('SELECT * FROM buku WHERE id = ?', [id], callback);
  }

  static create(data, callback) {
    const { judul, pengarang, tahun_terbit, bidang } = data;
    db.query('INSERT INTO buku (judul, pengarang, tahun_terbit, bidang) VALUES (?, ?, ?, ?)', [judul, pengarang, tahun_terbit, bidang], callback);
  }

  static update(id, data, callback) {
    const { judul, pengarang, tahun_terbit, bidang } = data;
    db.query('UPDATE buku SET judul = ?, pengarang = ?, tahun_terbit = ?, bidang = ? WHERE id = ?', [judul, pengarang, tahun_terbit, bidang, id], callback);
  }

  static delete(id, callback) {
    db.query('DELETE FROM buku WHERE id = ?', [id], callback);
  }
}

export default Book;
