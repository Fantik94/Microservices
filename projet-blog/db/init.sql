-- Supprime les tables si elles existent déjà
DROP TABLE IF EXISTS articles;

-- Crée la table articles avec support des images
CREATE TABLE articles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    image_url VARCHAR(255),
    image_alt VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Données de test avec images
INSERT INTO articles (title, content, image_url, image_alt) VALUES 
    ('Premier article', 'Contenu du premier article...', 'https://picsum.photos/800/400?random=1', 'Image aléatoire 1'),
    ('Deuxième article', 'Contenu du deuxième article...', 'https://picsum.photos/800/400?random=2', 'Image aléatoire 2'),
    ('Troisième article', 'Contenu du troisième article...', 'https://picsum.photos/800/400?random=3', 'Image aléatoire 3'); 