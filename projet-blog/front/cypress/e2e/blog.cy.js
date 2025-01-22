describe('Blog Article Creation and Deletion', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173')
    })
  
    it('should create and delete an article', () => {
      // Cliquer sur le bouton pour créer un nouvel article
      cy.get('.MuiButton-contained').click()
      
      // Petite pause pour l'animation
      cy.wait(500)
      
      // Remplir le titre
      cy.get('[data-testid="title-input"]').type('cypress')
      
      // Ajouter les images
      cy.get('#\\:rl\\:').type('image')
      cy.get('#\\:rn\\:').type('cypress image')
      
      // Remplir le contenu
      cy.get('[data-testid="content-input"]').type('Mon premier article cypress')
      
      // Cliquer sur le bouton publier
      cy.get('.css-hludax > .MuiButton-contained').click()
      
      // Attendre que l'article soit créé
      cy.wait(1000)
      
      // Cliquer sur le premier article
      cy.get(':nth-child(1) > .MuiPaper-root > .MuiCardActionArea-root > .MuiCardContent-root').click()
      
      // Cliquer sur le bouton de suppression
      cy.get('.MuiButton-outlinedError').click()
      
      // Confirmer la suppression
      cy.get('.MuiDialogActions-root > .MuiButton-contained').click()
      
      cy.wait(1000)
      // Recharger la page
      cy.reload()
    })
  })