'use client';

import { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { User, Mail, Calendar, Target, Award, Edit, Save, Camera, TrendingUp } from 'lucide-react';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    email: 'alex@example.com',
    joinDate: '2024-01-15',
    dietaryPreferences: ['Vegetarian', 'Gluten-Free'],
    cookingLevel: 'Intermediate',
    favoriteCuisines: ['Italian', 'Mexican', 'Asian'],
    goals: ['Reduce food waste', 'Cook 5 new recipes/month'],
    achievements: ['100 Recipes Cooked', 'Zero Waste Week', 'Master Chef Challenge'],
  });

  const [editForm, setEditForm] = useState(profile);

  const stats = [
    { label: 'Recipes Cooked', value: '142', change: '+12%' },
    { label: 'Time Saved', value: '85h', change: '+8h' },
    { label: 'Money Saved', value: '$560', change: '+15%' },
    { label: 'Food Waste', value: '↓ 45%', change: 'Improving' },
  ];

  const recentActivity = [
    { action: 'Completed "Pasta Master" recipe', time: '2 hours ago', points: 50 },
    { action: 'Reduced food waste by 15% this week', time: '1 day ago', points: 100 },
    { action: 'Helped 3 friends with recipes', time: '2 days ago', points: 75 },
    { action: 'Learned new knife skills', time: '3 days ago', points: 30 },
  ];

  const handleSave = () => {
    setProfile(editForm);
    setIsEditing(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Profile</h1>
          <p className="text-gray-400">Your cooking journey and achievements</p>
        </div>
        <Button
          variant={isEditing ? "primary" : "secondary"}
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="flex items-center gap-2"
        >
          {isEditing ? <Save size={18} /> : <Edit size={18} />}
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </div>

      {/* Profile Header */}
      <Card>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Avatar */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-linear-to-br from-primary-500 to-primary-600 flex items-center justify-center relative">
              <User size={48} className="text-white" />
              {isEditing && (
                <button className="absolute bottom-0 right-0 p-2 bg-dark-500 rounded-full border-2 border-primary-500">
                  <Camera size={16} />
                </button>
              )}
            </div>
            <div className="text-center mt-4">
              <div className="inline-flex items-center px-4 py-2 bg-primary-500/20 rounded-full">
                <Award size={16} className="mr-2" />
                <span className="font-semibold">Level 8 Chef</span>
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="input-field w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="input-field w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Cooking Level</label>
                    <select
                      value={editForm.cookingLevel}
                      onChange={(e) => setEditForm({ ...editForm, cookingLevel: e.target.value })}
                      className="input-field w-full"
                    >
                      {['Beginner', 'Intermediate', 'Advanced', 'Expert'].map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Join Date</label>
                    <input
                      type="date"
                      value={editForm.joinDate}
                      onChange={(e) => setEditForm({ ...editForm, joinDate: e.target.value })}
                      className="input-field w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Dietary Preferences</label>
                  <div className="flex flex-wrap gap-2">
                    {['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Keto', 'Paleo'].map(pref => (
                      <button
                        key={pref}
                        onClick={() => {
                          const newPrefs = editForm.dietaryPreferences.includes(pref)
                            ? editForm.dietaryPreferences.filter(p => p !== pref)
                            : [...editForm.dietaryPreferences, pref];
                          setEditForm({ ...editForm, dietaryPreferences: newPrefs });
                        }}
                        className={`px-4 py-2 rounded-full transition-colors ${
                          editForm.dietaryPreferences.includes(pref)
                            ? 'bg-primary-500 text-white'
                            : 'bg-dark-300 hover:bg-dark-200'
                        }`}
                      >
                        {pref}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Favorite Cuisines</label>
                  <div className="flex flex-wrap gap-2">
                    {['Italian', 'Mexican', 'Asian', 'Indian', 'Mediterranean', 'American'].map(cuisine => (
                      <button
                        key={cuisine}
                        onClick={() => {
                          const newCuisines = editForm.favoriteCuisines.includes(cuisine)
                            ? editForm.favoriteCuisines.filter(c => c !== cuisine)
                            : [...editForm.favoriteCuisines, cuisine];
                          setEditForm({ ...editForm, favoriteCuisines: newCuisines });
                        }}
                        className={`px-4 py-2 rounded-full transition-colors ${
                          editForm.favoriteCuisines.includes(cuisine)
                            ? 'bg-primary-500 text-white'
                            : 'bg-dark-300 hover:bg-dark-200'
                        }`}
                      >
                        {cuisine}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold">{profile.name}</h2>
                  <p className="text-gray-400">{profile.email}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 rounded-full bg-blue-500/20">
                      <Calendar className="text-blue-400" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Member Since</p>
                      <p className="font-semibold">{new Date(profile.joinDate).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="p-3 rounded-full bg-green-500/20">
                      <Target className="text-green-400" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Cooking Level</p>
                      <p className="font-semibold">{profile.cookingLevel}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Dietary Preferences</h4>
                  <div className="flex flex-wrap gap-2">
                    {profile.dietaryPreferences.map(pref => (
                      <span key={pref} className="px-4 py-2 bg-primary-500/20 rounded-full">
                        {pref}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Favorite Cuisines</h4>
                  <div className="flex flex-wrap gap-2">
                    {profile.favoriteCuisines.map(cuisine => (
                      <span key={cuisine} className="px-4 py-2 bg-blue-500/20 rounded-full">
                        {cuisine}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <Card key={idx} hover={false}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <div className="text-right">
                <div className="inline-flex items-center px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                  <TrendingUp size={12} className="mr-1" />
                  {stat.change}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Goals */}
        <Card>
          <h3 className="text-xl font-bold mb-6 flex items-center">
            <Target className="mr-2" />
            Cooking Goals
          </h3>
          <div className="space-y-4">
            {profile.goals.map((goal, idx) => (
              <div key={idx} className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                <div className="flex-1">
                  <p className="font-medium">{goal}</p>
                  <div className="w-full h-2 bg-dark-300 rounded-full mt-2">
                    <div 
                      className="h-full bg-linear-to-r from-primary-500 to-primary-600 rounded-full"
                      style={{ width: `${Math.random() * 50 + 50}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{Math.floor(Math.random() * 30 + 70)}% complete</p>
                </div>
              </div>
            ))}
          </div>
          {isEditing && (
            <div className="mt-6">
              <input
                type="text"
                placeholder="Add new goal..."
                className="input-field w-full"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.target.value) {
                    setEditForm({
                      ...editForm,
                      goals: [...editForm.goals, e.target.value]
                    });
                    e.target.value = '';
                  }
                }}
              />
            </div>
          )}
        </Card>

        {/* Achievements */}
        <Card>
          <h3 className="text-xl font-bold mb-6 flex items-center">
            <Award className="mr-2" />
            Achievements
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {profile.achievements.map((achievement, idx) => (
              <div key={idx} className="bg-linear-to-br from-primary-500/10 to-primary-600/10 border border-primary-500/20 rounded-xl p-4 text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary-500/20 flex items-center justify-center">
                  <Award size={20} className="text-primary-400" />
                </div>
                <p className="font-semibold text-sm">{achievement}</p>
                <p className="text-xs text-gray-500 mt-1">Unlocked 2 weeks ago</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivity.map((activity, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 rounded-lg hover:bg-dark-300/50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center">
                  <span className="text-lg">🎯</span>
                </div>
                <div>
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm">
                  +{activity.points} pts
                </div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}