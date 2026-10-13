import React from 'react';
import { getNetworkAggregateStats } from '../data/communities';

interface HeroProps {
  onExploreClick?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  const stats = getNetworkAggregateStats();

  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-r from-purple-50/40 via-white to-slate-50/80 px-3 py-2 dark:border-slate-800 dark:from-purple-950/20 dark:via-slate-900 dark:to-slate-950 sm:px-6 lg:px-8">
      {/* Background ambient decorative shapes */}
      <div className="pointer-events-none absolute -top-12 left-1/2 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-[#7e56c2]/10 blur-3xl dark:bg-[#7e56c2]/10" />

      <div className="mx-auto max-w-[1536px]">
        {/* Full-Width Slide-Ready Compact Metrics Grid (5 balanced columns) */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5 lg:grid-cols-5">
          {/* Metric 1: Total Subjects */}
          <div className="rounded-lg border border-purple-100 bg-purple-50/70 px-3 py-1.5 text-center dark:border-purple-900/40 dark:bg-purple-950/30">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Subjects
            </div>
            <div className="text-base font-black tracking-tight text-[#7e56c2] sm:text-lg">
              {stats.totalSubjects.toLocaleString()}
            </div>
          </div>

          {/* Metric 2: Autonomous Nodes */}
          <div className="rounded-lg border border-emerald-100 bg-emerald-50/70 px-3 py-1.5 text-center dark:border-emerald-900/40 dark:bg-emerald-950/30">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Federated Nodes
            </div>
            <div className="text-base font-black tracking-tight text-emerald-700 dark:text-emerald-400 sm:text-lg">
              {stats.totalNodes}+
            </div>
          </div>

          {/* Metric 3: Communities & Consortia */}
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-center dark:border-slate-700 dark:bg-slate-800/60">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Communities
            </div>
            <div className="text-base font-black tracking-tight text-slate-900 dark:text-white sm:text-lg">
              {stats.totalCommunities}
            </div>
          </div>

          {/* Metric 4: Participating Institutes */}
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-center dark:border-slate-700 dark:bg-slate-800/60">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Global Institutes
            </div>
            <div className="text-base font-black tracking-tight text-slate-900 dark:text-white sm:text-lg">
              {stats.institutesCount}+
            </div>
          </div>

          {/* Metric 5: Jurisdictions */}
          <div className="col-span-2 rounded-lg border border-amber-100 bg-amber-50/70 px-3 py-1.5 text-center dark:border-amber-900/40 dark:bg-amber-950/30 sm:col-span-1">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Jurisdictions
            </div>
            <div className="text-base font-black tracking-tight text-amber-700 dark:text-amber-400 sm:text-lg">
              {stats.countriesCount} Countries
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
