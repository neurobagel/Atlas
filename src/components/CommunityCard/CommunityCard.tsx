import { useState } from 'react';
import type { MouseEvent } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import type { Community, CommunityNode, CommunityStats } from '~/utils/types';
import { StatCell } from './StatCell';

const AVATAR_COLORS = [
  '#D9748D',
  '#4F7CAC',
  '#5B9A8B',
  '#C08A3E',
  '#7A6BB0',
  '#B35C44',
  '#5E8C3A',
  '#9B5A8E',
  '#5A6B7B',
];

// Picks a stable colour per community so the fallback avatar doesn't change between renders.
// Multiplying by 31 makes each character's position count, so similar ids spread out.
function avatarColor(id: string) {
  const hash = [...id].reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) >>> 0, 0);
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

// Keeps clicks on inner controls from also selecting the card
function stopPropagation(event: MouseEvent) {
  event.stopPropagation();
}

interface CommunityCardProps {
  community: Community;
  nodes: CommunityNode[];
  stats?: CommunityStats;
  isSelected: boolean;
  onSelect: (communityId: string) => void;
}

export function CommunityCard({
  community,
  nodes,
  stats,
  isSelected,
  onSelect,
}: CommunityCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const isActive = community.status === 'active';
  // An active community without stats yet is about to be fetched
  const statsStatus = stats?.status ?? 'loading';
  const nodeListId = `community-${community.id}-nodes`;

  return (
    <Card
      variant="outlined"
      onClick={() => onSelect(community.id)}
      // Styled with sx rather than Tailwind so these reliably override MUI's own border styles
      sx={{
        p: 2,
        borderStyle: isActive || isSelected ? 'solid' : 'dashed',
        borderColor: isSelected ? 'primary.main' : 'grey.400',
        // Thickens the selected border with a shadow, since a wider border would shift the layout
        boxShadow: (theme) => (isSelected ? `0 0 0 1px ${theme.palette.primary.main}` : 'none'),
        // MUI animates box-shadow by default, which would make the highlight lag behind the click
        transition: 'none',
        bgcolor: isActive ? 'background.paper' : 'grey.50',
      }}
      data-cy={`community-card-${community.id}`}
    >
      <div className="flex min-h-8 items-center justify-between gap-2">
        <Chip
          size="small"
          label={isActive ? 'Active' : 'Onboarding'}
          color={isActive ? 'success' : undefined}
          sx={isActive ? undefined : { bgcolor: '#FACC15', color: 'rgba(0, 0, 0, 0.87)' }}
          data-cy={`community-card-${community.id}-status`}
        />
        {nodes.length > 0 && (
          <Button
            variant="outlined"
            size="small"
            startIcon={isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            sx={{ bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08) }}
            aria-expanded={isExpanded}
            aria-controls={nodeListId}
            onClick={(event) => {
              stopPropagation(event);
              setIsExpanded((expanded) => !expanded);
            }}
            data-cy={`community-card-${community.id}-toggle`}
          >
            {isExpanded ? 'Less info' : 'More info'}
          </Button>
        )}
      </div>

      <div className="mt-3 flex items-start gap-4">
        {community.logoUrl ? (
          <img
            src={community.logoUrl}
            alt={`${community.name} logo`}
            className="h-24 w-32 shrink-0 object-contain"
          />
        ) : (
          <Avatar
            variant="rounded"
            sx={{ bgcolor: avatarColor(community.id), width: 128, height: 96, fontSize: '2.5rem' }}
            data-cy={`community-card-${community.id}-avatar`}
          >
            {community.name.charAt(0).toUpperCase()}
          </Avatar>
        )}
        <div className="min-w-0 flex-1">
          <Typography variant="subtitle1" component="h3" className="font-bold leading-tight">
            {community.name}
          </Typography>
          {community.fullName && (
            <Typography variant="body2" color="text.secondary">
              {community.fullName}
            </Typography>
          )}
          {community.contact && (
            <Typography variant="body2" data-cy={`community-card-${community.id}-contact`}>
              Contact: {community.contact.name}
              {community.contact.role && ` (${community.contact.role})`}
            </Typography>
          )}

          <div className="mt-3">
            {community.status === 'active' ? (
              <>
                <StatCell label="Subjects" value={stats?.subjects} status={statsStatus} />
                <StatCell label="Nodes" value={stats?.nodes} status={statsStatus} />
                <StatCell label="Datasets" value={stats?.datasets} status={statsStatus} />
              </>
            ) : (
              <Typography
                variant="body2"
                color="text.secondary"
                className="italic"
                data-cy={`community-card-${community.id}-projected-stats`}
              >
                {community.projectedStats ?? 'Projected stats coming soon'}
              </Typography>
            )}
          </div>
        </div>
      </div>

      {nodes.length > 0 && (
        <Collapse in={isExpanded}>
          <div id={nodeListId} className="mt-3" data-cy={nodeListId}>
            <Typography variant="body2" className="font-bold">
              Nodes:
            </Typography>
            <ul className="my-1 pl-6">
              {nodes.map((node) => (
                <li key={node.id}>
                  <Typography variant="body2">
                    {node.name} (
                    <Typography component="span" variant="body2" color="primary.main">
                      {node.city}, {node.country}
                    </Typography>
                    )
                  </Typography>
                </li>
              ))}
            </ul>
          </div>
        </Collapse>
      )}

      {community.status === 'active' && (
        <Button
          variant="contained"
          fullWidth
          startIcon={<OpenInNewIcon />}
          href={community.queryToolUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={stopPropagation}
          sx={{ mt: 2, fontWeight: 600 }}
          data-cy={`community-card-${community.id}-query-button`}
        >
          Query subjects here
        </Button>
      )}
    </Card>
  );
}
