FROM nginx:alpine

# Suppression de la configuration par défaut de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copie du fichier HTML dans le répertoire approprié de Nginx
COPY src/index.html /usr/share/nginx/html/

# Exposition du port 80
EXPOSE 80

# Démarrage de Nginx
CMD ["nginx", "-g", "daemon off;"] 