import React, { useEffect } from 'react';
import {
  X,
  ExternalLink,
  Users,
  Database,
  Server,
  MapPin,
  Building2,
  Quote,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { Community, COUNTRY_NAMES } from '../data/communities';

interface CommunityModalProps {
  community: Community | null;
  onClose: () => void;
}

export const CommunityModal: React.FC<CommunityModalProps> = ({ community, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!community) return null;

  const isActive = community.status === 'active';
  const isOnboarding = community.status === 'onboarding';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        {/* Modal Dialog Box */}
        <div className="relative my-8 w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl transition-all dark:border-slate-800 dark:bg-slate-900">
          {/* Top Accent Line */}
          <div
            className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${community.themeAccent}`}
          />

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Modal Header */}
          <div className="flex items-start space-x-4">
            <div
              className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${community.themeAccent} text-lg font-bold text-white shadow-lg`}
            >
              {community.shortName.slice(0, 3).toUpperCase()}
            </div>

            <div className="pr-6">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
                  {community.name}
                </h2>
              </div>

              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  {community.shortName}
                </span>
                <span>•</span>
                <span>{community.category}</span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <MapPin className="h-3 w-3 text-[#7e56c2]" />
                  <span>
                    {community.coordinates.city}, {community.coordinates.country}
                  </span>
                </span>
              </div>

              <div className="mt-2 flex items-center space-x-1">
                {community.countryCodes.map((code) => (
                  <span
                    key={code}
                    className="inline-flex items-center space-x-1 rounded bg-slate-100 px-1.5 py-0.5 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    title={COUNTRY_NAMES[code]?.name || code}
                  >
                    <span>{COUNTRY_NAMES[code]?.flag}</span>
                    <span>{COUNTRY_NAMES[code]?.name || code}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Status Alert Banner */}
          <div className="mt-5">
            {isActive ? (
              <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50/80 p-3 text-xs text-emerald-800 dark:border-emerald-800/80 dark:bg-emerald-950/40 dark:text-emerald-300">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-600" />
                  <span>
                    <strong>Active Federation:</strong> Autonomous nodes are currently online and
                    accepting queries through their dedicated portal.
                  </span>
                </div>
              </div>
            ) : isOnboarding ? (
              <div className="flex items-center space-x-2 rounded-xl border border-cyan-200 bg-cyan-50/80 p-3 text-xs text-cyan-800 dark:border-cyan-800/80 dark:bg-cyan-950/40 dark:text-cyan-300">
                <Sparkles className="h-4 w-4 flex-shrink-0 text-cyan-600" />
                <span>
                  <strong>Node Onboarding Phase:</strong> Local BIDS data nodes are currently being
                  configured with Neurobagel node APIs behind member institutional firewalls.
                </span>
              </div>
            ) : (
              <div className="flex items-center space-x-2 rounded-xl border border-amber-200 bg-amber-50/80 p-3 text-xs text-amber-800 dark:border-amber-800/80 dark:bg-amber-950/40 dark:text-amber-300">
                <Sparkles className="h-4 w-4 flex-shrink-0 text-amber-600" />
                <span>
                  <strong>Prospective Working Group:</strong> Community leadership is preparing data
                  dictionaries and cohort harmonization for federated launch.
                </span>
              </div>
            )}
          </div>

          {/* Community Scope Description */}
          <div className="mt-5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              About this Community & Research Scope
            </h4>
            <p className="mt-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {community.description}
            </p>
          </div>

          {/* Quantified Reach Banner */}
          <div className="mt-5 grid grid-cols-3 gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 text-center dark:border-slate-800 dark:bg-slate-800/60">
            <div>
              <div className="text-lg font-bold text-[#7e56c2] dark:text-[#a387d7]">
                {community.stats.subjectsCount.toLocaleString()}
              </div>
              <div className="flex items-center justify-center space-x-1 text-xs text-slate-500 dark:text-slate-400">
                <Users className="h-3 w-3" />
                <span>{isActive ? 'Available Subjects' : 'Target Subjects'}</span>
              </div>
            </div>

            <div>
              <div className="text-lg font-bold text-purple-700 dark:text-purple-300">
                {community.stats.datasetsCount}
              </div>
              <div className="flex items-center justify-center space-x-1 text-xs text-slate-500 dark:text-slate-400">
                <Database className="h-3 w-3" />
                <span>Cohorts & Datasets</span>
              </div>
            </div>

            <div>
              <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                {community.stats.nodesCount}
              </div>
              <div className="flex items-center justify-center space-x-1 text-xs text-slate-500 dark:text-slate-400">
                <Server className="h-3 w-3" />
                <span>{isActive ? 'Active Nodes' : 'Planned Nodes'}</span>
              </div>
            </div>
          </div>

          {/* Early Adopters / Coordinators & Testimonials */}
          <div className="mt-5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Coordinators & Key Investigators
            </h4>
            <div className="mt-2 space-y-2.5">
              {community.coordinators.map((coordinator, i) => (
                <div
                  key={i}
                  className="dark:bg-slate-850 rounded-xl border border-slate-200/80 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-800/80"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      {coordinator.url ? (
                        <a
                          href={coordinator.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm font-semibold text-slate-900 transition hover:text-[#7e56c2] dark:text-white dark:hover:text-[#a387d7]"
                          title={`${coordinator.name} profile (opens in new tab)`}
                        >
                          <span>{coordinator.name}</span>
                          <ExternalLink className="h-3 w-3 text-slate-400" />
                        </a>
                      ) : (
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">
                          {coordinator.name}
                        </span>
                      )}
                      <span className="ml-2 text-xs text-slate-500 dark:text-slate-400">
                        • {coordinator.role}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs font-medium text-[#7e56c2] dark:text-[#a387d7]">
                    {coordinator.affiliation}
                  </div>

                  {coordinator.quote && (
                    <div className="mt-2 flex items-start space-x-2 rounded-lg bg-purple-50/60 p-2 text-xs italic text-slate-700 dark:bg-purple-950/30 dark:text-slate-300">
                      <Quote className="h-3.5 w-3.5 flex-shrink-0 not-italic text-[#7e56c2] dark:text-[#a387d7]" />
                      <span>&ldquo;{coordinator.quote}&rdquo;</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Participating Institutes & Platforms */}
          <div className="mt-5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Participating Institutes & Data Repositories
            </h4>
            {community.partnerOrgs && community.partnerOrgs.length > 0 && (
              <div className="mb-2 mt-2 flex flex-wrap gap-2">
                {community.partnerOrgs.map((org) =>
                  org.url ? (
                    <a
                      key={org.name}
                      href={org.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shadow-2xs hover:shadow-xs inline-flex items-center gap-2.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 transition hover:border-[#7e56c2]"
                      title={`${org.name} (Opens in new tab)`}
                    >
                      <img
                        src={org.logo}
                        alt={org.name}
                        className="h-6 max-w-[84px] object-contain"
                      />
                      <span>{org.name}</span>
                      <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
                    </a>
                  ) : (
                    <span
                      key={org.name}
                      className="shadow-2xs inline-flex items-center gap-2.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800"
                    >
                      <img
                        src={org.logo}
                        alt={org.name}
                        className="h-6 max-w-[84px] object-contain"
                      />
                      <span>{org.name}</span>
                    </span>
                  )
                )}
              </div>
            )}
            <div className="mt-2 flex flex-wrap gap-1.5">
              {community.institutes.map((inst, i) => (
                <span
                  key={i}
                  className="inline-flex items-center space-x-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                >
                  <Building2 className="h-3 w-3 text-slate-400" />
                  <span>{inst}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Domain Tags */}
          <div className="mt-4">
            <div className="flex flex-wrap gap-1">
              {community.domains.map((dom, i) => (
                <span
                  key={i}
                  className="rounded-md bg-purple-50 px-2 py-0.5 text-[11px] font-medium text-purple-800 dark:bg-purple-950/60 dark:text-purple-300"
                >
                  #{dom}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-6 flex items-center justify-end space-x-3 border-t border-slate-100 pt-4 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Close
            </button>

            {isActive && community.portalUrl && (
              <a
                href={community.portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 rounded-xl bg-[#7e56c2] px-4 py-2 text-xs font-bold text-white shadow-md shadow-purple-600/20 transition hover:bg-[#6c45b0] active:scale-95"
              >
                <span>Launch {community.shortName} Portal</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
