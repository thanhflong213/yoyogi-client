import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Mail, Calendar, Award, BookOpen, TrendingUp, Settings } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ProfilePage = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-linear-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center">
            <User className="h-12 w-12 md:h-16 md:w-16 text-blue-600" />
          </div>
          <div className="text-center md:text-left flex-1">
            <h1 className="text-2xl md:text-4xl font-bold mb-2">Test User</h1>
            <p className="text-blue-100">test@example.com</p>
            <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                Student
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                Member since Jan 2024
              </span>
            </div>
          </div>
          <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
            <Settings className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Exams Taken</CardDescription>
            <CardTitle className="text-3xl">12</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-green-600">
              <TrendingUp className="h-4 w-4" />
              <span>+3 this month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Average Score</CardDescription>
            <CardTitle className="text-3xl">78%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-green-600">
              <TrendingUp className="h-4 w-4" />
              <span>+5% improvement</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Study Time</CardDescription>
            <CardTitle className="text-3xl">24h</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>This month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Achievements</CardDescription>
            <CardTitle className="text-3xl">8</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Award className="h-4 w-4" />
              <span>Badges earned</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Profile Details */}
      <Tabs defaultValue="info" className="space-y-4">
        <TabsList>
          <TabsTrigger value="info">
            <User className="h-4 w-4 mr-2" />
            Personal Info
          </TabsTrigger>
          <TabsTrigger value="preferences">
            <Settings className="h-4 w-4 mr-2" />
            Preferences
          </TabsTrigger>
          <TabsTrigger value="achievements">
            <Award className="h-4 w-4 mr-2" />
            Achievements
          </TabsTrigger>
        </TabsList>

        <TabsContent value="info">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Manage your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue="Test User" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="test@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input id="dob" type="date" />
                </div>
              </div>
              <Button className="mt-4">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Customize your learning experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Language Preference</Label>
                <p className="text-sm text-gray-600">Current: English</p>
              </div>
              <div className="space-y-2">
                <Label>Study Goal</Label>
                <Input placeholder="e.g., Pass university entrance exam" />
              </div>
              <div className="space-y-2">
                <Label>Daily Study Target</Label>
                <Input type="number" placeholder="Minutes per day" />
              </div>
              <Button className="mt-4">Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements">
          <Card>
            <CardHeader>
              <CardTitle>Your Achievements</CardTitle>
              <CardDescription>Badges and milestones you've earned</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'First Exam', icon: '🎯' },
                  { name: '5 Exams Complete', icon: '📚' },
                  { name: 'Perfect Score', icon: '💯' },
                  { name: '7 Day Streak', icon: '🔥' },
                  { name: 'Math Master', icon: '🧮' },
                  { name: 'English Expert', icon: '📝' },
                  { name: 'Quick Learner', icon: '⚡' },
                  { name: 'Dedicated Student', icon: '🏆' },
                ].map((achievement, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200"
                  >
                    <span className="text-4xl">{achievement.icon}</span>
                    <span className="text-sm font-medium text-center">{achievement.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;

