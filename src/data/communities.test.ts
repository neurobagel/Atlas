import { describe, it, expect } from 'vitest';
import { COMMUNITIES, getNetworkAggregateStats, COUNTRY_NAMES } from './communities';

describe('communities registry data', () => {
  it('should have communities defined with valid attributes', () => {
    expect(COMMUNITIES.length).toBeGreaterThan(0);
    COMMUNITIES.forEach((c) => {
      expect(c.id).toBeTruthy();
      expect(c.name).toBeTruthy();
      expect(c.shortName).toBeTruthy();
      if (c.communityType === 'consortium') {
        expect(c.piName).toBeTruthy();
        expect(c.countryCodes.length).toBeGreaterThan(0);
        c.countryCodes.forEach((code) => {
          expect(COUNTRY_NAMES[code]).toBeDefined();
        });
      }
      expect(c.logo).toBeTruthy();
      expect(c.coordinates.lat).toBeDefined();
      expect(c.coordinates.lng).toBeDefined();
      expect(c.stats.subjectsCount).toBeGreaterThan(0);
      expect(c.stats.datasetsCount).toBeGreaterThan(0);
      expect(c.stats.nodesCount).toBeGreaterThan(0);
    });
  });

  it('should include all active query portals mentioned in the scope', () => {
    const activeShortNames = COMMUNITIES.filter((c) => c.status === 'active').map(
      (c) => c.shortName
    );
    expect(activeShortNames).toContain('Neurobagel');
    expect(activeShortNames).toContain('ENIGMA-PD');
    expect(activeShortNames).toContain('SCAND');
    expect(activeShortNames).toContain('ASMQ');
    expect(activeShortNames).toContain('Dutch NPC');
  });

  it('should have no PI set for Neurobagel public federation', () => {
    const neurobagel = COMMUNITIES.find((c) => c.shortName === 'Neurobagel');
    expect(neurobagel?.piName).toBe('');
  });

  it('should include member partner organizations like OpenNeuro and OBI for Neurobagel', () => {
    const neurobagel = COMMUNITIES.find((c) => c.shortName === 'Neurobagel');
    expect(neurobagel?.partnerOrgs).toBeDefined();
    expect(neurobagel?.partnerOrgs?.length).toBeGreaterThanOrEqual(4);
    const names = neurobagel?.partnerOrgs?.map((p) => p.name);
    expect(names).toContain('OpenNeuro');
    expect(names).toContain('EBRAINS');
    expect(names).toContain('Ontario Brain Institute');
  });

  it('should differentiate between public community and consortia', () => {
    const neurobagel = COMMUNITIES.find((c) => c.shortName === 'Neurobagel');
    expect(neurobagel?.communityType).toBe('public');

    const consortia = COMMUNITIES.filter((c) => c.shortName !== 'Neurobagel');
    consortia.forEach((c) => {
      expect(c.communityType).toBe('consortium');
    });
  });

  it('should compute valid network aggregate statistics', () => {
    const stats = getNetworkAggregateStats();
    expect(stats.totalCommunities).toBe(COMMUNITIES.length);
    expect(stats.activePortalsCount).toBe(5);
    expect(stats.prospectiveCommunitiesCount).toBeGreaterThan(0);
    expect(stats.totalSubjects).toBeGreaterThan(70000);
    expect(stats.totalDatasets).toBeGreaterThan(1000);
    expect(stats.totalNodes).toBeGreaterThan(20);
    expect(stats.countriesCount).toBeGreaterThan(3);
    expect(stats.institutesCount).toBeGreaterThan(10);
  });
});
