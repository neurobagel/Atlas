import { StatCell } from '~/components/CommunityCard';

describe('StatCell', () => {
  it('should show a skeleton while loading', () => {
    cy.mount(<StatCell label="Subjects" status="loading" />);
    cy.get('[data-cy="stat-cell-subjects-loading"]').should('be.visible');
    cy.get('[data-cy="stat-cell-subjects"]').should('contain', 'Subjects');
  });

  it('should show the value on success', () => {
    cy.mount(<StatCell label="Subjects" value={12345} status="success" />);
    cy.get('[data-cy="stat-cell-subjects"]').should('contain', '12345');
    cy.get('[data-cy="stat-cell-subjects-loading"]').should('not.exist');
  });

  it('should show 0 instead of a dash when the value is zero', () => {
    cy.mount(<StatCell label="Datasets" value={0} status="success" />);
    cy.get('[data-cy="stat-cell-datasets"]').should('contain', '0');
    cy.get('[data-cy="stat-cell-datasets-error"]').should('not.exist');
  });

  it('should show a dash with an explanatory tooltip on error', () => {
    cy.mount(<StatCell label="Nodes" status="error" />);
    cy.get('[data-cy="stat-cell-nodes-error"]').should('have.text', '—');
    cy.get('[data-cy="stat-cell-nodes-error"]').trigger('mouseover');
    cy.get('[role="tooltip"]').should('contain', 'Live stats are currently unavailable');
  });
});
