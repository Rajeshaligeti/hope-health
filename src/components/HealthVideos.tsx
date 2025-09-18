import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, ExternalLink, Heart, Activity, Brain, Utensils } from 'lucide-react';
import { cn } from '@/lib/utils';

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

  const categories = [
    { id: 'all', label: 'All Videos', icon: Activity },
    { id: 'fitness', label: 'Fitness & Exercise', icon: Activity },
    { id: 'nutrition', label: 'Nutrition', icon: Utensils },
    { id: 'mental', label: 'Mental Health', icon: Brain },
    { id: 'heart', label: 'Heart Health', icon: Heart },
  ];

  const healthVideos: HealthVideo[] = [
    {
      id: '1',
      title: '10-Minute Morning Workout Routine',
      description: 'Start your day with this energizing full-body workout that requires no equipment.',
      duration: '10:45',
      category: 'fitness',
      thumbnail: 'https://img.youtube.com/vi/ml6cT4AZdqI/maxresdefault.jpg',
      youtubeId: 'ml6cT4AZdqI',
      views: '2.1M',
      channel: 'FitnessBlender'
    },
    {
      id: '2',
      title: 'Mediterranean Diet Explained',
      description: 'Learn about the health benefits of the Mediterranean diet and how to get started.',
      duration: '15:30',
      category: 'nutrition',
      thumbnail: 'https://img.youtube.com/vi/5S6-v37nOtY/maxresdefault.jpg',
      youtubeId: '5S6-v37nOtY',
      views: '850K',
      channel: 'Nutrition Made Simple'
    },
    {
      id: '3',
      title: '5-Minute Meditation for Stress Relief',
      description: 'Quick guided meditation to help reduce stress and anxiety in your daily life.',
      duration: '5:15',
      category: 'mental',
      thumbnail: 'https://img.youtube.com/vi/ZToicYcHIOU/maxresdefault.jpg',
      youtubeId: 'ZToicYcHIOU',
      views: '1.5M',
      channel: 'Headspace'
    },
    {
      id: '4',
      title: 'Heart-Healthy Foods You Should Eat',
      description: 'Discover the top foods that can help improve your cardiovascular health.',
      duration: '12:20',
      category: 'heart',
      thumbnail: 'https://img.youtube.com/vi/DTVgB9hRhxw/maxresdefault.jpg',
      youtubeId: 'DTVgB9hRhxw',
      views: '920K',
      channel: 'Heart Foundation'
    },
    {
      id: '5',
      title: 'Yoga for Better Sleep',
      description: 'Gentle yoga poses to help you relax and prepare for a restful night\'s sleep.',
      duration: '20:15',
      category: 'fitness',
      thumbnail: 'https://img.youtube.com/vi/BiWDsfZ3I2w/maxresdefault.jpg',
      youtubeId: 'BiWDsfZ3I2w',
      views: '1.2M',
      channel: 'Yoga with Adriene'
    },
    {
      id: '6',
      title: 'Mindful Eating Techniques',
      description: 'Learn how to develop a healthier relationship with food through mindful eating.',
      duration: '8:45',
      category: 'nutrition',
      thumbnail: 'https://img.youtube.com/vi/6tw93IgfL0E/maxresdefault.jpg',
      youtubeId: '6tw93IgfL0E',
      views: '650K',
      channel: 'Mindful Schools'
    }
  ];

  const filteredVideos = selectedCategory === 'all' 
    ? healthVideos 
    : healthVideos.filter(video => video.category === selectedCategory);

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
                <span>{video.channel}</span>
                <span>{video.views} views</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

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