import { useGetCurrentUser } from "@/lib/react-query/queries";
import { Loader } from "@/components/shared";
import WellnessDashboard from "@/components/shared/WellnessDashboard";
import ProgressTracker from "@/components/shared/ProgressTracker";
import MoodTracker from "@/components/shared/MoodTracker";
import { BarChart3, Trophy, Target, Sparkles, Flame, Star, Award } from 'lucide-react';

const Dashboard = () => {
    const { data: currentUser, isLoading } = useGetCurrentUser();

    if (isLoading) {
        return (
            <div className="flex flex-1">
                <div className="common-container">
                    <div className="flex flex-col items-center justify-center py-12">
                        <Loader />
                        <p className="text-gray-600 mt-4">Loading your wellness dashboard...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-1">
            <div className="common-container">
                {/* Welcome Banner */}
                <div className="relative w-full mb-8 p-6 md:p-8 bg-gradient-to-r from-blue-50 via-blue-100 to-indigo-50 rounded-3xl border border-blue-200 overflow-hidden shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/50 to-transparent"></div>
                    <div className="relative z-10 text-center">
                        <div className="flex flex-col md:flex-row items-center justify-center gap-3 mb-4">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-md">
                                <BarChart3 className="w-5 h-5 md:w-6 md:h-6 text-white" />
                            </div>
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                                Wellness Dashboard
                            </h1>
                        </div>
                        <p className="text-gray-700 text-base md:text-lg mb-4 max-w-2xl mx-auto px-4">
                            Track your journey to well-being, {currentUser?.name || 'Wellness Seeker'}
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs md:text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span>Active Goals</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                                <span>Daily Tracking</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                                <span>Progress Analytics</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Header */}
                <div className="flex flex-col gap-4 mb-8">
                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="bg-white border-2 border-yellow-200 rounded-2xl p-4 md:p-6 shadow-md hover:shadow-lg transition-shadow">
                            <div className="flex items-center gap-3 mb-2">
                                <Trophy className="w-5 h-5 md:w-6 md:h-6 text-yellow-500" />
                                <h3 className="text-base md:text-lg font-semibold text-gray-900">Achievements</h3>
                            </div>
                            <p className="text-xl md:text-2xl font-bold text-gray-900">12</p>
                            <p className="text-xs md:text-sm text-gray-600">3 new this week</p>
                        </div>

                        <div className="bg-white border-2 border-green-200 rounded-2xl p-4 md:p-6 shadow-md hover:shadow-lg transition-shadow">
                            <div className="flex items-center gap-3 mb-2">
                                <Target className="w-5 h-5 md:w-6 md:h-6 text-green-500" />
                                <h3 className="text-base md:text-lg font-semibold text-gray-900">Goals</h3>
                            </div>
                            <p className="text-xl md:text-2xl font-bold text-gray-900">8/10</p>
                            <p className="text-xs md:text-sm text-gray-600">Weekly targets</p>
                        </div>

                        <div className="bg-white border-2 border-purple-200 rounded-2xl p-4 md:p-6 shadow-md hover:shadow-lg transition-shadow sm:col-span-2 lg:col-span-1">
                            <div className="flex items-center gap-3 mb-2">
                                <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-purple-500" />
                                <h3 className="text-base md:text-lg font-semibold text-gray-900">Wellness Score</h3>
                            </div>
                            <p className="text-xl md:text-2xl font-bold text-gray-900">85%</p>
                            <p className="text-xs md:text-sm text-gray-600">+5% from last week</p>
                        </div>
                    </div>
                </div>

                {/* Main Dashboard Content */}
                <div className="space-y-6">
                    {/* Top Row - Progress and Streaks */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Progress Tracker */}
                        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-lg">
                            <ProgressTracker />
                        </div>

                        {/* Achievement System - Streaks Only */}
                        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-lg">
                            <div className="flex items-center gap-3 mb-6">
                                <Flame className="w-6 h-6 text-orange-500" />
                                <h3 className="text-xl font-bold text-gray-900">Wellness Streaks</h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-gray-700">Journal</span>
                                        <Flame className="w-4 h-4 text-orange-400" />
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900">5</div>
                                    <div className="text-xs text-gray-600">Best: 12 days</div>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-gray-700">Meditation</span>
                                        <Flame className="w-4 h-4 text-orange-400" />
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900">3</div>
                                    <div className="text-xs text-gray-600">Best: 8 days</div>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-gray-700">Mood Tracking</span>
                                        <Flame className="w-4 h-4 text-orange-400" />
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900">7</div>
                                    <div className="text-xs text-gray-600">Best: 15 days</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Middle Row - Wellness Overview */}
                    <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-lg">
                        <WellnessDashboard />
                    </div>

                    {/* Bottom Row - Achievements and Mood Tracker */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        {/* Achievements */}
                        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-lg">
                            <div className="flex items-center gap-3 mb-6">
                                <Trophy className="w-6 h-6 text-yellow-500" />
                                <h3 className="text-xl font-bold text-gray-900">Achievements</h3>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="bg-gray-50 rounded-xl p-4 border-2 border-yellow-200">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="p-2 rounded-lg bg-blue-100">
                                            <Star className="w-5 h-5 text-blue-500" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 text-sm">Mindful Beginner</h4>
                                            <p className="text-xs text-gray-600">Complete your first journal entry</p>
                                        </div>
                                    </div>
                                    <div className="w-full bg-blue-500 rounded-full h-2 mb-1"></div>
                                    <div className="text-xs text-gray-600">1/1</div>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4 border-2 border-blue-200 opacity-80">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="p-2 rounded-lg bg-gray-100">
                                            <Flame className="w-5 h-5 text-blue-500" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 text-sm">Week Warrior</h4>
                                            <p className="text-xs text-gray-600">Maintain a 7-day wellness streak</p>
                                        </div>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                                        <div className="bg-blue-500 h-2 rounded-full w-3/4"></div>
                                    </div>
                                    <div className="text-xs text-gray-600">5/7</div>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4 border-2 border-purple-200 opacity-80">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="p-2 rounded-lg bg-gray-100">
                                            <Award className="w-5 h-5 text-purple-500" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 text-sm">Gratitude Master</h4>
                                            <p className="text-xs text-gray-600">Write 50 gratitude entries</p>
                                        </div>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                                        <div className="bg-blue-500 h-2 rounded-full w-1/2"></div>
                                    </div>
                                    <div className="text-xs text-gray-600">23/50</div>
                                </div>
                            </div>
                        </div>

                        {/* Mood Tracker Compact */}
                        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-lg">
                            <MoodTracker />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
