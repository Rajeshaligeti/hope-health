import { memo } from 'react';
import HealthVideos from '@/components/HealthVideos';

const HealthVideosPage = memo(() => {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        <HealthVideos />
      </div>
    </div>
  );
});

HealthVideosPage.displayName = 'HealthVideosPage';

export default HealthVideosPage;