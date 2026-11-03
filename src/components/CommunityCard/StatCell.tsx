import Skeleton from '@mui/material/Skeleton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import type { StatsStatus } from '~/utils/types';

interface StatCellProps {
  label: string;
  value?: number;
  status: StatsStatus;
}

export function StatCell({ label, value, status }: StatCellProps) {
  const dataCy = `stat-cell-${label.toLowerCase()}`;

  let content;
  if (status === 'loading') {
    content = <Skeleton variant="text" width={56} data-cy={`${dataCy}-loading`} />;
  } else if (status === 'error' || value === undefined) {
    content = (
      <Tooltip title="Live stats are currently unavailable for this community" placement="top">
        <span data-cy={`${dataCy}-error`}>—</span>
      </Tooltip>
    );
  } else {
    content = value;
  }

  return (
    <div className="grid grid-cols-[6rem_1fr] items-center" data-cy={dataCy}>
      <Typography variant="body2">{label}</Typography>
      <Typography variant="body2" component="div" className="font-medium">
        {content}
      </Typography>
    </div>
  );
}
