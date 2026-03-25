/**
 * Tests Cypress pour l'application Blog CEPI
 * Couvre : chargement des publications, formulaire d'ajout, consultation d'une publication, ajout d'un commentaire
 */

// ============================
// 0. REDIRECTION AU CLIC SUR UNE CARTE
// ============================
describe('Redirection au clic sur une carte', () => {

  it('devrait rediriger vers la page blog en cliquant sur une carte', () => {
    cy.visit('localhost:5501/html/index.html')
    cy.get('#card1').click()
    cy.url().should('include', '/blog.html?id=1')
  })
})

// ============================
// 1. CHARGEMENT DES PUBLICATIONS
// ============================
describe('Chargement des publications', () => {

  
  it('devrait afficher les publications dans la page principale', () => {
    cy.visit('localhost:5501/html/index.html')

    // Vérifie que les publications sont affichées avec un titre et un contenu
    cy.get('#publications .card').should('have.length.greaterThan', 0)
    cy.get('#publications .card-title').first().should('not.be.empty')
  })
})

// ============================
// 2. FORMULAIRE D'AJOUT DE PUBLICATION
// ============================
describe('Formulaire d\'ajout de publication', () => {

  it('devrait ajouter une publication et la voir apparaître dans index.html', () => {
    cy.visit('localhost:5501/html/form.html')

    // Remplit le formulaire
    cy.get('#titre').type('Publication Cypress')
    cy.get('#auteur').type('Testeur Cypress')
    cy.get('#date').type('2026-03-25')
    cy.get('#contenu').type('Contenu de test créé par Cypress.')

    // Clique sur Envoyer puis confirme dans la boîte de dialogue jQuery UI
    cy.get('#envoyerForm').click()
    cy.get('.ui-dialog').should('be.visible')
    cy.get('.ui-dialog-buttonset button').contains('Confirmer').click()

    // Vérifie la redirection vers index.html
    cy.url().should('include', '/index.html')

    // Vérifie que la nouvelle publication apparaît dans la page
    cy.get('#publications').should('contain', 'Publication Cypress')
  })
})

// ============================
// 3. CONSULTATION D'UNE PUBLICATION
// ============================
describe('Consultation d\'une publication', () => {

  it('devrait afficher le contenu de la publication et ses commentaires', () => {
    cy.visit('localhost:5501/html/blog.html?id=1')

    // Vérifie que le titre, l'auteur et le contenu de la publication sont affichés
    cy.get('#publication h1').should('contain', 'Les Piliers de la Terre')
    cy.get('#publication').should('contain', 'Ken Follett')

    // Vérifie que les commentaires sont affichés
    cy.get('#commentaires').children().should('have.length.greaterThan', 0)
  })
})

// ============================
// 4. AJOUT D'UN COMMENTAIRE
// ============================
describe('Ajout d\'un commentaire', () => {

  it('devrait ajouter un commentaire et le voir apparaître dans la page', () => {
    cy.visit('localhost:5501/html/blog.html?id=1')

    // Saisit et soumet un commentaire
    cy.get('#commentaire').type('Commentaire ajouté par Cypress !')
    cy.get('#commentaireForm button[type="submit"]').click()

    // Vérifie que le commentaire apparaît dans la liste des commentaires
    cy.get('#commentaires').should('contain', 'Commentaire ajouté par Cypress !')

    // Vérifie que le textarea est vidé après l'envoi
    cy.get('#commentaire').should('have.value', '')
  })
})