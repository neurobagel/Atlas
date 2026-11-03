import { useState } from 'react';
import Typography from '@mui/material/Typography';
import { CommunityCard } from '~/components/CommunityCard';
import { COMMUNITIES, NODES } from '~/utils/constants';

function App() {
  const [selectedCommunityId, setSelectedCommunityId] = useState<string | null>(null);

  // Clicking the selected card again clears the selection
  const handleSelect = (communityId: string) =>
    setSelectedCommunityId((currentId) => (currentId === communityId ? null : communityId));

  return (
    <main className="mx-auto max-w-2xl p-4">
      <Typography variant="h4" component="h1" className="mb-4">
        Neurobagel Atlas
      </Typography>
      <div className="flex flex-col gap-4" data-cy="community-list">
        {COMMUNITIES.map((community) => (
          <CommunityCard
            key={community.id}
            community={community}
            nodes={NODES.filter((node) => node.communityId === community.id)}
            isSelected={community.id === selectedCommunityId}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </main>
  );
}

export default App;
