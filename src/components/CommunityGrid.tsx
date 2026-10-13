import React, { useMemo } from 'react';
import { ExternalLink, Layers, Search, X, RotateCcw } from 'lucide-react';
import { Community, COUNTRY_NAMES } from '../data/communities';

interface CommunityGridProps {
  communities: Community[];
  onSelectCommunity: (community: Community) => void;
  onHoverCommunity?: (community: Community | null) => void;
  hoveredCommunityId?: string | null;
  searchQuery: string;
  onSearchQueryChange: (q: string) => void;
  filterStatus: 'all' | 'active' | 'prospective';
  onFilterStatusChange: (status: 'all' | 'active' | 'prospective') => void;
  onReset: () => void;
}

export const CommunityGrid: React.FC<CommunityGridProps> = ({
  communities,
  onSelectCommunity,
  onHoverCommunity,
  hoveredCommunityId,
  searchQuery,
  onSearchQueryChange,
  filterStatus,
  onFilterStatusChange,
  onReset,
}) => {
  const filteredCommunities = useMemo(() => {
    return communities.filter((c) => {
      if (filterStatus === 'active' && c.status !== 'active') return false;
      if (filterStatus === 'prospective' && c.status === 'active') return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();

      const matchName = c.name.toLowerCase().includes(q) || c.shortName.toLowerCase().includes(q);
      const matchDesc =
        c.description.toLowerCase().includes(q) || c.tagline.toLowerCase().includes(q);
      const matchCategory = c.category.toLowerCase().includes(q);
      const matchDomains = c.domains.some((d) => d.toLowerCase().includes(q));
      const matchInstitutes = c.institutes.some((inst) => inst.toLowerCase().includes(q));
      const matchCoordinators = c.coordinators.some((coord) =>
        coord.name.toLowerCase().includes(q)
      );
      const matchCityCountry =
        c.coordinates.city.toLowerCase().includes(q) ||
        c.coordinates.country.toLowerCase().includes(q) ||
        c.countryCodes.some((code) => code.toLowerCase().includes(q));

      return (
        matchName ||
        matchDesc ||
        matchCategory ||
        matchDomains ||
        matchInstitutes ||
        matchCoordinators ||
        matchCityCountry
      );
    });
  }, [communities, filterStatus, searchQuery]);

  const activeCount = communities.filter((c) => c.status === 'active').length;
  const prospectiveCount = communities.filter((c) => c.status !== 'active').length;

  return (
    <div className="mb-4" data-cy="community-grid">
      {/* Section Header & Unified Controls */}
      <div className="mb-2.5 flex flex-col gap-2 px-1 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center space-x-2">
          <Layers className="h-4 w-4 text-[#7e56c2]" />
          <h2 className="text-base font-bold tracking-tight text-slate-900 sm:text-lg">
            Federated Communities & Working Groups
          </h2>
        </div>

        {/* Unified Search, Filter & Reset controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search bar */}
          <div className="relative w-full flex-shrink-0 sm:w-60 md:w-64">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5">
              <Search className="h-3.5 w-3.5 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
              placeholder="Search community, PI, country..."
              className="shadow-2xs box-border w-full rounded-lg border border-slate-300 bg-white py-1 pl-7 pr-6 text-xs text-slate-900 placeholder-slate-400 transition focus:border-[#7e56c2] focus:outline-none focus:ring-1 focus:ring-[#7e56c2]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchQueryChange('')}
                className="absolute inset-y-0 right-0 flex items-center pr-2 text-slate-400 hover:text-slate-700"
                aria-label="Clear search"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="shadow-2xs flex flex-shrink-0 rounded-lg border border-slate-200 bg-white p-0.5 text-xs">
            <button
              type="button"
              onClick={() => onFilterStatusChange('active')}
              className={`rounded-md px-2.5 py-0.5 text-xs font-medium transition ${
                filterStatus === 'active'
                  ? 'shadow-2xs bg-emerald-600 text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Active ({activeCount})
            </button>
            <button
              type="button"
              onClick={() => onFilterStatusChange('prospective')}
              className={`rounded-md px-2.5 py-0.5 text-xs font-medium transition ${
                filterStatus === 'prospective'
                  ? 'shadow-2xs bg-amber-600 text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Prospects ({prospectiveCount})
            </button>
            <button
              type="button"
              onClick={() => onFilterStatusChange('all')}
              className={`rounded-md px-2.5 py-0.5 text-xs font-medium transition ${
                filterStatus === 'all'
                  ? 'shadow-2xs bg-[#7e56c2] text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({communities.length})
            </button>
          </div>

          {/* Reset View button */}
          <button
            type="button"
            onClick={onReset}
            className="shadow-2xs flex flex-shrink-0 items-center space-x-1 rounded-lg border border-slate-200 bg-white px-2 py-0.5 text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900"
            title="Reset filters and map view"
          >
            <RotateCcw className="h-3 w-3" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Grid of Partner Cells or Empty State */}
      {filteredCommunities.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white/70 py-6 text-center text-xs text-slate-500">
          <p className="font-semibold text-slate-700">No communities found</p>
          <p className="mt-1">Try clearing your search query or switching filter tabs.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5">
          {filteredCommunities.map((community) => {
            const isActive = community.status === 'active';
            const isHovered = hoveredCommunityId === community.id;
            const logoSrc = community.logo;
            const piName = community.piName;
            const displayName = community.shortName;
            const primaryFlag = COUNTRY_NAMES[community.countryCodes[0]]?.flag || '🌐';
            const locationLabel = `${community.coordinates.city}, ${community.coordinates.country}`;

            return (
              <div
                key={community.id}
                role="button"
                tabIndex={0}
                onClick={() => onSelectCommunity(community)}
                onMouseEnter={() => onHoverCommunity?.(community)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectCommunity(community);
                  }
                }}
                className={`shadow-xs group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-xl bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-[#7e56c2] hover:shadow-md ${
                  isHovered
                    ? '-translate-y-0.5 border-2 border-[#7e56c2] shadow-md ring-2 ring-[#7e56c2]/20'
                    : 'border border-slate-200'
                }`}
                data-cy={`community-cell-${community.id}`}
              >
                {/* Header Bar: Public Community vs Consortium */}
                <div className="flex items-center justify-between border-b border-slate-200 bg-slate-100 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-slate-700">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold tracking-wider text-slate-700">
                      {community.communityType === 'public' ? 'Public' : 'Consortium'}
                    </span>
                  </div>

                  {/* Status Pill in header */}
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[9px] font-semibold normal-case tracking-normal ${
                      isActive
                        ? 'border border-emerald-200 bg-emerald-50 text-emerald-700'
                        : 'border border-amber-200 bg-amber-50 text-amber-700'
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        isActive ? 'animate-pulse bg-emerald-500' : 'bg-amber-500'
                      }`}
                    />
                    {isActive ? 'Active' : 'Prospect'}
                  </span>
                </div>

                {/* Card Body Container */}
                <div className="flex flex-1 flex-col justify-between p-3">
                  {/* Location & Category Sub-Row */}
                  <div className="mb-2 flex items-center justify-between text-[11px] text-slate-500">
                    <div className="flex min-w-0 items-center gap-1.5" title={locationLabel}>
                      <span className="flex-shrink-0 text-sm leading-none">{primaryFlag}</span>
                      <span className="truncate text-[10px] font-medium text-slate-500">
                        {community.coordinates.city}
                      </span>
                    </div>
                    <span className="truncate text-[9px] font-medium text-slate-400">
                      {community.category}
                    </span>
                  </div>

                  {/* Middle Row: Snug Logo + Community Name & PI */}
                  <div className="mb-2.5 flex min-w-0 items-center gap-2.5">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-slate-100 bg-slate-50 p-1 transition group-hover:bg-purple-50/50">
                      <img
                        src={logoSrc}
                        alt={`${displayName} logo`}
                        className="max-h-full max-w-full object-contain filter transition-transform duration-200 group-hover:scale-105"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3
                        className="line-clamp-1 text-xs font-bold tracking-tight text-slate-800 transition-colors group-hover:text-[#7e56c2]"
                        title={displayName}
                      >
                        {displayName}
                      </h3>
                      {piName ? (
                        <p
                          className="mt-0.5 line-clamp-1 text-[11px] font-medium text-slate-500"
                          title={`PI: ${piName}`}
                        >
                          PI: {piName}
                        </p>
                      ) : (
                        <p className="mt-0.5 line-clamp-1 text-[11px] font-medium text-slate-400">
                          Public Federation
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Prominent Subjects Banner (GAAIN style) */}
                  <div className="mb-2.5 flex items-baseline justify-between rounded-lg border border-purple-100/70 bg-purple-50/60 px-2.5 py-1.5">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                      {isActive ? 'Subjects' : 'Target'}
                    </span>
                    <span className="text-sm font-extrabold tracking-tight text-[#7e56c2]">
                      {community.stats.subjectsCount.toLocaleString()}
                    </span>
                  </div>

                  {/* Participating Institutes Mini-Strip (up to 3 logos) */}
                  <div className="mb-2.5 flex min-h-[22px] items-center justify-between text-[10px] text-slate-400">
                    <span className="text-[9px] font-semibold uppercase tracking-wider">
                      Institutes:
                    </span>
                    {community.partnerOrgs && community.partnerOrgs.length > 0 ? (
                      <div className="flex flex-wrap items-center gap-1.5">
                        {community.partnerOrgs.slice(0, 3).map((org) => (
                          <div
                            key={org.name}
                            title={org.name}
                            className="shadow-2xs flex h-5 items-center justify-center rounded border border-slate-200 bg-white px-1.5"
                          >
                            <img
                              src={org.logo}
                              alt={org.name}
                              className="h-3 max-w-[42px] object-contain"
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-[10px] italic text-slate-400">
                        {community.institutes.length} sites
                      </span>
                    )}
                  </div>

                  {/* Highlighted Action Button */}
                  {isActive && community.portalUrl ? (
                    <a
                      href={community.portalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="shadow-xs mt-auto flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#7e56c2] px-2.5 py-1.5 text-xs font-semibold text-white transition hover:bg-[#6c45b0] hover:shadow-sm"
                      title={`Query ${displayName} federated portal`}
                    >
                      <span>Query {displayName}</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCommunity(community);
                      }}
                      className="shadow-2xs mt-auto flex w-full items-center justify-center gap-1 rounded-lg border border-slate-200 bg-slate-50/80 px-2.5 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-[#7e56c2]/40 hover:bg-white hover:text-[#7e56c2]"
                    >
                      <span>Explore Cohort</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
