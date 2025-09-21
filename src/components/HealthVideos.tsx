import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, ExternalLink, Heart, Activity, Brain, Utensils, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useHealthVideos } from '@/hooks/useHealthAPI';

interface HealthVideo {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  thumbnail: string;
  youtubeId: string;
  views: string;
  channel: string;
}

const HealthVideos = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedVideo, setSelectedVideo] = useState<HealthVideo | null>(null);
  const { videos, loading, error, fetchVideos } = useHealthVideos();

  const categories = [
    { id: 'all', label: 'All Videos', icon: Activity },
    { id: 'fitness', label: 'Fitness & Exercise', icon: Activity },
    { id: 'nutrition', label: 'Nutrition', icon: Utensils },
    { id: 'mental', label: 'Mental Health', icon: Brain },
    { id: 'heart', label: 'Heart Health', icon: Heart },
  ];

  useEffect(() => {
    const getVideosForCategory = () => {
      const queries = {
        all: 'health wellness exercise meditation',
        fitness: 'fitness exercise workout',
        nutrition: 'nutrition healthy eating diet',
        mental: 'meditation mindfulness mental health',
        heart: 'heart health cardiovascular'
      };
      return queries[selectedCategory as keyof typeof queries] || queries.all;
    };

    fetchVideos(getVideosForCategory());
  }, [selectedCategory, fetchVideos]);

  const filteredVideos = videos;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'fitness': return 'bg-[hsl(var(--health-excellent))] text-white';
      case 'nutrition': return 'bg-[hsl(var(--health-good))] text-white';
      case 'mental': return 'bg-[hsl(var(--primary))] text-white';
      case 'heart': return 'bg-[hsl(var(--health-critical))] text-white';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const playVideo = (video: HealthVideo) => {
    setSelectedVideo(video);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="font-orbitron font-bold text-3xl mb-2">Health & Wellness Videos</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Curated collection of expert-approved health and wellness content to support your journey
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category.id)}
              className="gap-2"
              size="sm"
            >
              <Icon className="w-4 h-4" />
              {category.label}
            </Button>
          );
        })}
      </div>

      {/* Video Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="ml-2">Loading health videos...</span>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">{error}</p>
          <Button onClick={() => fetchVideos()} className="mt-4">
            Try Again
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <Card key={video.id} className="card-health overflow-hidden group cursor-pointer"
                  onClick={() => playVideo(video)}>
              <div className="relative">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="p-3 rounded-full bg-primary text-primary-foreground">
                    <Play className="w-6 h-6" fill="currentColor" />
                  </div>
                </div>
                <Badge className={cn("absolute top-2 right-2", getCategoryColor(video.category))}>
                  {categories.find(c => c.id === video.category)?.label.split(' ')[0]}
                </Badge>
                <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                  {video.duration}
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {video.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {video.description}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{video.channel || 'Health Channel'}</span>
                  <span>{video.views || 'N/A'} views</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-semibold text-lg">{selectedVideo.title}</h3>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open(`https://youtube.com/watch?v=${selectedVideo.youtubeId}`, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  YouTube
                </Button>
                <Button variant="outline" size="sm" onClick={closeVideo}>
                  ✕
                </Button>
              </div>
            </div>
            
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            
            <div className="p-4">
              <Badge className={cn("mb-2", getCategoryColor(selectedVideo.category))}>
                {categories.find(c => c.id === selectedVideo.category)?.label}
              </Badge>
              <p className="text-muted-foreground text-sm mb-2">{selectedVideo.description}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>Channel: {selectedVideo.channel}</span>
                <span>Duration: {selectedVideo.duration}</span>
                <span>Views: {selectedVideo.views}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthVideos;