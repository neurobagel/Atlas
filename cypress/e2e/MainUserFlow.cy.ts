describe('Main user flow', () => {
  it('should load the app and render active and onboarding community cards', () => {
    cy.visit('/');
    cy.get('[data-cy="community-list"]').should('be.visible');
    cy.get('[data-cy="community-card-neurobagel"]').should('contain', 'Neurobagel');
    cy.get('[data-cy="community-card-nichy"]').should('contain', 'NICHY');
  });
});
