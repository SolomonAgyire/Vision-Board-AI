
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Download, Share, Heart, ArrowLeft, Sparkles } from 'lucide-react';

interface MoodBoard {
  id: string;
  image: string;
  description: string;
  style: string;
  roomType: string;
  createdAt: string;
}

const ResultPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [isSaved, setIsSaved] = useState(false);
  const [moodBoard, setMoodBoard] = useState<MoodBoard | null>(null);

  useEffect(() => {
    // Simulate AI-generated mood board
    const questionnaireData = JSON.parse(localStorage.getItem('questionnaireData') || '{}');
    
    // Generate mock mood board based on questionnaire
    const mockMoodBoard: MoodBoard = {
      id: `mb_${Date.now()}`,
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
      description: `A stunning ${questionnaireData.designStyle || 'modern'} ${questionnaireData.roomType || 'living room'} featuring ${questionnaireData.colorPalette?.join(', ') || 'neutral tones'}. This design combines comfort with style, incorporating carefully selected furniture pieces, lighting, and decor elements that reflect your personal aesthetic preferences. The space balances functionality with visual appeal, creating an environment that's both livable and inspiring.`,
      style: questionnaireData.designStyle || 'modern',
      roomType: questionnaireData.roomType || 'living room',
      createdAt: new Date().toISOString()
    };

    setMoodBoard(mockMoodBoard);
  }, []);

  const handleDownload = () => {
    // In a real app, this would download the image
    toast({
      title: "Download Started",
      description: "Your mood board is being downloaded to your device.",
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My AI-Generated Mood Board',
        text: 'Check out my personalized interior design mood board!',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Share link copied to clipboard!",
      });
    }
  };

  const handleSave = () => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please log in to save mood boards to your history.",
        variant: "destructive"
      });
      return;
    }

    if (!moodBoard) return;

    // Save to localStorage (in real app, this would be an API call)
    const savedMoodBoards = JSON.parse(localStorage.getItem('moodboards') || '[]');
    savedMoodBoards.push(moodBoard);
    localStorage.setItem('moodboards', JSON.stringify(savedMoodBoards));
    
    setIsSaved(true);
    toast({
      title: "Mood Board Saved!",
      description: "Added to your personal history.",
    });
  };

  if (!moodBoard) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="w-6 h-6 text-orange-500" />
            <h1 className="text-3xl font-bold text-slate-800">Your Mood Board</h1>
          </div>
          <p className="text-slate-600">
            Crafted specifically for your {moodBoard.style} {moodBoard.roomType}
          </p>
        </div>

        {/* Mood Board Display */}
        <Card className="shadow-2xl mb-8 overflow-hidden">
          <CardContent className="p-0">
            <div className="relative">
              <img 
                src={moodBoard.image}
                alt="AI Generated Mood Board"
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-sm font-medium text-slate-700">AI Generated</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button
            onClick={handleDownload}
            className="flex items-center space-x-2 bg-slate-600 hover:bg-slate-700"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </Button>
          
          <Button
            onClick={handleShare}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <Share className="w-4 h-4" />
            <span>Share</span>
          </Button>
          
          <Button
            onClick={handleSave}
            disabled={isSaved || !isAuthenticated}
            className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50"
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            <span>{isSaved ? 'Saved' : 'Save to History'}</span>
          </Button>
        </div>

        {/* Description */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">
              Design Description
            </h3>
            <p className="text-slate-600 leading-relaxed">
              {moodBoard.description}
            </p>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => navigate('/questionnaire')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Create Another</span>
          </Button>
          
          {isAuthenticated && (
            <Button
              onClick={() => navigate('/history')}
              className="bg-orange-500 hover:bg-orange-600"
            >
              View History
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
