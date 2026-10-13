import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import { BookOpen } from 'lucide-react';
import logo from '../assets/logo.svg';

const GithubIcon: React.FC<{ className?: string }> = ({ className = 'h-5 w-5' }) => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface NavbarProps {
  onJoinClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onJoinClick }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Toolbar
          disableGutters
          className="flex items-center justify-between py-2.5"
          data-cy="navbar"
        >
          {/* Logo & Title matching Query Tool */}
          <div className="flex items-center">
            <img src={logo} alt="Neurobagel Logo" height="60" className="h-12 w-auto sm:h-14" />
            <div className="ml-4">
              <Typography
                variant="h5"
                component="div"
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: '1.15rem', sm: '1.35rem' },
                  color: '#1e293b',
                  lineHeight: 1.2,
                }}
              >
                Neurobagel communities explorer
              </Typography>
            </div>
          </div>

          {/* Right Action Icons & Button */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Tooltip title="Documentation">
              <IconButton
                size="small"
                href="https://neurobagel.org"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: '#64748b',
                  '&:hover': { color: '#1e293b', bgcolor: '#f1f5f9' },
                }}
                aria-label="Documentation"
              >
                <BookOpen className="h-5 w-5" />
              </IconButton>
            </Tooltip>

            <Tooltip title="GitHub">
              <IconButton
                size="small"
                href="https://github.com/neurobagel"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: '#64748b',
                  '&:hover': { color: '#1e293b', bgcolor: '#f1f5f9' },
                }}
                aria-label="Neurobagel GitHub Organization"
              >
                <GithubIcon className="h-5 w-5" />
              </IconButton>
            </Tooltip>

            <Button
              variant="contained"
              href="https://neurobagel.org/user_guide/production_deployment/#making-your-node-publicly-discoverable"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onJoinClick}
              sx={{
                bgcolor: '#7e56c2',
                color: '#ffffff',
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: '8px',
                px: 2,
                py: 0.8,
                boxShadow: 'none',
                '&:hover': {
                  bgcolor: '#6c45b0',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                },
              }}
            >
              Connect a Node
            </Button>
          </div>
        </Toolbar>
      </div>
    </header>
  );
};
