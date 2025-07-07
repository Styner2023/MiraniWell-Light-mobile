import { Models } from "appwrite";
import { Link } from "react-router-dom";
import { Loader, PostCard, UserCard } from "@/components/shared";
import { useGetRecentPosts, useGetUsers, useGetCurrentUser } from "@/lib/react-query/queries";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import {
  Heart,
  Sparkles,
  Users,
  Calendar,
  Zap,
  Star,
  TrendingUp,
  ChevronRight,
  Sunrise,
  Moon,
  Activity
} from "lucide-react";

type PostType = Models.Document & {
  caption: string;
  imageUrl: string;
  imageId: string;
  location: string;
  tags: string[];
  creator: string;
  likes: string[];
};

const Home = () => {
  const { handleQueryError } = useErrorHandler();
  const { data: currentUser } = useGetCurrentUser();
  const {
    data: posts,
    isLoading: isPostLoading,
    isError: isErrorPosts,
    error: postsError,
  } = useGetRecentPosts();
  const {
    data: creators,
    isLoading: isUserLoading,
    isError: isErrorCreators,
    error: creatorsError,
  } = useGetUsers(6);

  // Handle errors
  if (isErrorPosts && postsError) {
    handleQueryError(postsError);
  }
  if (isErrorCreators && creatorsError) {
    handleQueryError(creatorsError);
  }

  // Get current time for dynamic greeting
  const currentHour = new Date().getHours();
  const getGreeting = () => {
    if (currentHour < 12) return { text: "Good Morning", icon: Sunrise };
    if (currentHour < 17) return { text: "Good Afternoon", icon: Activity };
    return { text: "Good Evening", icon: Moon };
  };

  const greeting = getGreeting();
  const GreetingIcon = greeting.icon;

  if (isErrorPosts || isErrorCreators) {
    return (
      <div className="flex flex-1">
        <div className="home-container">
          <p className="body-medium text-light-1">Something went wrong. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1">
      <div className="home-container">
        {/* Welcome Hero Section */}
        <div className="relative w-full mb-8 p-6 md:p-8 bg-gradient-to-br from-primary-500/20 via-primary-600/10 to-transparent rounded-3xl border border-primary-500/20 overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <GreetingIcon className="w-6 h-6 md:w-8 md:h-8 text-primary-500" />
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-light-1">
                {greeting.text}, {currentUser?.name || 'Wellness Seeker'}!
              </h1>
            </div>
            <p className="text-light-2 mb-6 max-w-2xl leading-relaxed text-sm md:text-base">
              Welcome to your wellness sanctuary. Today is a new opportunity to nurture your mind, body, and spirit.
              Let's explore what your community has shared and discover new paths to inner peace.
            </p>

            {/* Quick Action Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Link to="/dashboard" className="group">
                <div className="quick-action-card hover:shadow-lg transition-all duration-200">
                  <TrendingUp className="w-6 h-6 text-primary-500 group-hover:scale-110 transition-transform" />
                  <p className="font-medium text-black">Dashboard</p>
                </div>
              </Link>
              <Link to="/mind-body-spirit" className="group">
                <div className="quick-action-card hover:shadow-lg transition-all duration-200">
                  <Heart className="w-6 h-6 text-red-400 group-hover:scale-110 transition-transform" />
                  <p className="font-medium text-black">Mind Body Spirit</p>
                </div>
              </Link>
              <Link to="/journal" className="group">
                <div className="quick-action-card hover:shadow-lg transition-all duration-200">
                  <Calendar className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform" />
                  <p className="font-medium text-black">Journal</p>
                </div>
              </Link>
              <Link to="/affirmations" className="group">
                <div className="quick-action-card hover:shadow-lg transition-all duration-200">
                  <Sparkles className="w-6 h-6 text-purple-400 group-hover:scale-110 transition-transform" />
                  <p className="font-medium text-black">Affirmations</p>
                </div>
              </Link>
            </div>

            {/* Daily Inspiration */}
            <div className="bg-gradient-to-r from-primary-500/10 to-primary-600/10 rounded-2xl p-6 border border-primary-500/20">
              <div className="flex items-center gap-3 mb-3">
                <Star className="w-5 h-5 text-yellow-400" />
                <h3 className="text-lg font-semibold text-light-1">Daily Inspiration</h3>
              </div>
              <p className="text-light-2 italic">
                "The journey of a thousand miles begins with a single step. Today, take that step toward your wellness goals."
              </p>
              <p className="text-primary-500 text-sm mt-2">— Mirani Well Community</p>
            </div>
          </div>
        </div>

        {/* Community Feed */}
        <div className="home-posts main-content-background rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <TrendingUp className="w-6 h-6 text-primary-500" />
              <h2 className="h3-bold md:h2-bold text-gray-800">Community Feed</h2>
            </div>
            <Link to="/explore" className="flex items-center gap-2 text-primary-500 hover:text-primary-400 transition-colors ml-8">
              <span className="text-sm font-medium">Explore All</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {isPostLoading && !posts ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader />
              <p className="text-gray-600 mt-4">Loading wellness posts...</p>
            </div>
          ) : posts?.documents.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No posts yet</h3>
              <p className="text-gray-600 mb-4">Be the first to share your wellness journey!</p>
              <Link to="/create-post" className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg transition-colors">
                Create Your First Post
              </Link>
            </div>
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {posts?.documents.map((post) => (
                <li
                  key={post.$id}
                  className="flex justify-center w-full min-h-[500px]"
                >
                  <PostCard post={post as PostType} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Wellness Community Sidebar */}
      <div className="home-creators">
        {/* Daily Inspiration */}
        <div className="mb-6 p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20">
          <div className="flex items-center gap-3 mb-3">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h4 className="font-semibold text-light-1">Daily Inspiration</h4>
          </div>
          <p className="text-sm text-light-2 italic leading-relaxed">
            "The journey of a thousand miles begins with a single step. Today, take that step toward your wellness goals."
          </p>
          <p className="text-xs text-light-3 mt-2">— Mirani Well Community</p>
        </div>

        {/* Wellness Streak */}
        <div className="mb-6 p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl border border-green-500/20">
          <div className="flex items-center gap-3 mb-3">
            <Star className="w-5 h-5 text-green-400" />
            <h4 className="font-semibold text-light-1">Your Wellness Streak</h4>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">7</div>
              <div className="text-xs text-light-3">Days</div>
            </div>
            <div className="flex-1">
              <div className="flex gap-1">
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-green-400 rounded-full"
                  />
                ))}
              </div>
              <p className="text-xs text-light-2 mt-1">Keep it up!</p>
            </div>
          </div>
        </div>

        {/* Trending Topics */}
        <div className="mb-6 p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl border border-blue-500/20">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            <h4 className="font-semibold text-black">Trending Topics</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-blue-500/20 text-blue-700 rounded-full text-xs font-medium">
              #mindfulness
            </span>
            <span className="px-2 py-1 bg-purple-500/20 text-purple-700 rounded-full text-xs font-medium">
              #meditation
            </span>
            <span className="px-2 py-1 bg-green-500/20 text-green-700 rounded-full text-xs font-medium">
              #wellness
            </span>
            <span className="px-2 py-1 bg-yellow-500/20 text-yellow-700 rounded-full text-xs font-medium">
              #gratitude
            </span>
          </div>
        </div>

        {/* Wellness Community */}
        <div className="flex items-center gap-3 mb-4">
          <Users className="w-5 h-5 text-primary-500" />
          <h3 className="font-semibold text-light-1">Wellness Community</h3>
        </div>

        {isUserLoading && !creators ? (
          <div className="flex flex-col items-center justify-center py-6">
            <Loader />
            <p className="text-light-3 mt-2 text-sm">Loading community...</p>
          </div>
        ) : creators?.documents.length === 0 ? (
          <div className="text-center py-6">
            <div className="bg-dark-2 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-2">
              <Users className="w-5 h-5 text-primary-500" />
            </div>
            <p className="text-light-3 text-sm">No community members yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 mb-6">
            {creators?.documents.slice(0, 4).map((creator: any) => (
              <div key={creator?.$id}>
                <UserCard user={creator} />
              </div>
            ))}
            {/* Add a fifth user with stock image */}
            <div key="stock-user-5">
              <UserCard user={{
                $id: 'stock-user-5',
                $collectionId: 'users',
                $databaseId: 'main',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: [],
                name: 'Sarah Wilson',
                username: 'sarahwilson',
                imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&q=80&w=150&h=150&ixlib=rb-4.0.3'
              }} />
            </div>
          </div>
        )}

        {/* View All Community Link */}
        <Link
          to="/all-users"
          className="flex items-center justify-center gap-2 p-3 bg-primary-500 hover:bg-primary-600 rounded-xl border border-primary-500 hover:border-primary-600 transition-all duration-200 group mb-6"
        >
          <Users className="w-4 h-4 text-white" />
          <span className="text-sm text-white font-medium">View All Community</span>
          <ChevronRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
        </Link>

        {/* Quick Actions */}
        <div className="mb-6 p-4 bg-gradient-to-br from-blue-50 to-sky-50 rounded-2xl border border-blue-200 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <Zap className="w-5 h-5 text-orange-400" />
            <h4 className="font-semibold text-black">Quick Actions</h4>
          </div>
          <div className="space-y-2">
            <Link
              to="/create-post"
              className="flex items-center gap-2 p-2 bg-white hover:bg-blue-50 rounded-lg transition-all duration-200 group border border-blue-100"
            >
              <Heart className="w-4 h-4 text-red-400" />
              <span className="text-sm text-gray-700 group-hover:text-black">Share Wellness</span>
            </Link>
            <Link
              to="/affirmations"
              className="flex items-center gap-2 p-2 bg-white hover:bg-blue-50 rounded-lg transition-all duration-200 group border border-blue-100"
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-gray-700 group-hover:text-black">Daily Affirmations</span>
            </Link>
          </div>
        </div>

        {/* Wellness Tips */}
        <div className="mt-8 p-6 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-2xl border border-green-500/20">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-5 h-5 text-green-400" />
            <h4 className="font-semibold text-light-1">Quick Wellness Tips</h4>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
              <p className="text-sm text-light-2">Take 5 deep breaths to center yourself</p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
              <p className="text-sm text-light-2">Drink a glass of water mindfully</p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
              <p className="text-sm text-light-2">Practice gratitude for three things</p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
              <p className="text-sm text-light-2">Stretch your body for 60 seconds</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;