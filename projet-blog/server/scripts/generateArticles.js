const { faker } = require('@faker-js/faker/locale/fr');
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'rootpassword',
  database: process.env.DB_NAME || 'blog'
});

async function generateArticles(count = 100) {
  try {
    const connection = await pool.getConnection();
    console.log(`Génération de ${count} articles...`);

    for (let i = 0; i < count; i++) {
      const article = {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraphs(3),
        image_url: `https://picsum.photos/800/400?random=${i}`,
        image_alt: faker.lorem.sentence()
      };

      await connection.query(
        'INSERT INTO articles (title, content, image_url, image_alt) VALUES (?, ?, ?, ?)',
        [article.title, article.content, article.image_url, article.image_alt]
      );

      if ((i + 1) % 10 === 0) {
        console.log(`${i + 1} articles générés`);
      }
    }

    console.log('Génération terminée !');
    connection.release();
    await pool.end();
  } catch (error) {
    console.error('Erreur lors de la génération :', error);
    process.exit(1);
  }
}

// Permet de spécifier le nombre d'articles en argument
const count = process.argv[2] ? parseInt(process.argv[2]) : 100;
generateArticles(count); 