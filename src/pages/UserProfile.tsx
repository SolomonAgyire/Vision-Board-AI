
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, Palette, Camera, Sparkles } from 'lucide-react';

const UserProfile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: 'Interior design enthusiast who loves creating beautiful spaces',
    favoriteStyle: 'Modern Minimalist'
  });

  const handleSave = () => {
    // In a real app, this would update the user profile
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
        <div className="absolute top-20 left-20 w-72 h-72 bg-orange-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Sparkles className="w-6 h-6 text-orange-500" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                My Profile
              </h1>
            </div>
            <p className="text-slate-600">
              Manage your account and design preferences
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <Card className="backdrop-blur-md bg-white/30 border-white/20 shadow-2xl animate-scale-in">
                <CardContent className="p-8 text-center">
                  <div className="relative mb-6">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                      <User className="w-16 h-16 text-white" />
                    </div>
                    <button className="absolute bottom-2 right-1/2 transform translate-x-1/2 translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                      <Camera className="w-4 h-4 text-slate-600" />
                    </button>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">{formData.name}</h2>
                  <p className="text-slate-600 mb-4">{formData.email}</p>
                  <div className="flex items-center justify-center space-x-2 text-sm text-slate-500 mb-6">
                    <Palette className="w-4 h-4" />
                    <span>{formData.favoriteStyle}</span>
                  </div>
                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                  >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Profile Details */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="backdrop-blur-md bg-white/30 border-white/20 shadow-2xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Mail className="w-5 h-5 text-orange-500" />
                    <span>Personal Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-slate-700 font-medium">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        disabled={!isEditing}
                        className="mt-2 bg-white/50 border-white/30 focus:bg-white/70 transition-all"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-slate-700 font-medium">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        disabled={!isEditing}
                        className="mt-2 bg-white/50 border-white/30 focus:bg-white/70 transition-all"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="bio" className="text-slate-700 font-medium">
                      Bio
                    </Label>
                    <Input
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      disabled={!isEditing}
                      className="mt-2 bg-white/50 border-white/30 focus:bg-white/70 transition-all"
                    />
                  </div>

                  <div>
                    <Label htmlFor="favoriteStyle" className="text-slate-700 font-medium">
                      Favorite Design Style
                    </Label>
                    <Input
                      id="favoriteStyle"
                      value={formData.favoriteStyle}
                      onChange={(e) => handleInputChange('favoriteStyle', e.target.value)}
                      disabled={!isEditing}
                      className="mt-2 bg-white/50 border-white/30 focus:bg-white/70 transition-all"
                    />
                  </div>

                  {isEditing && (
                    <div className="flex space-x-4 pt-4">
                      <Button
                        onClick={handleSave}
                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                      >
                        Save Changes
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Stats Card */}
              <Card className="backdrop-blur-md bg-white/30 border-white/20 shadow-2xl animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Palette className="w-5 h-5 text-orange-500" />
                    <span>Design Journey</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-gradient-to-r from-orange-100/50 to-pink-100/50 rounded-lg backdrop-blur-sm">
                      <div className="text-2xl font-bold text-slate-800 mb-1">12</div>
                      <div className="text-sm text-slate-600">Mood Boards Created</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-r from-pink-100/50 to-purple-100/50 rounded-lg backdrop-blur-sm">
                      <div className="text-2xl font-bold text-slate-800 mb-1">5</div>
                      <div className="text-sm text-slate-600">Favorite Styles</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-r from-purple-100/50 to-orange-100/50 rounded-lg backdrop-blur-sm">
                      <div className="text-2xl font-bold text-slate-800 mb-1">3</div>
                      <div className="text-sm text-slate-600">Projects Completed</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
