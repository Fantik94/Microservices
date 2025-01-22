# Critères d'Évaluation du Projet

## Composants Techniques de Base (4 points)
- [x] Frontend avec minimum deux routes
- [x] Backend avec base de données dans un container spécifique
- [x] Justification du choix de la technologie de base de données
- [x] Base de données fonctionnelle avec au moins une table/collection et schéma explicite

## Architecture Docker
- [x] Minimum 2 Dockerfile et un docker-compose.yml
- [x] Docker network configuré
- [x] Au moins 2 images Docker publiées sur un container registry
- [x] Projet accessible publiquement sur GitHub/GitLab/Bitbucket

## Architecture & Clean Code (2 points)
- [x] Schéma d'architecture vectoriel incluant :
    - [x] Composants/services de l'application
    - [x] Liens entre composants avec protocoles et requêtes
    - [x] Ports exposés (client et backend)
  ([voir documentation architecture](./projet-blog/docs/ARCHITECTURE.md))
- [x] README.md complet avec instructions de build/run et captures d'écran

## Déploiement & Production (4 points)
- [x] Service de reverse proxy (nginx/traefik)
- [x] SSL/HTTPS avec certificats Let's Encrypt
- [x] Documentation API auto-générée (OpenAPI/Swagger)
- [x] Monitoring en temps réel des containers avec dashboard externe
- [ ] Système de gestion de files d'attente/push notifications

## Tests (4 points)
- [x] Tests container :
  - [x] Santé des conteneurs
  - [x] Ping des applications (front/back)
  - [x] Fonctionnement de la base de données
- [x] Tests unitaires sur 2 composants minimum
- [x] Tests de montée en charge
- [x] Tests end-to-end

## CI/CD avec GitHub (4 points)
- [x] Branches main et dev
- [ ] Test des workflows GitHub en local avec act -> pas possible pour notre cas : .gitlab-ci.yml
- [x] Workflows GitHub configurés :
  - [x] Test frontend
  - [x] Test backend
  - [x] Build image Docker backend
  - [x] Build image Docker frontend
  - [x] Publication des images sur DockerHub
  - [x] Badge de build
- [ ] Déploiement automatisé sur cloud server - Cloudron

## Contrôle Continu (2 points)
- [x] Suivi des push git [2 push/demi-journée]

