const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

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

/**
 * @swagger
 * components:
 *   schemas:
 *     Article:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-généré de l'article
 *         title:
 *           type: string
 *           description: Titre de l'article
 *         content:
 *           type: string
 *           description: Contenu de l'article
 *         image_url:
 *           type: string
 *           description: URL de l'image de l'article
 *         image_alt:
 *           type: string
 *           description: Texte alternatif de l'image
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Date de création de l'article
 */

/**
 * @swagger
 * tags:
 *   name: Articles
 *   description: API de gestion des articles
 */

/**
 * @swagger
 * /api/articles:
 *   get:
 *     summary: Récupère tous les articles
 *     tags: [Articles]
 *     responses:
 *       200:
 *         description: Liste des articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 *       500:
 *         description: Erreur serveur
 */

// GET tous les articles
app.get('/api/articles', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM articles ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/articles/{id}:
 *   get:
 *     summary: Récupère un article par son ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'article
 *     responses:
 *       200:
 *         description: Article trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       404:
 *         description: Article non trouvé
 *       500:
 *         description: Erreur serveur
 */

// GET un article par ID
app.get('/api/articles/:id', validateArticle, async (req, res) => {
  res.json(req.article);
});

/**
 * @swagger
 * /api/articles:
 *   post:
 *     summary: Crée un nouvel article
 *     tags: [Articles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               image_url:
 *                 type: string
 *               image_alt:
 *                 type: string
 *     responses:
 *       201:
 *         description: Article créé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       500:
 *         description: Erreur serveur
 */

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

/**
 * @swagger
 * /api/articles/{id}:
 *   put:
 *     summary: Modifie un article existant
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'article à modifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               image_url:
 *                 type: string
 *               image_alt:
 *                 type: string
 *     responses:
 *       200:
 *         description: Article mis à jour avec succès
 *       404:
 *         description: Article non trouvé
 *       500:
 *         description: Erreur serveur
 */

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

/**
 * @swagger
 * /api/articles/{id}:
 *   delete:
 *     summary: Supprime un article
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'article à supprimer
 *     responses:
 *       200:
 *         description: Article supprimé avec succès
 *       404:
 *         description: Article non trouvé
 *       500:
 *         description: Erreur serveur
 */

// DELETE supprimer un article
app.delete('/api/articles/:id', validateArticle, async (req, res) => {
  try {
    await pool.query('DELETE FROM articles WHERE id = ?', [req.params.id]);
    res.json({ message: 'Article supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression' });
  }
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});