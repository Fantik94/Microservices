async function cleanupArticles() {
    try {
        // Récupérer tous les articles
        const response = await fetch('http://localhost:3000/api/articles');
        const articles = await response.json();
        
        console.log(`Trouvé ${articles.length} articles à supprimer...`);

        // Supprimer chaque article
        for (const article of articles) {
            const deleteResponse = await fetch(`http://localhost:3000/api/articles/${article.id}`, {
                method: 'DELETE'
            });

            if (deleteResponse.ok) {
                console.log(`Article ${article.id} supprimé avec succès`);
            } else {
                console.error(`Erreur lors de la suppression de l'article ${article.id}`);
            }
        }

        console.log('Nettoyage terminé !');
    } catch (error) {
        console.error('Erreur lors du nettoyage :', error);
    }
}

cleanupArticles(); 