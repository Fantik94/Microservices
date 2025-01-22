# Documentation de la Base de Données

## Choix Technologique : MySQL

MySQL a été choisi comme système de gestion de base de données relationnelle pour ce projet pour les raisons suivantes :

### Avantages
- **Fiabilité et Robustesse** : Système éprouvé avec une grande communauté
- **Capacités ACID** : 
  - Atomicité
  - Cohérence
  - Isolation
  - Durabilité
- **Intégration Node.js** : Support natif via mysql2
- **Performances** : Optimisé pour les opérations CRUD

## Structure des Tables

### Table: articles

Cette table stocke tous les articles du blog.

#### Schéma

| Colonne     | Type         | Null | Default           | Description                               |
|-------------|--------------|------|-------------------|-------------------------------------------|
| id          | INT          | Non  | AUTO_INCREMENT    | Clé primaire auto-incrémentée            |
| title       | VARCHAR(255) | Non  | NULL             | Titre de l'article                        |
| content     | TEXT         | Non  | NULL             | Contenu de l'article                      |
| image_url   | VARCHAR(255) | Oui  | NULL             | URL de l'image                            |
| image_alt   | VARCHAR(255) | Oui  | NULL             | Texte alternatif de l'image              |
| created_at  | TIMESTAMP    | Non  | CURRENT_TIMESTAMP | Date de création                         |
| updated_at  | TIMESTAMP    | Non  | CURRENT_TIMESTAMP | Date de dernière modification            |

#### Contraintes
- La clé primaire `id` est auto-incrémentée
- Les champs `title` et `content` sont obligatoires
- Les champs `image_url` et `image_alt` sont optionnels
- Les dates sont automatiquement gérées par le système

## Scripts de Base de Données

### Génération de Données de Test
Le projet inclut un script de génération de données de test (`generateArticles.js`) qui permet de peupler la base de données avec des articles factices pour le développement.

Générer 100 articles de test

```bash
npm run gen
```

Générer un nombre spécifique d'articles

```bash
npm run gen 50 # génère 50 articles
```
### Nettoyage de la Base de Données
Un script de nettoyage (`cleanup.js`) est disponible pour réinitialiser la base de données :
```bash
npm run cleanup
```

## Maintenance

Pour maintenir les performances de la base de données :
- Les index sont automatiquement créés sur les colonnes fréquemment utilisées
- Les timestamps sont gérés automatiquement par MySQL
- Les requêtes sont préparées pour éviter les injections SQL