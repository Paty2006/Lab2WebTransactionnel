describe('mon premier spec', () => {

  // Test 1 : Vérifie que cliquer sur une carte redirige vers la page blog
  it('passes', () => {
    cy.visit('localhost:5501/index.html')
    cy.get('#card1').click()
    cy.url().should('include', '/blog.html')
  })

  // Test 2 : Vérifie l'ajout d'un commentaire sur une publication
  it('devrait ajouter un commentaire à une publication', () => {

    // Intercepte la requête POST vers l'API des commentaires
    cy.intercept('POST', 'http://localhost:3000/commentaires').as('ajoutCommentaire')

    // Visite la page blog de la publication avec l'ID 1
    cy.visit('localhost:5501/blog.html?id=1')

    // Attend que le formulaire de commentaire soit chargé
    cy.get('#commentaireForm').should('be.visible')

    // Saisit un commentaire dans le textarea
    cy.get('#commentaire').type('Ceci est un commentaire de test ajouté par Cypress !')

    // Clique sur le bouton Submit pour soumettre le commentaire
    cy.get('#commentaireForm button[type="submit"]').click()

    // Attend que la requête POST soit envoyée et vérifiée
    cy.wait('@ajoutCommentaire').then((interception) => {
      // Vérifie que la requête a été envoyée avec succès (code 201 = créé)
      expect(interception.response.statusCode).to.equal(201)

      // Vérifie que le corps de la requête contient les bonnes données
      expect(interception.request.body).to.have.property('publicationId', '1')
      expect(interception.request.body).to.have.property('contenu', 'Ceci est un commentaire de test ajouté par Cypress !')
    })

    // Vérifie que le commentaire est affiché dans la page
    cy.get('#commentaires').should('contain', 'Ceci est un commentaire de test ajouté par Cypress !')

    // Vérifie que le textarea est vidé après l'envoi
    cy.get('#commentaire').should('have.value', '')
  })
})