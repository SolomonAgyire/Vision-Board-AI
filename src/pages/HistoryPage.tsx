
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Download, Share, Trash2, Plus, Calendar } from 'lucide-react';

interface MoodBoard {
  id: string;
  image: string;
  description: string;
  style: string;
  roomType: string;
  createdAt: string;
}

const HistoryPage = () => {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [moodBoards, setMoodBoards] = useState<MoodBoard[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      const savedMoodBoards = JSON.parse(localStorage.getItem('moodboards') || '[]');
      setMoodBoards(savedMoodBoards);
    }
  }, [isAuthenticated]);

  const handleDownload = (moodBoard: MoodBoard) => {
    toast({
      title: "Download Started",
      description: `Downloading ${moodBoard.style} mood board.`,
    });
  };

  const handleShare = (moodBoard: MoodBoard) => {
    if (navigator.share) {
      navigator.share({
        title: `${moodBoard.style} Mood Board`,
        text: `Check out this ${moodBoard.style} ${moodBoard.roomType} design!`,
        url: window.location.origin,
      });
    } else {
      navigator.clipboard.writeText(window.location.origin);
      toast({
        title: "Link Copied",
        description: "Share link copied to clipboard!",
      });
    }
  };

  const handleDelete = (id: string) => {
    const updatedMoodBoards = moodBoards.filter(mb => mb.id !== id);
    setMoodBoards(updatedMoodBoards);
    localStorage.setItem('moodboards', JSON.stringify(updatedMoodBoards));
    toast({
      title: "Mood Board Deleted",
      description: "The mood board has been removed from your history.",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">Login Required</h1>
          <p className="text-slate-600 dark:text-slate-300 mb-8">
            Please log in to view your saved mood boards.
          </p>
          <Link to="/">
            <Button className="bg-orange-500 hover:bg-orange-600">
              Go to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">
            My Boards
          </h1>
          <p className="text-slate-600 dark:text-slate-300 mb-8">
            All your saved AI-generated interior design inspirations
          </p>
          <Link to="/questionnaire">
            <Button className="bg-orange-500 hover:bg-orange-600 flex items-center space-x-2 mx-auto">
              <Plus className="w-4 h-4" />
              <span>Create New Mood Board</span>
            </Button>
          </Link>
        </div>

        {/* Mood Boards Grid */}
        {moodBoards.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Calendar className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">No Saved Mood Boards</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              Your saved mood boards will appear here. Try creating your first one!
            </p>
            <Link to="/questionnaire">
              <Button variant="outline">
                Create Your First Mood Board
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {moodBoards.map((moodBoard) => (
              <Card key={moodBoard.id} className="overflow-hidden transition-all duration-300 hover:shadow-xl bg-white dark:bg-slate-800">
                <CardContent className="p-0">
                  <div className="relative">
                    <img 
                      src={moodBoard.image}
                      alt={`${moodBoard.style} Mood Board`}
                      className="w-full h-56 object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <Button
                        variant="destructive"
                        size="icon"
                        className="h-8 w-8 rounded-full bg-white/80 hover:bg-white border text-slate-600 hover:text-red-600 shadow-lg"
                        onClick={() => handleDelete(moodBoard.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-800 dark:text-white capitalize">
                          {moodBoard.style} {moodBoard.roomType}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center mt-1">
                          <Calendar className="w-3 h-3 mr-1" />
                          {formatDate(moodBoard.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center space-x-1"
                        onClick={() => handleDownload(moodBoard)}
                      >
                        <Download className="w-3 h-3" />
                        <span>Download</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center space-x-1"
                        onClick={() => handleShare(moodBoard)}
                      >
                        <Share className="w-3 h-3" />
                        <span>Share</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
