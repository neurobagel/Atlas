export type CommunityStatus = 'active' | 'onboarding';

export interface Contact {
  name: string;
  role?: string;
}

interface BaseCommunity {
  id: string;
  name: string;
  fullName?: string;
  logoUrl?: string;
  contact?: Contact;
}

export interface ActiveCommunity extends BaseCommunity {
  status: 'active';
  queryToolUrl: string;
  // Always ends with a trailing slash so endpoints can be built as `${federationApiUrl}nodes`
  federationApiUrl: string;
}

export interface OnboardingCommunity extends BaseCommunity {
  status: 'onboarding';
  projectedStats?: string;
}

export type Community = ActiveCommunity | OnboardingCommunity;

export interface CommunityNode {
  id: string;
  name: string;
  communityId: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
}

export type StatsStatus = 'loading' | 'success' | 'error';

export interface CommunityStats {
  status: StatsStatus;
  subjects?: number;
  datasets?: number;
  nodes?: number;
}
