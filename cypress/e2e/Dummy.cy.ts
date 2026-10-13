describe('Neurobagel Portal Entrypoint', () => {
  it('renders hero, map, search filter, and details modal', () => {
    cy.visit('http://localhost:5173');

    // Verify Brand & Hero
    cy.contains('Neurobagel communities explorer').should('be.visible');
    cy.contains('Connect a Node').should(
      'have.attr',
      'href',
      'https://neurobagel.org/user_guide/production_deployment/#making-your-node-publicly-discoverable'
    );

    // Verify Community Cells Grid (above map)
    cy.get('[data-cy="community-grid"]').should('be.visible');
    cy.contains('Federated Communities & Working Groups').should('be.visible');
    cy.contains('ENIGMA-PD').should('be.visible');
    cy.contains('Dutch NPC').should('be.visible');
    cy.contains('ASMQ').should('be.visible');
    cy.contains('SCAND').should('be.visible');

    // Verify Leaflet Map Container
    cy.get('.leaflet-container').should('be.visible');

    // Test Map Search Filtering
    cy.get('input[placeholder*="Search community"]').type('Parkinson');
    cy.contains("ENIGMA-Parkinson's Disease").should('be.visible');

    // Open More Info modal
    cy.contains('More Info').click();
    cy.contains('About this Community').scrollIntoView();
    cy.contains('About this Community').should('be.visible');
    cy.contains('Close').click();
  });
});
