const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'rootpassword',
  database: process.env.DB_NAME || 'blog'
});

// Middleware de vérification d'article
const validateArticle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [articles] = await pool.query('SELECT * FROM articles WHERE id = ?', [id]);

    if (articles.length === 0) {
      return res.status(404).json({
        message: 'Article non trouvé',
        error: 'NOT_FOUND'
      });
    }

    req.article = articles[0];
    next();
  } catch (error) {
    res.status(500).json({
      message: 'Erreur lors de la validation',
      error: 'VALIDATION_ERROR'
    });
  }
};

// GET tous les articles
app.get('/api/articles', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM articles ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET un article par ID
app.get('/api/articles/:id', validateArticle, async (req, res) => {
  res.json(req.article);
});

// POST nouvel article
app.post('/api/articles', async (req, res) => {
  const { title, content } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO articles (title, content) VALUES (?, ?)',
      [title, content]
    );
    res.status(201).json({ id: result.insertId, title, content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT modifier un article
app.put('/api/articles/:id', validateArticle, async (req, res) => {
  const { title, content, image_url, image_alt } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE articles SET title = ?, content = ?, image_url = ?, image_alt = ? WHERE id = ?',
      [title, content, image_url, image_alt, req.params.id]
    );
    res.json({ message: 'Article mis à jour avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE supprimer un article
app.delete('/api/articles/:id', validateArticle, async (req, res) => {
  try {
    await pool.query('DELETE FROM articles WHERE id = ?', [req.params.id]);
    res.json({ message: 'Article supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression' });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});