import { useState } from 'react';
import { Heart, Brain, Zap, Droplets, Sun, Moon, Activity } from 'lucide-react';

interface MoodEntry {
    id: string;
    date: Date;
    mood: 1 | 2 | 3 | 4 | 5;
    energy: 1 | 2 | 3 | 4 | 5;
    stress: 1 | 2 | 3 | 4 | 5;
    sleep: number; // hours
    water: number; // glasses
    exercise: boolean;
    meditation: boolean;
    notes: string;
}

const MoodTracker = () => {
    const [todayEntry] = useState<Partial<MoodEntry>>({
        mood: 4,
        energy: 3,
        stress: 2,
        sleep: 7,
        water: 5,
        exercise: true,
        meditation: false,
        notes: 'Feeling good today! Morning yoga session was refreshing.'
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Heart className="w-6 h-6 text-red-500" />
                    <h3 className="text-xl font-bold text-gray-900">Today's Mood</h3>
                </div>
                <div className="flex items-center gap-2">
                    <Sun className="w-5 h-5 text-yellow-500" />
                    <span className="text-gray-700 font-medium text-sm">Today</span>
                </div>
            </div>

            {/* Today's Quick Summary */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                        <Heart className="w-5 h-5 text-red-500" />
                        <span className="font-medium text-gray-900 text-sm">Mood</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                        {todayEntry.mood}
                        <span className="text-sm text-gray-600 ml-1">/5</span>
                    </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                        <Zap className="w-5 h-5 text-yellow-500" />
                        <span className="font-medium text-gray-900 text-sm">Energy</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                        {todayEntry.energy}
                        <span className="text-sm text-gray-600 ml-1">/5</span>
                    </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                        <Droplets className="w-5 h-5 text-cyan-500" />
                        <span className="font-medium text-gray-900 text-sm">Water</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                        {todayEntry.water}
                        <span className="text-sm text-gray-600 ml-1">glasses</span>
                    </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                        <Moon className="w-5 h-5 text-blue-500" />
                        <span className="font-medium text-gray-900 text-sm">Sleep</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                        {todayEntry.sleep}
                        <span className="text-sm text-gray-600 ml-1">hours</span>
                    </div>
                </div>
            </div>

            {/* Activities Status */}
            <div className="grid grid-cols-2 gap-4">
                <div className={`p-3 rounded-xl border ${todayEntry.exercise
                    ? 'bg-green-50 border-green-200'
                    : 'bg-gray-50 border-gray-200'
                    }`}>
                    <div className="flex items-center gap-2">
                        <Activity className={`w-4 h-4 ${todayEntry.exercise ? 'text-green-500' : 'text-gray-400'}`} />
                        <span className="text-sm font-medium text-gray-900">Exercise</span>
                        {todayEntry.exercise && (
                            <div className="ml-auto w-2 h-2 bg-green-500 rounded-full"></div>
                        )}
                    </div>
                </div>
                <div className={`p-3 rounded-xl border ${todayEntry.meditation
                    ? 'bg-purple-50 border-purple-200'
                    : 'bg-gray-50 border-gray-200'
                    }`}>
                    <div className="flex items-center gap-2">
                        <Brain className={`w-4 h-4 ${todayEntry.meditation ? 'text-purple-500' : 'text-gray-400'}`} />
                        <span className="text-sm font-medium text-gray-900">Meditation</span>
                        {todayEntry.meditation && (
                            <div className="ml-auto w-2 h-2 bg-purple-500 rounded-full"></div>
                        )}
                    </div>
                </div>
            </div>

            {/* Quick Action Button */}
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl font-medium transition-colors">
                Update Today's Mood
            </button>
        </div>
    );
};

export default MoodTracker;
