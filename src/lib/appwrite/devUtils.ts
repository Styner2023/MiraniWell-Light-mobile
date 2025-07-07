// Development mode utility
// This file contains functions to help with development mode

// Check if we are in development mode or demo mode
// Use mock data when Appwrite is disabled OR when explicitly set to mock mode
export const isDevelopment = import.meta.env.VITE_DISABLE_APPWRITE === 'true' || 
                           (import.meta.env.VITE_USE_MOCK_DATA === 'true' && 
                            import.meta.env.VITE_APPWRITE_PROJECT_ID === 'mock_project_id');

// For debug purposes
export function logDevInfo(message: string, data?: any) {
  if (isDevelopment) {
    console.log(`[DEV MODE] ${message}`, data ? data : '');
  }
}

// Display a development mode banner when the app is running in development mode
export function displayDevModeBanner() {
  // Banner disabled - no popup in development mode
  return;
}