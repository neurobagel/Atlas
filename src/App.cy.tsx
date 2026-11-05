import App from '~/App';
import { COMMUNITIES } from '~/utils/constants';

describe('<App />', () => {
  it('should render a card for every community', () => {
    cy.mount(<App />);
    // Direct children (>) of the list whose data-cy starts with (^=) "community-card-", i.e. the
    // card roots only, not elements inside a card such as "community-card-<id>-status"
    cy.get('[data-cy="community-list"] > [data-cy^="community-card-"]').should(
      'have.length',
      COMMUNITIES.length
    );
  });

  it('should select one card at a time and deselect on a second click', () => {
    cy.mount(<App />);
    const card = (id: string) => `[data-cy="community-card-${id}"]`;

    // The selected card is the one with the thicker border
    cy.get(card('neurobagel')).click();
    cy.get(card('neurobagel')).should('have.css', 'border-width', '2px');

    cy.get(card('scand')).click();
    cy.get(card('scand')).should('have.css', 'border-width', '2px');
    cy.get(card('neurobagel')).should('have.css', 'border-width', '1px');

    cy.get(card('scand')).click();
    cy.get(card('scand')).should('have.css', 'border-width', '1px');
  });
});
