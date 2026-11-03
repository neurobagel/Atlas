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
    const select = (id: string) => `[data-cy="community-card-${id}-select"]`;

    cy.get(select('neurobagel')).click();
    cy.get(select('neurobagel')).should('have.attr', 'aria-pressed', 'true');

    cy.get(select('scand')).click();
    cy.get(select('scand')).should('have.attr', 'aria-pressed', 'true');
    cy.get(select('neurobagel')).should('have.attr', 'aria-pressed', 'false');

    cy.get(select('scand')).click();
    cy.get(select('scand')).should('have.attr', 'aria-pressed', 'false');
  });
});
