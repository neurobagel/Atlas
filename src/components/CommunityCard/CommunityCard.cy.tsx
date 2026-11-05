import { CommunityCard } from '~/components/CommunityCard';
import type { ActiveCommunity, CommunityNode, OnboardingCommunity } from '~/utils/types';

const activeCommunity: ActiveCommunity = {
  id: 'test-active',
  name: 'Test Active',
  fullName: 'Test Active Community',
  status: 'active',
  contact: { name: 'Jane Doe', role: 'Main coordinator' },
  queryToolUrl: 'https://query.example.org',
  federationApiUrl: 'https://federate.example.org/',
};

const onboardingCommunity: OnboardingCommunity = {
  id: 'test-onboarding',
  name: 'Test Onboarding',
  status: 'onboarding',
  logoUrl: '/logo.png',
  contact: { name: 'John Doe' },
  projectedStats: '~5,000 subjects expected',
};

const nodes: CommunityNode[] = [
  {
    id: 'node-a',
    name: 'Node A',
    communityId: 'test-active',
    city: 'Montreal',
    country: 'Canada',
    lat: 45.5,
    lng: -73.6,
  },
  {
    id: 'node-b',
    name: 'Node B',
    communityId: 'test-active',
    city: 'Amsterdam',
    country: 'Netherlands',
    lat: 52.4,
    lng: 4.9,
  },
];

describe('CommunityCard', () => {
  describe('active community', () => {
    it('should show the header, live stats and query button', () => {
      cy.mount(
        <CommunityCard
          community={activeCommunity}
          nodes={nodes}
          stats={{ status: 'success', subjects: 1200, datasets: 15, nodes: 2 }}
          isSelected={false}
          onSelect={cy.spy()}
        />
      );
      const card = '[data-cy="community-card-test-active"]';
      cy.get(card).should('contain', 'Test Active').and('contain', 'Test Active Community');
      cy.get(`${card} [data-cy="community-card-test-active-status"]`).should('contain', 'Active');
      cy.get('[data-cy="community-card-test-active-contact"]').should(
        'contain',
        'Jane Doe (Main coordinator)'
      );
      cy.get('[data-cy="stat-cell-subjects"]').should('contain', '1200');
      cy.get('[data-cy="stat-cell-datasets"]').should('contain', '15');
      cy.get('[data-cy="stat-cell-nodes"]').should('contain', '2');
      cy.get('[data-cy="community-card-test-active-projected-stats"]').should('not.exist');
      cy.get('[data-cy="community-card-test-active-query-button"]')
        .should('contain', 'Query subjects here')
        .and('have.attr', 'href', 'https://query.example.org')
        .and('have.attr', 'target', '_blank');
    });

    it('should fall back to an avatar with the first letter when there is no logo', () => {
      cy.mount(
        <CommunityCard
          community={activeCommunity}
          nodes={nodes}
          isSelected={false}
          onSelect={cy.spy()}
        />
      );
      cy.get('[data-cy="community-card-test-active-avatar"]').should('have.text', 'T');
      cy.get('[data-cy="community-card-test-active"] img').should('not.exist');
    });

    it('should show loading skeletons while stats are pending or not yet requested', () => {
      cy.mount(
        <CommunityCard
          community={activeCommunity}
          nodes={nodes}
          isSelected={false}
          onSelect={cy.spy()}
        />
      );
      cy.get('[data-cy="stat-cell-subjects-loading"]').should('exist');
      cy.get('[data-cy="stat-cell-datasets-loading"]').should('exist');
      cy.get('[data-cy="stat-cell-nodes-loading"]').should('exist');
    });

    it('should show dashes when stats failed to load', () => {
      cy.mount(
        <CommunityCard
          community={activeCommunity}
          nodes={nodes}
          stats={{ status: 'error' }}
          isSelected={false}
          onSelect={cy.spy()}
        />
      );
      cy.get('[data-cy="stat-cell-subjects-error"]').should('have.text', '—');
      cy.get('[data-cy="stat-cell-datasets-error"]').should('have.text', '—');
      cy.get('[data-cy="stat-cell-nodes-error"]').should('have.text', '—');
    });
  });

  describe('onboarding community', () => {
    it('should show projected stats, a logo and no query button', () => {
      cy.mount(
        <CommunityCard
          community={onboardingCommunity}
          nodes={[]}
          isSelected={false}
          onSelect={cy.spy()}
        />
      );
      const card = '[data-cy="community-card-test-onboarding"]';
      cy.get(`${card} [data-cy="community-card-test-onboarding-status"]`)
        .should('contain', 'Onboarding')
        .and('have.css', 'background-color', 'rgb(250, 204, 21)');
      cy.get(`${card} img`).should('have.attr', 'alt', 'Test Onboarding logo');
      cy.get('[data-cy="community-card-test-onboarding-projected-stats"]').should(
        'contain',
        '~5,000 subjects expected'
      );
      cy.get(card).should('have.css', 'border-style', 'dashed');
      cy.get('[data-cy^="stat-cell"]').should('not.exist');
      cy.get('[data-cy="community-card-test-onboarding-query-button"]').should('not.exist');
      cy.get('[data-cy="community-card-test-onboarding-toggle"]').should('not.exist');
    });

    it('should show a fallback when projected stats are unknown', () => {
      const { projectedStats: _, ...withoutProjectedStats } = onboardingCommunity;
      cy.mount(
        <CommunityCard
          community={withoutProjectedStats}
          nodes={[]}
          isSelected={false}
          onSelect={cy.spy()}
        />
      );
      cy.get('[data-cy="community-card-test-onboarding-projected-stats"]').should(
        'contain',
        'Projected stats coming soon'
      );
    });
  });

  it('should expand and collapse the node list', () => {
    cy.mount(
      <CommunityCard
        community={activeCommunity}
        nodes={nodes}
        isSelected={false}
        onSelect={cy.spy()}
      />
    );
    const toggle = '[data-cy="community-card-test-active-toggle"]';
    const nodeList = '[data-cy="community-test-active-nodes"]';
    cy.get(toggle).should('contain', 'More info').and('have.attr', 'aria-expanded', 'false');
    cy.get(nodeList).should('not.be.visible');

    cy.get(toggle).click();
    cy.get(toggle).should('contain', 'Less info').and('have.attr', 'aria-expanded', 'true');
    cy.get(nodeList)
      .should('be.visible')
      .and('contain', 'Node A')
      .and('contain', 'Montreal, Canada');
    cy.get(nodeList).should('contain', 'Node B').and('contain', 'Amsterdam');

    cy.get(toggle).click();
    cy.get(toggle).should('contain', 'More info');
    cy.get(nodeList).should('not.be.visible');
  });

  it('should call onSelect with the community id when the card is clicked', () => {
    const onSelect = cy.spy().as('onSelect');
    cy.mount(
      <CommunityCard
        community={activeCommunity}
        nodes={nodes}
        isSelected={false}
        onSelect={onSelect}
      />
    );
    cy.get('[data-cy="community-card-test-active"]').click();
    cy.get('@onSelect').should('have.been.calledOnceWith', 'test-active');
  });

  it('should not select the card when the inner controls are clicked', () => {
    const onSelect = cy.spy().as('onSelect');
    cy.mount(
      <CommunityCard
        community={activeCommunity}
        nodes={nodes}
        isSelected={false}
        onSelect={onSelect}
      />
    );
    cy.get('[data-cy="community-card-test-active-toggle"]').click();
    // Prevent the query link from navigating away from the test runner
    cy.get('[data-cy="community-card-test-active-query-button"]').then(($link) => {
      $link.on('click', (event) => event.preventDefault());
    });
    cy.get('[data-cy="community-card-test-active-query-button"]').click();
    cy.get('@onSelect').should('not.have.been.called');
  });

  it('should highlight the selected card', () => {
    cy.mount(
      <CommunityCard community={activeCommunity} nodes={nodes} isSelected onSelect={cy.spy()} />
    );
    // Keeps the 1px border so selecting doesn't shift the layout; the highlight is a primary shadow
    cy.get('[data-cy="community-card-test-active"]').should('have.css', 'border-width', '1px');
    cy.get('[data-cy="community-card-test-active"]')
      .should('have.css', 'box-shadow')
      .and('include', 'rgb(217, 116, 141)');
  });
});
